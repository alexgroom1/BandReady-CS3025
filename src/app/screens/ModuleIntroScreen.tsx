import { ChevronLeft, Headphones } from 'lucide-react';
import React, { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { ModuleVisual } from '../components/ModuleVisual';
import { playVisualAudio } from '../lib/audio';
import { getModuleById, getPassThresholdLabel } from '../lib/moduleProgress';
import { useAppState } from '../state/AppState';

export function ModuleIntroScreen() {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const { markRouteVisited } = useAppState();
  const module = getModuleById(moduleId);

  if (!module) {
    return <Navigate to="/home" replace />;
  }

  useEffect(() => {
    markRouteVisited(module.id, `/module/${module.id}`);
  }, [markRouteVisited, module.id]);

  return (
    <div className="min-h-screen relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
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

        

        {/* Step text */}
        <div style={{
          fontFamily: 'Nunito',
          fontWeight: 400,
          fontSize: '16px',
          color: '#6B7A8D'
        }}>
          {module.lessons.length} lessons
        </div>
      </div>

      {/* Page title */}
      <h1 className="text-center mb-6" style={{
        fontFamily: 'Nunito',
        fontWeight: 700,
        fontSize: '36px',
        color: '#3D4A5C',
        lineHeight: 1.2
      }}>
        {module.title}
      </h1>

      <p className="mx-auto mb-6 max-w-[720px] text-center" style={{ fontFamily: 'Nunito', fontSize: '20px', color: '#6B7A8D', lineHeight: 1.45 }}>
        {module.description}
      </p>

      {/* Diagram label for music-reading modules */}
      {(module.id === 'reading-music' || module.id === 'note-names') && (
        <div className="mx-auto mb-3 max-w-[820px] text-center" style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '18px', color: '#3D4A5C' }}>
          {module.id === 'reading-music'
            ? 'Staff: lines and spaces (count from the bottom up)'
            : 'Treble clef: each line and space has a note name'}
        </div>
      )}

      {/* Visual content card */}
      <div className="flex justify-center mb-6">
        <div className="rounded-[24px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]" style={{ background: 'white' }}>
          <ModuleVisual visual={module.lessons[0].visual} large />
        </div>
      </div>

      <div className="mx-auto mb-8 max-w-[680px] rounded-[24px] bg-white p-6 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '20px', color: '#3D4A5C', marginBottom: '8px' }}>
          {module.summary}
        </div>
        <div style={{ fontFamily: 'Nunito', fontSize: '16px', color: '#6B7A8D' }}>
          {module.practiceQuestions.length} practice questions, {module.assessmentQuestions.length} assessment questions, pass target {getPassThresholdLabel(module)}.
        </div>
      </div>

      {/* Listen along button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => void playVisualAudio(module.lessons[0].visual)}
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
          Preview Audio
        </button>
      </div>

      {/* BEGIN MODULE button */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => navigate(`/module/${module.id}/lesson/${module.lessons[0].id}`)}
          style={{
            width: '280px',
            height: '80px',
            background: module.accentColor,
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
