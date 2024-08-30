import React from 'react';

const shimmerStyles = {
  shimmerCard: {
    animation: 'shimmer 1.5s infinite linear',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  shimmerThumbnail: {
    width: '100%',
    height: '150px',
    marginBottom: '10px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear',
  },
  shimmerTitle: {
    width: '70%',
    height: '20px',
    marginBottom: '5px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear',
  },
  shimmerSubtitle: {
    width: '50%',
    height: '15px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear',
  },
};

const WebinarShimmer: React.FC = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
      {Array(6).fill(0).map((_, index) => (
        <div key={index} style={shimmerStyles.shimmerCard}>
          <div style={shimmerStyles.shimmerThumbnail}></div>
          <div style={{ padding: '1rem' }}>
            <div style={shimmerStyles.shimmerTitle}></div>
            <div style={shimmerStyles.shimmerSubtitle}></div>
            <div style={shimmerStyles.shimmerSubtitle}></div>
          </div>
        </div>
      ))}
      {/* Inline keyframes for the shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WebinarShimmer;
