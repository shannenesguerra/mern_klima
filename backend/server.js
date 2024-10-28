import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import crypto from "crypto"; // Keep crypto for hashing and OTP
import fs from "fs/promises";
import jwt from "jsonwebtoken";
dotenv.config();

const otpStore = {};
const app = express();
const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Add secretKey for JWT

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const port = process.env.PORT || 5000;

// Connect to MongoDB
app.listen(port, () => {
  connectDB();
  console.log(`Server started at http://localhost:${port}`);
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Access denied. No token provided." });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// Signup Route
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is taken" });
    }

    // Hash password with SHA-256
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate and send OTP
    const otp = generateOtp();
    otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 }; // Store OTP with expiry
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // use your environment variable for email
      to: email,
      subject: 'KLIMA | Your One-Time Password (OTP) Code for Secure Access',
      html: `<p>To ensure the security of your account, we require you to enter a One-Time Password (OTP) to verify your email.</p>

<p><strong>Your OTP code is: ${otp}</strong></p>

<p>Please enter this code in the required field to continue. This OTP is valid for the next 10 minutes and can only be used once. If you did not request this OTP or believe this email was sent to you in error, please disregard it.</p>

<p>For your security, please do not share this OTP with anyone.</p>

<p><em>***This is a system generated message. <strong>DO NOT REPLY TO THIS EMAIL.</strong>***</em></p>`
    });

    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully. OTP sent to email.", token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login 
app.post('/api/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;

  // Check if fields are provided
  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find user by email or username
    const user = await User.findOne({ 
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }] 
    });

    // Check if user exists and if password matches
    if (user) {
      // Hash the provided password with SHA-256 for comparison
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

      if (hashedPassword === user.password) {
        // Create token with user ID
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        // Respond with success message and token
        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Username
app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude the password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
});

// Change password
app.post("/api/change-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password with SHA-256
    const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to change password" });
  }
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "klima.otp@gmail.com",
    pass: "temu zxkw hcom gael",
  },
});

// Generate OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
      return res.status(400).json({ message: 'Email is required' });
  }

  try {
      const otp = generateOtp();
      otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 }; 

      const mailOptions = {
          from: 'your-email@gmail.com',
          to: email,
          subject: 'KLIMA | Your One-Time Password (OTP) Code for Secure Access',
          html: `<p>To ensure the security of your account, we require you to enter a One-Time Password (OTP) to proceed with your request.</p>

<p><strong>Your OTP code is: ${otp}</strong></p>

<p>Please enter this code in the required field to continue. This OTP is valid for the next 10 minutes and can only be used once. If you did not request this OTP or believe this email was sent to you in error, please disregard it.</p>

<p>For your security, please do not share this OTP with anyone.</p>

<p><em>***This is a system generated message. <strong>DO NOT REPLY TO THIS EMAIL.</strong>***</em></p>`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const storedOtp = otpStore[email];
  if (!storedOtp || storedOtp.expires < Date.now()) {
    return res.status(400).json({ message: "OTP expired or does not exist" });
  }

  if (storedOtp.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[email];
  res.status(200).json({ message: "OTP verified successfully" });
});
