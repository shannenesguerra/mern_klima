import React, { useEffect, useState } from 'react';
import scroll from '../img/scroll.svg';
import klimalogo from '../img/klima logo.png';
import hklimatxt from '../img/klima text.png';
import rerend from '../img/rerend logo.png';
import gp from '../img/gp logo.png';
import gp2 from '../img/gp logo 2.png';
import download from '../img/download btn.png';
import download2 from '../img/download btn 2.png';
import developer1 from '../img/devs/shannen.png';
import developer2 from '../img/devs/vinnie.png';
import developer3 from '../img/devs/mane.png';
import developer4 from '../img/devs/kyan.png';
import '../css/download-page.css';

function DownloadPage() {
    // State to manage the modals
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem('token');
    const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
    const [isTermsModalOpen, setTermsModalOpen] = useState(false);
    const [isDownloadModalOpen, setDownloadModalOpen] = useState(true);

    // Functions to open and close modals
    const openPrivacyModal = () => setPrivacyModalOpen(true);
    const closePrivacyModal = () => setPrivacyModalOpen(false);
    const openTermsModal = () => setTermsModalOpen(true);
    const closeTermsModal = () => setTermsModalOpen(false);
    const openDownloadModal = () => setDownloadModalOpen(true);
    const closeDownloadModal = () => setDownloadModalOpen(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://klima-backend.onrender.com/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    return (
        <div className="background_download">
            <div className="dcentered_container">

                <img src={hklimatxt} alt="KLIMA Logo" className="dtitle_img" />
                <h1 className='dsubtitle'>Act Now for Nature – A Future Worth Protecting</h1>

                {/* Download Button */}
                <button className="ddl_button" onClick={openDownloadModal}>
                    <img src={download} alt="Download" className="dbutton_img" />
                </button>

                <div className='dscroll'>
                    <img src={scroll} alt="Scroll" className="hscroll_img" />
                </div>
            </div>

            {/* Download Modal */}
            {isDownloadModalOpen && (
                <div className="dmodal">
                    <div className="dmodal_content">
                        <span className="dclose" onClick={closeDownloadModal}>&times;</span>
                        <h2 className='dmodal_title'>Welcome, <strong>{user ? user.username : 'User'}</strong> !</h2>
                        <p className='dmodal_description'>
                            You have successfully logged in with your account. Thank you for your interest in downloading <strong>KLIMA</strong>. Click the button below to proceed.
                        </p>
                        <a href="/Game/Klima Setup v1.1 (x64).exe" className="dlink" download>
                            <img src={download2} alt="Download" className="dbutton_img" />
                        </a>
                    </div>
                </div>
            )}



            {/* Game Information Section */}
            <div className="dmain_container">
                <div className="dgame_info_section">
                    <h2 className="dgame_title">About the Game</h2>
                    <p className="dgame_description">
                        <strong>KLIMA</strong> invites you into a vibrant, 3D mini-world where every choice counts. As you explore this spherical environment, you’ll encounter real-life climate scenarios, like rising sea levels, deforestation, and pollution, that bring the challenges of climate change to life. It’s not just a game; it’s a journey to see the impact of your choices on the planet.
                    </p>
                    <br></br>
                    <p className="dgame_description">
                        Each level will put you in a different climate situation, where fast decisions show the direct effects of your actions on this mini-world. You’ll gain insights into the ripple effects of climate issues—how one action can change everything. By learning from realistic scenarios based on real-world data, you’ll come away with a better understanding of how our everyday choices shape the environment around us.
                    </p>
                    <br></br>
                    <p className="dgame_description">
                        In <strong>KLIMA</strong>, it’s all about learning through doing. You’ll walk away with a richer perspective on climate change, understanding both the issues and the solutions needed to make a difference.
                    </p>
                </div>

                {/* About Us Section */}
                <div className="dabout_us_section" id='aboutUs'>
                    <h2 className="ddev_title">Meet Our Team</h2>
                    <div className="ddeveloper_profiles">

                        <div className="ddeveloper_card">
                            <img src={developer1} alt="Developer 1" className="ddeveloper_photo ddev1" />
                            <h3 className="ddeveloper_name">Shannen</h3>
                            <p className="ddeveloper_role">PROJECT MANAGER</p>
                        </div>

                        <div className="ddeveloper_card">
                            <img src={developer2} alt="Developer 2" className="ddeveloper_photo ddev2" />
                            <h3 className="ddeveloper_name">Vinnie</h3>
                            <p className="ddeveloper_role">SYSTEM ADMINISTRATOR</p>
                        </div>

                        <div className="ddeveloper_card">
                            <img src={developer3} alt="Developer 3" className="ddeveloper_photo ddev3" />
                            <h3 className="ddeveloper_name">Jere Mane</h3>
                            <p className="ddeveloper_role">BACKEND DEVELOPER</p>
                        </div>

                        <div className="ddeveloper_card">
                            <img src={developer4} alt="Developer 4" className="ddeveloper_photo ddev4" />
                            <h3 className="ddeveloper_name">Kyan</h3>
                            <p className="ddeveloper_role">FRONTEND DEVELOPER</p>
                        </div>
                    </div>
                </div>

                {/* Partner Section */}
                <div className="dpartners_section" id='ourPartner'>
                    <h2 className="dpartner_title">Our Partner</h2>
                    <div className="dpartner_card">
                        <img src={gp2} alt="Partner Logo" className="dpartner_logo" />
                        <p className="dpartner_info">
                            Greenpeace is a community united by a mission to protect the planet and ensure a green, peaceful future. We’ve led the fight against environmental destruction, advocating for the planet’s rights as part of a global movement that challenges power with courage.
                            &nbsp;<a className="dgp_link" href="https://www.greenpeace.org/philippines/about-us/">Know more</a>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <footer className="dfooter">
                    <div className="dfooter_container">
                        <a href="#" className="dfooter_link" onClick={openPrivacyModal}>Privacy Policy</a>
                        <a href="#" className="dfooter_link" onClick={openTermsModal}>Terms of Service</a>
                        <a href="#aboutUs" className="dfooter_link">About Us</a>
                        <a href="#ourPartner" className="dfooter_link">Our Partner</a>
                        <p className="dfooter_copy">&#169; KLIMA 2024 | All rights reserved.</p>
                        <img src={gp} alt="Bottom Left" className="dbottom_left" />
                        <img src={rerend} alt="Bottom Mid" className="dbottom_mid" />
                        <img src={klimalogo} alt="Bottom Right" className="dbottom_right" />
                    </div>
                </footer>

                {/* Privacy Policy Modal */}
                {isPrivacyModalOpen && (
                    <div className="dmodal">
                        <div className="dmodal_content">
                            <span className="fclose" onClick={closePrivacyModal}>&times;</span>
                            <div className="dscrollable_content">
                                <h1>Privacy Policy</h1>
                                <p>
                                    KLIMA is dedicated to protecting the privacy of our users and ensuring a secure gaming experience. This Privacy Policy outlines the types of personal information we collect, how it is used, stored, and protected, as well as your rights regarding your data.
                                </p>

                                <h2>1. Information We Collect:</h2>
                                <ul>
                                    <li><strong>Personal Information:</strong> While KLIMA primarily focuses on gameplay data, we may collect personal information if you register an account, including your name, email address, and any other details you provide voluntarily.</li>
                                    <li><strong>Gameplay Data:</strong> We collect non-personal information related to your gameplay, such as your choices, in-game statistics, and interaction patterns. This data helps us understand user behavior and enhance the game experience.</li>
                                    <li><strong>Device Information:</strong> We may gather information about your device, including IP address, operating system, and browser type, to optimize game performance and ensure compatibility.</li>
                                </ul>

                                <h2>2. How We Use Your Information:</h2>
                                <ul>
                                    <li><strong>Enhancing User Experience:</strong> Your data allows us to improve gameplay, personalize content, and provide relevant insights that align with real-world climate scenarios.</li>
                                    <li><strong>Communication:</strong> If you provide personal information, we may use it to send you updates about the game, promotional materials, or other information you might find interesting. You can opt-out of these communications at any time.</li>
                                    <li><strong>Research and Analysis:</strong> We may use aggregated data for research purposes, aiming to understand user engagement and improve the educational aspects of KLIMA.</li>
                                </ul>

                                <h2>3. Data Retention:</h2>
                                <p>
                                    KLIMA retains your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. Once your information is no longer needed, it will be securely deleted.
                                </p>

                                <h2>4. Data Security:</h2>
                                <p>
                                    We implement appropriate technical and organizational measures to safeguard your data against unauthorized access, loss, or alteration. However, please remember that no method of transmission over the internet or method of electronic storage is completely secure.
                                </p>

                                <h2>5. Sharing Your Information:</h2>
                                <p>
                                    KLIMA does not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating the game, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
                                </p>

                                <h2>6. User Rights:</h2>
                                <p>
                                    You have the right to access, correct, or delete any personal data we hold about you. If you wish to exercise these rights, please contact us at <strong>klima.rerend@gmail.com</strong>.
                                </p>
                                <p>
                                    You also have the right to withdraw your consent at any time where we are relying on your consent to process your personal information.
                                </p>

                                <h2>7. Cookies:</h2>
                                <p>
                                    KLIMA may use cookies and similar tracking technologies to monitor activity on our game and store certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some features of our game.
                                </p>

                                <h2>8. Changes to This Privacy Policy:</h2>
                                <p>
                                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated effective date. We encourage you to review this Privacy Policy periodically for any changes.
                                </p>

                                <p>
                                    By using KLIMA, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Terms of Service Modal */}
                {isTermsModalOpen && (
                    <div className="dmodal">
                        <div className="dmodal_content">
                            <span className="fclose" onClick={closeTermsModal}>&times;</span>
                            <div className="dscrollable_content">
                                <h1>Terms of Service</h1>
                                <p>These Terms and Conditions govern your access to and use of <strong>KLIMA</strong>, an interactive game designed to educate players about climate change through engaging gameplay and real-world scenarios.</p>

                                <h2>1. Acceptance of Terms</h2>
                                <p>
                                    By accessing or using KLIMA, you agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, you must not use the game.
                                </p>

                                <h2>2. Gameplay Rules</h2>
                                <p>
                                    KLIMA is intended for educational purposes. Players are encouraged to make informed decisions within the game based on the scenarios presented. Players must not engage in any activities that disrupt the gaming experience for others or violate the game's integrity.
                                </p>
                                <p>
                                    You agree not to use any cheats, hacks, or unauthorized modifications that could alter your gameplay experience or affect other players.
                                </p>

                                <h2>3. Intellectual Property</h2>
                                <p>
                                    All content, graphics, and data associated with KLIMA, including but not limited to software, designs, and trademarks, are the exclusive property of KLIMA. You may not reproduce, distribute, or create derivative works from any content without prior written permission from KLIMA.
                                </p>

                                <h2>4. User Accounts</h2>
                                <p>
                                    If you create an account in KLIMA, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                                </p>

                                <h2>5. Updates and Modifications</h2>
                                <p>
                                    KLIMA reserves the right to modify, update, or discontinue any aspect of the game at any time without prior notice. This includes the addition or removal of features, content, or gameplay mechanics.
                                </p>

                                <h2>6. User Conduct</h2>
                                <p>
                                    You agree to use KLIMA in a manner consistent with all applicable laws and regulations. You must not use the game to engage in any unlawful, abusive, or harmful behavior, including harassment or threats towards other players.
                                </p>

                                <h2>7. Limitations of Liability</h2>
                                <p>
                                    KLIMA is provided on an "as is" basis without warranties of any kind, either express or implied. We do not guarantee the availability or performance of the game. To the fullest extent permitted by law, KLIMA shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the game or your inability to access or use it.
                                </p>

                                <h2>8. Governing Law</h2>
                                <p>
                                    These Terms and Conditions are governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes arising from or related to these terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
                                </p>

                                <h2>9. Changes to Terms and Conditions</h2>
                                <p>
                                    KLIMA reserves the right to modify these Terms and Conditions at any time. We will notify you of any changes by posting the revised terms on this page with an updated effective date. Your continued use of the game after any changes signifies your acceptance of the updated terms.
                                </p>

                                <h2>10. Contact Information</h2>
                                <p>
                                    For any questions regarding these Terms and Conditions or the Privacy Policy, please contact us at [Insert Contact Email].
                                </p>

                                <p>
                                    By accessing and playing KLIMA, you confirm that you have read, understood, and agree to these Terms and Conditions.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DownloadPage;
