import { useNavigate } from "react-router";
import { ChevronLeft, Headphones, ChevronRight } from "lucide-react";

export function LessonStep1() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
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
        Meet the Staff
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
            <line x1="80" y1="60" x2="540" y2="60" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="80" y1="80" x2="540" y2="80" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="80" y1="100" x2="540" y2="100" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="80" y1="120" x2="540" y2="120" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="80" y1="140" x2="540" y2="140" stroke="#3D4A5C" strokeWidth="1.5" />

            {/* Treble clef */}
            <text x="30" y="130" fontSize="64" fill="#3D4A5C" fontFamily="serif">𝄞</text>

            {/* Line labels */}
            <g>
              {/* Line 1 */}
              <rect x="440" y="52" width="60" height="20" rx="10" fill="#3D4A5C" />
              <text x="470" y="66" fontSize="13" fill="white" fontFamily="Nunito" fontWeight="600" textAnchor="middle">Line 1</text>
              
              {/* Line 2 */}
              <rect x="460" y="72" width="60" height="20" rx="10" fill="#3D4A5C" />
              <text x="490" y="86" fontSize="13" fill="white" fontFamily="Nunito" fontWeight="600" textAnchor="middle">Line 2</text>
              
              {/* Line 3 */}
              <rect x="480" y="92" width="60" height="20" rx="10" fill="#3D4A5C" />
              <text x="510" y="106" fontSize="13" fill="white" fontFamily="Nunito" fontWeight="600" textAnchor="middle">Line 3</text>
              
              {/* Line 4 */}
              <rect x="460" y="112" width="60" height="20" rx="10" fill="#3D4A5C" />
              <text x="490" y="126" fontSize="13" fill="white" fontFamily="Nunito" fontWeight="600" textAnchor="middle">Line 4</text>
              
              {/* Line 5 */}
              <rect x="440" y="132" width="60" height="20" rx="10" fill="#3D4A5C" />
              <text x="470" y="146" fontSize="13" fill="white" fontFamily="Nunito" fontWeight="600" textAnchor="middle">Line 5</text>
            </g>

            {/* Space labels */}
            <g>
              {/* Space 1 */}
              <rect x="160" y="62" width="66" height="18" rx="9" fill="#6B7A8D" />
              <text x="193" y="75" fontSize="12" fill="white" fontFamily="Nunito" fontWeight="600" textAnchor="middle">Space 1</text>
              
              {/* Space 2 */}
              <rect x="240" y="82" width="66" height="18" rx="9" fill="#6B7A8D" />
              <text x="273" y="95" fontSize="12" fill="white" fontFamily="Nunito" fontWeight="600" textAnchor="middle">Space 2</text>
              
              {/* Space 3 */}
              <rect x="320" y="102" width="66" height="18" rx="9" fill="#6B7A8D" />
              <text x="353" y="115" fontSize="12" fill="white" fontFamily="Nunito" fontWeight="600" textAnchor="middle">Space 3</text>
              
              {/* Space 4 */}
              <rect x="240" y="122" width="66" height="18" rx="9" fill="#6B7A8D" />
              <text x="273" y="135" fontSize="12" fill="white" fontFamily="Nunito" fontWeight="600" textAnchor="middle">Space 4</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Helper text */}
      <div className="text-center mb-6" style={{
        fontFamily: 'Nunito',
        fontWeight: 400,
        fontSize: '18px',
        color: '#6B7A8D'
      }}>
        Music is written on 5 lines called a staff.
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
          onClick={() => navigate('/lesson/step2')}
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
