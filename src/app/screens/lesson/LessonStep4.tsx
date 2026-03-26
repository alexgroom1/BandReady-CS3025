import { useNavigate } from "react-router";
import { ChevronLeft, Headphones, ChevronRight } from "lucide-react";

export function LessonStep4() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Back arrow */}
        <button
          onClick={() => navigate('/lesson/step3')}
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
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#B0BEC5' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#B0BEC5' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4A90D9' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#B0BEC5' }} />
        </div>

        {/* Step text */}
        <div style={{
          fontFamily: 'Nunito',
          fontWeight: 400,
          fontSize: '16px',
          color: '#6B7A8D'
        }}>
          Step 4 of 5
        </div>
      </div>

      {/* Page title */}
      <h1 className="text-center mb-6" style={{
        fontFamily: 'Nunito',
        fontWeight: 700,
        fontSize: '36px',
        color: '#3D4A5C'
      }}>
        How to Read a Note
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
          justifyContent: 'center',
          position: 'relative'
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

            {/* Prominent note on Line 2 */}
            <circle cx="280" cy="80" r="20" fill="#4A90D9" />

            {/* Label bubble above note */}
            <rect x="250" y="30" width="60" height="32" rx="16" fill="#3D4A5C" />
            <text x="280" y="52" fontSize="24" fill="white" fontFamily="Nunito" fontWeight="700" textAnchor="middle">G</text>

            {/* Annotation callout lines (dashed) */}
            <line x1="320" y1="80" x2="380" y2="50" stroke="#B0BEC5" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="320" y1="80" x2="420" y2="80" stroke="#B0BEC5" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="320" y1="80" x2="380" y2="110" stroke="#B0BEC5" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Annotation labels */}
            <text x="385" y="48" fontSize="15" fill="#3D4A5C" fontFamily="Nunito" fontWeight="400">This is Line 2</text>
            <text x="425" y="83" fontSize="15" fill="#4A90D9" fontFamily="Nunito" fontWeight="700">Line 2 = G</text>
            <text x="385" y="113" fontSize="13" fill="#6B7A8D" fontFamily="Nunito" fontWeight="400" fontStyle="italic">Count from bottom!</text>
          </svg>
        </div>
      </div>

      {/* Helper text */}
      <div className="text-center mb-8" style={{
        fontFamily: 'Nunito',
        fontWeight: 400,
        fontSize: '18px',
        color: '#6B7A8D'
      }}>
        Always count lines starting from the bottom!
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
          onClick={() => navigate('/lesson/step5')}
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
