import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../css/changepass.css';

const ChangePassword = () => {
    const [email, setEmail] = useState(''); // State for email
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChangePassword = async () => {
        if (newPassword === confirmPassword) {
            try {
                const response = await fetch('https://klima-backend.onrender.com/api/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        newPassword,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Password changed:', data.message);
                    setPasswordChanged(true);
                    setModalOpen(true); // Open the modal upon successful password change
                } else {
                    console.error('Failed to change password:', data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            setPasswordsMatch(false);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        navigate('/login'); // Redirect to login after closing the modal
    };

    return (
        <div className="background_changepass">

            <div className="change_pass">
                <h2 className="change_pass_title">Change Password</h2>
                <p className="change_pass_instruction">Please enter your email and new password.</p>

                <input
                    className="change_pass_input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Divider */}
                <div className="divider"></div>

                <input
                    className="change_pass_input"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    className="change_pass_input"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {!passwordsMatch && <p className="change_pass_error">Passwords do not match!</p>}
                {passwordChanged && <p className="change_pass_success">Password changed successfully!</p>}
                <button className="change_pass_button" onClick={handleChangePassword}>Change Password</button>
            </div>

            {/* Modal Code */}
            {modalOpen && (
                <div className="changepass_modal">
                    <div className="changepass_modal_content">
                        <h2 className="changepass_modal_title">Success!</h2>
                        <p className="changepass_modal_description">Your password has been changed successfully.</p>
                        <button className="changepass_modal_close" onClick={handleModalClose}>Continue</button>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default ChangePassword;
