import React, { useState } from 'react';
import { MapPin, Image as ImageIcon, Sparkles, ChevronRight, MoreHorizontal, Trash2, Flag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './PostCard.css';

const PostCard = ({ log, onClick }) => {
    const { getUserById, currentUser, deleteLog, reportLog } = useAppContext();
    const [showMenu, setShowMenu] = useState(false);

    const user = getUserById(log.userId);
    const isOwner = currentUser?.id === log.userId;

    // Formatting timestamp roughly
    const timeString = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleActionClick = (e, action) => {
        e.stopPropagation(); // prevent clicking the entire card
        setShowMenu(false);
        if (action === 'delete') {
            deleteLog(log.id);
        } else if (action === 'report') {
            reportLog(log.id);
        }
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    return (
        <div className="post-card glass-panel animate-fade-in" onClick={() => onClick && onClick(log)}>
            <div className="post-header">
                <div className="post-user-info">
                    <div className="post-avatar">{user?.avatar}</div>
                    <div className="post-meta">
                        <span className="post-author">{user?.name}</span>
                        <span className="post-time">{timeString}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="post-country" style={{ fontSize: '1.2rem' }}>
                        {user?.country === 'id' && '🇮🇩'}
                        {user?.country === 'my' && '🇲🇾'}
                        {user?.country === 'th' && '🇹🇭'}
                        {user?.country === 'ph' && '🇵🇭'}
                        {user?.country === 'vn' && '🇻🇳'}
                    </div>
                    <div className="post-options-container">
                        <button className="post-options-btn" onClick={toggleMenu}>
                            <MoreHorizontal size={20} color="var(--text-muted)" />
                        </button>
                        {showMenu && (
                            <div className="post-context-menu animate-fade-in">
                                {isOwner ? (
                                    <button className="context-item danger" onClick={(e) => handleActionClick(e, 'delete')}>
                                        <Trash2 size={16} /> Delete Post
                                    </button>
                                ) : (
                                    <button className="context-item alert" onClick={(e) => handleActionClick(e, 'report')}>
                                        <Flag size={16} /> Report Post
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="post-image-container">
                {log.imageUrl ? (
                    <img src={log.imageUrl} alt="Observation" className="post-image" loading="lazy" />
                ) : (
                    <div className="post-no-image">
                        <ImageIcon size={48} opacity={0.5} />
                    </div>
                )}
                <div className="post-location-capsule">
                    <MapPin size={14} />
                    <span>{log.location?.name || 'Unknown Location'}</span>
                </div>
            </div>

            <div className="post-content">
                <p className="post-notes">{log.notes}</p>

                {log.aiAnalysis && (
                    <div className="ai-insight-preview">
                        <div className="insight-header">
                            <Sparkles size={16} className="insight-icon" />
                            <span className="insight-title">
                                {log.aiAnalysis.species || log.aiAnalysis.category || "AI Insight"}
                            </span>
                        </div>
                        <button className="view-details-btn">
                            View AI Details <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;
