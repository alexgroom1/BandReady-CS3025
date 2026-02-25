import { useNavigate } from "react-router";
import { Medal, Book, Music, Drum, Users, Trophy, Lock, Check } from "lucide-react";

export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="w-[1024px] h-[768px]" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      {/* Top Row */}
      <div className="flex justify-between items-start mb-9">
        {/* Left side */}
        <div>
          <h1 style={{
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '36px',
            color: '#3D4A5C',
            marginBottom: '8px'
          }}>
            Welcome back, Emma!
          </h1>
          <p style={{
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: '18px',
            color: '#6B7A8D'
          }}>
            You're doing great! Keep going to complete your band preparation.
          </p>
        </div>

        {/* Right side - Course Progress card */}
        <div style={{
          width: '220px',
          height: '90px',
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
        }}>
          <div className="flex justify-between items-center mb-2">
            <span style={{
              fontFamily: 'Nunito',
              fontWeight: 600,
              fontSize: '14px',
              color: '#6B7A8D'
            }}>
              Course Progress
            </span>
            <span style={{
              fontFamily: 'Nunito',
              fontWeight: 700,
              fontSize: '14px',
              color: '#4A90D9'
            }}>
              35%
            </span>
          </div>
          {/* Progress bar */}
          <div style={{
            width: '100%',
            height: '10px',
            background: '#E2E8F0',
            borderRadius: '5px',
            overflow: 'hidden',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '35%',
              height: '100%',
              background: 'linear-gradient(90deg, #52C98A 0%, #4A90D9 100%)'
            }} />
          </div>
          <div className="flex items-center gap-1">
            <Medal size={16} color="#F5A623" />
            <span style={{
              fontFamily: 'Nunito',
              fontWeight: 600,
              fontSize: '14px',
              color: '#F5A623'
            }}>
              2 badges earned
            </span>
          </div>
        </div>
      </div>

      {/* Section Label */}
      <h2 style={{
        fontFamily: 'Nunito',
        fontWeight: 700,
        fontSize: '22px',
        color: '#3D4A5C',
        marginBottom: '20px'
      }}>
        Your Learning Path
      </h2>

      {/* Module Cards Row */}
      <div className="flex gap-5">
        {/* Card 1 - Reading Music (COMPLETED) */}
        <div style={{
          width: '160px',
          height: '200px',
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '2px solid #52C98A',
          padding: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Checkmark badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#52C98A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Check size={16} color="white" strokeWidth={3} />
          </div>
          {/* Icon */}
          <div className="mt-6 mb-3">
            <Book size={40} color="#52C98A" />
          </div>
          {/* Title */}
          <div style={{
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '16px',
            color: '#3D4A5C',
            textAlign: 'center',
            marginBottom: '8px'
          }}>
            Reading Music
          </div>
          {/* Stars */}
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => (
              <span key={i} style={{ color: '#F5A623', fontSize: '20px' }}>★</span>
            ))}
            <span style={{ color: '#E2E8F0', fontSize: '20px' }}>★</span>
          </div>
        </div>

        {/* Card 2 - Note Names (COMPLETED) */}
        <div style={{
          width: '160px',
          height: '200px',
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '2px solid #52C98A',
          padding: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Checkmark badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#52C98A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Check size={16} color="white" strokeWidth={3} />
          </div>
          {/* Icon */}
          <div className="mt-6 mb-3">
            <Music size={40} color="#52C98A" />
          </div>
          {/* Title */}
          <div style={{
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '16px',
            color: '#3D4A5C',
            textAlign: 'center',
            marginBottom: '8px'
          }}>
            Note Names
          </div>
          {/* Stars */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} style={{ color: '#F5A623', fontSize: '20px' }}>★</span>
            ))}
          </div>
        </div>

        {/* Card 3 - Rhythm Basics (ACTIVE) */}
        <div style={{
          width: '160px',
          height: '200px',
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '2.5px solid #4A90D9',
          padding: '16px',
          boxShadow: '0 4px 20px rgba(74, 144, 217, 0.3)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Continue pill */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#F5A623',
            color: 'white',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '14px',
            padding: '4px 12px',
            borderRadius: '20px'
          }}>
            CONTINUE
          </div>
          {/* Icon */}
          <div className="mt-10 mb-3">
            <Drum size={40} color="#4A90D9" />
          </div>
          {/* Title */}
          <div style={{
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '16px',
            color: '#4A90D9',
            textAlign: 'center',
            marginBottom: '4px'
          }}>
            Rhythm Basics
          </div>
          {/* Subtitle */}
          <div style={{
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: '13px',
            color: '#6B7A8D',
            marginBottom: '12px'
          }}>
            Lesson 4 of 10
          </div>
          {/* Button */}
          <button
            onClick={() => navigate('/lesson/step1')}
            style={{
              width: '100%',
              height: '40px',
              background: '#F5A623',
              color: 'white',
              fontFamily: 'Nunito',
              fontWeight: 700,
              fontSize: '14px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Start Lesson
          </button>
        </div>

        {/* Card 4 - Instrument Families (LOCKED) */}
        <div style={{
          width: '160px',
          height: '200px',
          background: '#F5F7FA',
          borderRadius: '24px',
          border: '1px solid #B0BEC5',
          padding: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Lock icon */}
          <div className="mb-3">
            <Lock size={36} color="#B0BEC5" />
          </div>
          {/* Title */}
          <div style={{
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: '16px',
            color: '#B0BEC5',
            textAlign: 'center'
          }}>
            Instrument Families
          </div>
        </div>

        {/* Card 5 - Final Challenge (LOCKED) */}
        <div style={{
          width: '160px',
          height: '200px',
          background: '#F5F7FA',
          borderRadius: '24px',
          border: '1px solid #B0BEC5',
          padding: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Trophy icon */}
          <div className="mb-3">
            <Trophy size={36} color="#B0BEC5" />
          </div>
          {/* Title */}
          <div style={{
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: '16px',
            color: '#B0BEC5',
            textAlign: 'center'
          }}>
            Final Challenge
          </div>
        </div>
      </div>
    </div>
  );
}