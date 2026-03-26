import { useNavigate } from "react-router";
import { ChevronLeft, Headphones, ChevronRight } from "lucide-react";

export function LessonStep2() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Back arrow */}
        <button
          onClick={() => navigate('/lesson/step1')}
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
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#B0BEC5' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4A90D9' }} />
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
          Step 2 of 5
        </div>
      </div>

      {/* Page title */}
      <h1 className="text-center mb-6" style={{
        fontFamily: 'Nunito',
        fontWeight: 700,
        fontSize: '36px',
        color: '#3D4A5C'
      }}>
        Notes on the Lines
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

            {/* Note dots on lines with labels */}
            {/* Line 1 - E */}
            <circle cx="150" cy="60" r="16" fill="#E8524A" />
            <text x="150" y="67" fontSize="18" fill="white" fontFamily="Nunito" fontWeight="700" textAnchor="middle">E</text>
            
            {/* Line 2 - G */}
            <circle cx="230" cy="80" r="16" fill="#F5A623" />
            <text x="230" y="87" fontSize="18" fill="white" fontFamily="Nunito" fontWeight="700" textAnchor="middle">G</text>
            
            {/* Line 3 - B */}
            <circle cx="310" cy="100" r="16" fill="#52C98A" />
            <text x="310" y="107" fontSize="18" fill="white" fontFamily="Nunito" fontWeight="700" textAnchor="middle">B</text>
            
            {/* Line 4 - D */}
            <circle cx="390" cy="120" r="16" fill="#4A90D9" />
            <text x="390" y="127" fontSize="18" fill="white" fontFamily="Nunito" fontWeight="700" textAnchor="middle">D</text>
            
            {/* Line 5 - F */}
            <circle cx="470" cy="140" r="16" fill="#9B59B6" />
            <text x="470" y="147" fontSize="18" fill="white" fontFamily="Nunito" fontWeight="700" textAnchor="middle">F</text>
          </svg>
        </div>
      </div>

      {/* Mnemonic helper card */}
      <div className="flex justify-center mb-8">
        <div style={{
          width: '480px',
          height: '56px',
          background: '#FFFFFF',
          border: '2px solid #F5A623',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
        }}>
          <span style={{
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '18px',
            fontStyle: 'italic',
            color: '#F5A623'
          }}>
            💡  Every Good Boy Deserves Fudge
          </span>
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

      {/* NEXT button */}
      <div className="mt-auto pt-8 flex justify-center">
        <button
          onClick={() => navigate('/lesson/step3')}
          className="flex items-center gap-2"
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
            boxShadow: '0 4px 12px rgba(245, 166, 35, 0.4)',
            justifyContent: 'center'
          }}
        >
          NEXT
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
