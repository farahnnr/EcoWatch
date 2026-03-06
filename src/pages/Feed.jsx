import React from 'react';
import { useAppContext } from '../context/AppContext';
import PostCard from '../components/PostCard';
import './Feed.css'; // Future styling if needed specific to feed

const Feed = ({ onLogClick }) => {
    const { logs, currentUser } = useAppContext();

    // Show a welcome message for the current user
    return (
        <div className="feed-container animate-fade-in">
            <div className="feed-header">
                <h2>Discovery Feed</h2>
                <p>See what others in ASEAN are observing today.</p>
            </div>

            <div className="feed-list">
                {logs.length > 0 ? (
                    logs.map(log => (
                        <PostCard key={log.id} log={log} onClick={onLogClick} />
                    ))
                ) : (
                    <div className="empty-state glass-panel">
                        <p>No observations yet. Be the first to add one!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feed;
