import React from 'react';

const NotFound: React.FC = () => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #a2c2e8, #f3f4f6)',
                color: '#333',
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }} />
            <h1 style={{ fontSize: '6rem', margin: '0', zIndex: 1, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>404</h1>
            <p style={{ fontSize: '1.5rem', margin: '10px 0', zIndex: 1 }}>Oops! The page you are looking for does not exist.</p>
            <button
                onClick={handleBack}
                style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, transform 0.3s',
                    zIndex: 1,
                    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0056b3';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#007bff';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                Go Back
            </button>
        </div>
    );
};

export default NotFound;
