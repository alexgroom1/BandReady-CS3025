import { useNavigate } from "react-router";
import { Check, X, Lightbulb } from "lucide-react";

export function ActivityIncorrectScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-5">
        {/* Practice Mode badge */}
        <div style={{
          background: '#E8F8F0',
          color: '#52C98A',
          fontFamily: 'Nunito',
          fontWeight: 600,
          fontSize: '14px',
          height: '36px',
          padding: '0 16px',
          borderRadius: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          ↺ Practice Mode
        </div>

        {/* Center text */}
        <div style={{
          fontFamily: 'Nunito',
          fontWeight: 400,
          fontSize: '16px',
          color: '#6B7A8D'
        }}>
          Take your time — no points, just practice!
        </div>

        {/* Done button */}
        <button
          onClick={() => navigate('/assessment')}
          style={{
            width: '96px',
            height: '44px',
            background: '#4A90D9',
            color: 'white',
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '16px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Done
        </button>
      </div>

      {/* Question area */}
      <div className="text-center mb-4">
        <h1 style={{
          fontFamily: 'Nunito',
          fontWeight: 700,
          fontSize: '32px',
          color: '#3D4A5C',
          marginBottom: '8px'
        }}>
          Which note is on the second line?
        </h1>
        <div style={{
          fontFamily: 'Nunito',
          fontWeight: 400,
          fontSize: '14px',
          color: '#B0BEC5'
        }}>
          Attempt 1 of unlimited
        </div>
      </div>

      {/* Content card with staff */}
      <div className="flex justify-center mb-5">
        <div style={{
          width: '440px',
          height: '200px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          padding: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="380" height="140" viewBox="0 0 380 140">
            {/* Music staff */}
            <line x1="10" y1="40" x2="370" y2="40" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="10" y1="60" x2="370" y2="60" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="10" y1="80" x2="370" y2="80" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="10" y1="100" x2="370" y2="100" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="10" y1="120" x2="370" y2="120" stroke="#3D4A5C" strokeWidth="1.5" />

            {/* Treble clef */}
            <text x="20" y="105" fontSize="50" fill="#3D4A5C" fontFamily="serif">𝄞</text>

            {/* Note on second line from bottom (G) */}
            <circle cx="200" cy="60" r="14" fill="#4A90D9" />
          </svg>
        </div>
      </div>

      {/* Answer buttons grid */}
      <div className="flex justify-center mb-5">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '416px' }}>
          {/* E - default */}
          <button style={{
            width: '200px',
            height: '90px',
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '28px',
            color: '#3D4A5C',
            cursor: 'pointer'
          }}>
            E
          </button>

          {/* G - Shows CORRECT answer (revealed) */}
          <button style={{
            width: '200px',
            height: '90px',
            background: '#E8F8F0',
            border: '2px solid #52C98A',
            borderRadius: '16px',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '28px',
            color: '#52C98A',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            G
          </button>

          {/* B - INCORRECT (user selected this) */}
          <button style={{
            width: '200px',
            height: '90px',
            background: '#FEF0F0',
            border: '2px solid #E8524A',
            borderRadius: '16px',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '28px',
            color: '#E8524A',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            position: 'relative'
          }}>
            B
            <div style={{
              position: 'absolute',
              right: '16px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#E8524A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <X size={16} color="white" strokeWidth={3} />
            </div>
          </button>

          {/* D - default */}
          <button style={{
            width: '200px',
            height: '90px',
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '28px',
            color: '#3D4A5C',
            cursor: 'pointer'
          }}>
            D
          </button>
        </div>
      </div>

      {/* Hint box */}
      <div className="flex justify-center mb-6">
        <div style={{
          width: '416px',
          height: '56px',
          background: '#EBF4FF',
          borderLeft: '4px solid #4A90D9',
          borderRadius: '0 12px 12px 0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: '8px'
        }}>
          <Lightbulb size={20} color="#4A90D9" fill="#4A90D9" />
          <span style={{
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: '16px',
            color: '#4A90D9'
          }}>
            Hint: Remember, lines are counted from the bottom up!
          </span>
        </div>
      </div>

      {/* Mascot with speech bubble */}
      <div style={{ position: 'absolute', bottom: '80px', right: '80px' }}>
        {/* Speech bubble - changed message */}
        <div style={{
          position: 'absolute',
          bottom: '130px',
          right: '10px',
          background: '#E8524A',
          color: 'white',
          fontFamily: 'Nunito',
          fontWeight: 600,
          fontSize: '14px',
          padding: '8px 16px',
          borderRadius: '12px',
          whiteSpace: 'nowrap'
        }}>
          Almost! Try again!
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            right: '20px',
            width: '0',
            height: '0',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #E8524A'
          }} />
        </div>

        {/* Mascot */}
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="75" r="26" fill="#3D4A5C" />
          <rect x="82" y="22" width="9" height="54" rx="4.5" fill="#3D4A5C" />
          <circle cx="86.5" cy="22" r="15" fill="#3D4A5C" />
          <circle cx="52" cy="71" r="3" fill="white" />
          <circle cx="68" cy="71" r="3" fill="white" />
          <path d="M 49 79 Q 60 86 71 79" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="90" r="9" fill="white" />
          <circle cx="82" cy="90" r="9" fill="white" />
          <ellipse cx="52" cy="105" rx="7.5" ry="4.5" fill="#E8524A" />
          <ellipse cx="68" cy="105" rx="7.5" ry="4.5" fill="#E8524A" />
        </svg>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '8px',
        background: '#E2E8F0'
      }}>
        <div style={{
          width: '40%',
          height: '100%',
          background: '#4A90D9'
        }} />
      </div>
    </div>
  );
}
