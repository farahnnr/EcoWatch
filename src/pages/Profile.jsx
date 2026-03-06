import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Shield, Phone, ChevronLeft, Save } from 'lucide-react';
import './Profile.css';

const Profile = ({ onBack }) => {
    const { currentUser, updateUser } = useAppContext();

    // State for form fields
    const [name, setName] = useState(currentUser?.name || '');
    const [id, setId] = useState(currentUser?.id || '');
    const [password, setPassword] = useState(currentUser?.password || '');
    const [phone, setPhone] = useState(currentUser?.phone || '');

    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API delay
        setTimeout(() => {
            updateUser(currentUser.id, {
                name,
                password,
                phone,
                // Usually wouldn't let user change ID trivially, but added for demo completion if needed
            });
            setIsSaving(false);
            setSaveMessage('Profile successfully updated!');

            // Clear message after 3 seconds
            setTimeout(() => setSaveMessage(''), 3000);
        }, 800);
    };

    return (
        <div className="profile-container animate-fade-in">
            <div className="profile-header">
                <button className="icon-button back-button" onClick={onBack}>
                    <ChevronLeft size={24} />
                </button>
                <h2>Account Profile</h2>
                <div style={{ width: 40 }}></div> {/* Spacer for centering */}
            </div>

            <div className="profile-card glass-panel">
                <div className="profile-avatar-large">
                    {currentUser?.avatar}
                </div>
                <h3 className="profile-name-display">{currentUser?.name}</h3>
                <span className="profile-country-display">
                    Global EcoWatch Explorer
                </span>
            </div>

            <form className="profile-form glass-panel" onSubmit={handleSave}>
                <div className="form-section-header">
                    <User size={18} color="var(--accent-primary)" />
                    <h4>Personal Information</h4>
                </div>

                <div className="form-group">
                    <label>Display Name</label>
                    <input
                        type="text"
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Username (ID)</label>
                    <input
                        type="text"
                        className="input-field disabled-field"
                        value={id}
                        disabled
                    />
                    <small className="field-hint">Usernames cannot be changed once set.</small>
                </div>

                <div className="form-section-header push-top">
                    <Shield size={18} color="var(--accent-primary)" />
                    <h4>Security</h4>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter new password"
                    />
                </div>

                <div className="form-section-header push-top">
                    <Phone size={18} color="var(--accent-primary)" />
                    <h4>Authentication Link</h4>
                </div>

                <div className="link-explanation">
                    <p>Link your phone number to prevent account exploitation and ensure citizen science data integrity.</p>
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <div className="phone-input-wrapper">
                        <span className="phone-prefix">+</span>
                        <input
                            type="tel"
                            className="input-field phone-field"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. 62 812 3456 7890"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="primary-button save-button"
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <span className="typing-indicator small"><span></span><span></span><span></span></span>
                    ) : (
                        <><Save size={18} /> Save Changes</>
                    )}
                </button>

                {saveMessage && (
                    <div className="success-message animate-fade-in">
                        {saveMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Profile;
