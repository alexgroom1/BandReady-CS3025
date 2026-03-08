import { useNavigate } from 'react-router';
import { Play } from 'lucide-react';

export function LaunchScreen() {
  const navigate = useNavigate();

  return (
    <div className="w-[1024px] h-[768px] relative flex flex-col items-center justify-center" style={{ background: '#F0F4F8' }}>
      <button
        onClick={() => navigate('/teacher-login')}
        style={{
          position: 'absolute',
          top: '28px',
          right: '32px',
          height: '44px',
          padding: '0 18px',
          borderRadius: '22px',
          border: '2px solid #4A90D9',
          background: '#FFFFFF',
          color: '#4A90D9',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Teacher Access
      </button>
      {/* Mascot */}
      <div className="mb-8">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          {/* Musical note character */}
          <circle cx="80" cy="100" r="35" fill="#3D4A5C" />
          <rect x="110" y="30" width="12" height="72" rx="6" fill="#3D4A5C" />
          <circle cx="116" cy="30" r="20" fill="#3D4A5C" />
          
          {/* Happy face */}
          <circle cx="70" cy="95" r="4" fill="white" />
          <circle cx="90" cy="95" r="4" fill="white" />
          <path d="M 65 105 Q 80 115 95 105" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
          
          {/* White gloves */}
          <circle cx="50" cy="120" r="12" fill="white" />
          <circle cx="110" cy="120" r="12" fill="white" />
          
          {/* Small sneakers */}
          <ellipse cx="70" cy="140" rx="10" ry="6" fill="#E8524A" />
          <ellipse cx="90" cy="140" rx="10" ry="6" fill="#E8524A" />
        </svg>
      </div>

      {/* Welcome text */}
      <div className="mb-2" style={{ 
        fontFamily: 'Nunito', 
        fontWeight: 600, 
        fontSize: '20px', 
        color: '#4A90D9' 
      }}>
        Welcome!
      </div>

      {/* App name */}
      <h1 className="mb-3" style={{ 
        fontFamily: 'Nunito', 
        fontWeight: 900, 
        fontSize: '64px', 
        color: '#F5A623',
        textShadow: '0 4px 8px rgba(245, 166, 35, 0.3)'
      }}>
        Band Ready
      </h1>

      {/* Tagline */}
      <p className="mb-12" style={{ 
        fontFamily: 'Nunito', 
        fontWeight: 400, 
        fontSize: '18px', 
        color: '#6B7A8D',
        textAlign: 'center'
      }}>
        Your journey to the school band starts here.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => navigate('/profile-select')}
        className="flex items-center justify-center gap-3"
        style={{
          width: '220px',
          height: '80px',
          background: '#F5A623',
          color: 'white',
          fontFamily: 'Nunito',
          fontWeight: 700,
          fontSize: '24px',
          borderRadius: '40px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(245, 166, 35, 0.4)'
        }}
      >
        <Play size={28} fill="white" />
        START
      </button>
    </div>
  );
}
