import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

const Layout = ({ children, currentTab, setCurrentTab, showNav = true, onNavigate }) => {
    return (
        <div className="app-container">
            <Header onNavigate={onNavigate} />

            <main className="main-content">
                {children}
            </main>

            {showNav && (
                <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
            )}
        </div>
    );
};

export default Layout;
