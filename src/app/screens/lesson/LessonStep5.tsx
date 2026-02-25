import { useNavigate } from "react-router";
import { ChevronLeft, Headphones, ChevronRight } from "lucide-react";

export function LessonStep5() {
  const navigate = useNavigate();

  return (
    <div className="w-[1024px] h-[768px] relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Back arrow */}
        <button
          onClick={() => navigate('/lesson/step4')}
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
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#B0BEC5' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4A90D9' }} />
        </div>

        {/* Step text */}
        <div style={{
          fontFamily: 'Nunito',
          fontWeight: 400,
          fontSize: '16px',
          color: '#6B7A8D'
        }}>
          Step 5 of 5
        </div>
      </div>

      {/* Page title */}
      <h1 className="text-center mb-6" style={{
        fontFamily: 'Nunito',
        fontWeight: 700,
        fontSize: '36px',
        color: '#3D4A5C'
      }}>
        Let's Review!
      </h1>

      {/* Visual content card with two columns */}
      <div className="flex justify-center mb-6">
        <div style={{
          width: '640px',
          height: '280px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          padding: '40px',
          display: 'flex',
          gap: '40px',
          justifyContent: 'center'
        }}>
          {/* Left column - Lines */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'Nunito',
              fontWeight: 700,
              fontSize: '16px',
              color: '#3D4A5C',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid #3D4A5C'
            }}>
              Lines
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '32px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E8524A' }} />
                <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: '16px', color: '#3D4A5C' }}>
                  E — Line 1
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '32px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F5A623' }} />
                <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: '16px', color: '#3D4A5C' }}>
                  G — Line 2
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '32px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#52C98A' }} />
                <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: '16px', color: '#3D4A5C' }}>
                  B — Line 3
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '32px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#4A90D9' }} />
                <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: '16px', color: '#3D4A5C' }}>
                  D — Line 4
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '32px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#9B59B6' }} />
                <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: '16px', color: '#3D4A5C' }}>
                  F — Line 5
                </span>
              </div>
            </div>
          </div>

          {/* Vertical divider */}
          <div style={{ width: '1px', background: '#E2E8F0' }} />

          {/* Right column - Spaces */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'Nunito',
              fontWeight: 700,
              fontSize: '16px',
              color: '#3D4A5C',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid #3D4A5C'
            }}>
              Spaces
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '32px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E8524A' }} />
                <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: '16px', color: '#3D4A5C' }}>
                  F — Space 1
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '32px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F5A623' }} />
                <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: '16px', color: '#3D4A5C' }}>
                  A — Space 2
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '32px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#52C98A' }} />
                <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: '16px', color: '#3D4A5C' }}>
                  C — Space 3
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '32px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#4A90D9' }} />
                <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: '16px', color: '#3D4A5C' }}>
                  E — Space 4
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helper text */}
      <div className="text-center mb-8" style={{
        fontFamily: 'Nunito',
        fontWeight: 400,
        fontSize: '18px',
        color: '#6B7A8D'
      }}>
        You're ready — let's see what you know!
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

      {/* START QUIZ button */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => navigate('/practice/q1')}
          className="flex items-center gap-2"
          style={{
            width: '300px',
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
          START QUIZ
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
