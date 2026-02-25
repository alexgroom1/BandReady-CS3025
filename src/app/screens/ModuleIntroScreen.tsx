import { useNavigate } from "react-router";
import { ChevronLeft, Headphones } from "lucide-react";

export function ModuleIntroScreen() {
  const navigate = useNavigate();

  return (
    <div className="w-[1024px] h-[768px] relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Back arrow */}
        <button
          onClick={() => navigate('/home')}
          style={{
            width: '48px',
            height: '48px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#4A90D9'
          }}
        >
          <ChevronLeft size={32} />
        </button>

        {/* Step indicators */}
        <div className="flex items-center gap-2">
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4A90D9' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#B0BEC5' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#B0BEC5' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#B0BEC5' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#B0BEC5' }} />
        </div>

        {/* Step text */}
        <div style={{
          fontFamily: 'Nunito',
          fontWeight: 400,
          fontSize: '16px',
          color: '#6B7A8D'
        }}>
          Step 1 of 5
        </div>
      </div>

      {/* Page title */}
      <h1 className="text-center mb-6" style={{
        fontFamily: 'Nunito',
        fontWeight: 700,
        fontSize: '36px',
        color: '#3D4A5C'
      }}>
        Note Names
      </h1>

      {/* Visual content card */}
      <div className="flex justify-center mb-6">
        <div style={{
          width: '640px',
          height: '280px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          padding: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="560" height="200" viewBox="0 0 560 200">
            {/* Music staff - 5 horizontal lines */}
            <line x1="20" y1="60" x2="540" y2="60" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="20" y1="80" x2="540" y2="80" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="20" y1="100" x2="540" y2="100" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="20" y1="120" x2="540" y2="120" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="20" y1="140" x2="540" y2="140" stroke="#3D4A5C" strokeWidth="1.5" />

            {/* Treble clef */}
            <text x="30" y="130" fontSize="60" fill="#3D4A5C" fontFamily="serif">𝄞</text>

            {/* Note dots with positions */}
            {/* E - first line (y=60) */}
            <circle cx="150" cy="60" r="14" fill="#52C98A" />
            
            {/* G - second line (y=80) */}
            <circle cx="230" cy="80" r="14" fill="#4A90D9" />
            {/* Label bubble for G */}
            <rect x="215" y="40" width="30" height="24" rx="12" fill="#3D4A5C" />
            <text x="230" y="56" fontSize="14" fill="white" fontFamily="Nunito" fontWeight="600" textAnchor="middle">G</text>
            
            {/* B - middle line (y=100) */}
            <circle cx="310" cy="100" r="14" fill="#F5A623" />
            
            {/* D - fourth line (y=120) */}
            <circle cx="390" cy="120" r="14" fill="#9B59B6" />
            
            {/* F - top line (y=140) */}
            <circle cx="470" cy="140" r="14" fill="#E8524A" />
          </svg>
        </div>
      </div>

      {/* Listen along button */}
      <div className="flex justify-center mb-8">
        <button
          style={{
            width: '200px',
            height: '56px',
            background: 'transparent',
            border: '1.5px solid #4A90D9',
            color: '#4A90D9',
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '16px',
            borderRadius: '28px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Headphones size={20} />
          Listen along
        </button>
      </div>

      {/* BEGIN MODULE button */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => navigate('/activity-correct')}
          style={{
            width: '280px',
            height: '80px',
            background: '#F5A623',
            color: 'white',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '24px',
            borderRadius: '40px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(245, 166, 35, 0.4)'
          }}
        >
          BEGIN MODULE
        </button>
      </div>
    </div>
  );
}
