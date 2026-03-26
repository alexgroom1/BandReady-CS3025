import { useNavigate } from "react-router";
import { Star, Trophy, Home, RotateCcw } from "lucide-react";

export function ResultsPassScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#F0F4F8' }}>
      {/* Trophy icon with glow */}
      <div className="mb-6" style={{
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #52C98A 0%, #4A90D9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(82, 201, 138, 0.4)'
      }}>
        <Trophy size={70} color="white" fill="white" />
      </div>

      {/* Congratulations text */}
      <h1 className="mb-2" style={{
        fontFamily: 'Nunito',
        fontWeight: 900,
        fontSize: '48px',
        color: '#3D4A5C',
        textAlign: 'center'
      }}>
        Fantastic Work!
      </h1>

      {/* Subtitle */}
      <p className="mb-8" style={{
        fontFamily: 'Nunito',
        fontWeight: 400,
        fontSize: '20px',
        color: '#6B7A8D',
        textAlign: 'center'
      }}>
        You passed the assessment!
      </p>

      {/* Results card */}
      <div className="mb-10" style={{
        width: '480px',
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
      }}>
        {/* Score */}
        <div className="text-center mb-6">
          <div style={{
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '64px',
            color: '#52C98A',
            lineHeight: '1'
          }}>
            7/8
          </div>
          <div style={{
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '18px',
            color: '#6B7A8D'
          }}>
            Correct Answers
          </div>
        </div>

        {/* Stars earned */}
        <div className="flex justify-center gap-2 mb-6">
          <Star size={32} fill="#F5A623" color="#F5A623" />
          <Star size={32} fill="#F5A623" color="#F5A623" />
          <Star size={32} fill="#F5A623" color="#F5A623" />
          <Star size={32} fill="#F5A623" color="#F5A623" />
          <Star size={32} fill="#E2E8F0" color="#E2E8F0" />
        </div>

        {/* Stats */}
        <div className="flex justify-around pt-6" style={{
          borderTop: '1px solid #E2E8F0'
        }}>
          <div className="text-center">
            <div style={{
              fontFamily: 'Nunito',
              fontWeight: 700,
              fontSize: '28px',
              color: '#4A90D9'
            }}>
              88%
            </div>
            <div style={{
              fontFamily: 'Nunito',
              fontWeight: 600,
              fontSize: '14px',
              color: '#6B7A8D'
            }}>
              Accuracy
            </div>
          </div>
          <div className="text-center">
            <div style={{
              fontFamily: 'Nunito',
              fontWeight: 700,
              fontSize: '28px',
              color: '#4A90D9'
            }}>
              2:45
            </div>
            <div style={{
              fontFamily: 'Nunito',
              fontWeight: 600,
              fontSize: '14px',
              color: '#6B7A8D'
            }}>
              Time
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2"
          style={{
            width: '200px',
            height: '80px',
            background: '#4A90D9',
            color: 'white',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '20px',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(74, 144, 217, 0.4)',
            justifyContent: 'center'
          }}
        >
          <Home size={24} />
          Home
        </button>

        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2"
          style={{
            width: '200px',
            height: '80px',
            background: '#F5A623',
            color: 'white',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '20px',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(245, 166, 35, 0.4)',
            justifyContent: 'center'
          }}
        >
          Next Lesson
        </button>
      </div>
    </div>
  );
}