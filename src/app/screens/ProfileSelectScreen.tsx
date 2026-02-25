import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useState } from "react";

const profiles = [
  { initial: 'E', name: 'Emma', color: '#4A90D9' },
  { initial: 'M', name: 'Marcus', color: '#52C98A' },
  { initial: 'S', name: 'Sofia', color: '#F5A623' },
  { initial: 'J', name: 'James', color: '#9B59B6' },
  { initial: 'A', name: 'Aisha', color: '#E8524A' },
  { initial: 'N', name: 'Noah', color: '#F39C12' },
];

export function ProfileSelectScreen() {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState('Emma');

  return (
    <div className="w-[1024px] h-[768px] relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      {/* Back arrow */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-10 left-12"
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

      {/* Title */}
      <h1 className="text-center mb-12" style={{
        fontFamily: 'Nunito',
        fontWeight: 700,
        fontSize: '36px',
        color: '#3D4A5C'
      }}>
        Who's learning today?
      </h1>

      {/* Profile list */}
      <div className="flex flex-col items-center gap-4 mt-16">
        {profiles.map((profile) => {
          const isSelected = selectedProfile === profile.name;
          return (
            <button
              key={profile.name}
              onClick={() => setSelectedProfile(profile.name)}
              className="flex items-center justify-between"
              style={{
                width: '400px',
                height: '80px',
                background: isSelected ? '#EBF4FF' : '#FFFFFF',
                border: isSelected ? '2px solid #4A90D9' : '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '0 24px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="flex items-center gap-4">
                {/* Avatar circle */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: profile.color,
                    color: 'white',
                    fontFamily: 'Nunito',
                    fontWeight: 700,
                    fontSize: '24px'
                  }}
                >
                  {profile.initial}
                </div>
                {/* Name */}
                <span style={{
                  fontFamily: 'Nunito',
                  fontWeight: 600,
                  fontSize: '22px',
                  color: '#3D4A5C'
                }}>
                  {profile.name}
                </span>
              </div>
              {/* Icon */}
              {isSelected ? (
                <Check size={24} color="#4A90D9" strokeWidth={3} />
              ) : (
                <ChevronRight size={24} color="#B0BEC5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Let's Go Button */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center justify-center gap-2"
          style={{
            width: '280px',
            height: '80px',
            background: '#F5A623',
            color: 'white',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '22px',
            borderRadius: '40px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(245, 166, 35, 0.4)'
          }}
        >
          Let's Go
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
