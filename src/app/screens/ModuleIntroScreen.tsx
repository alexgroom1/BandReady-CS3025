import { ChevronLeft, Headphones } from 'lucide-react';
import { useEffect } from 'react';
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

        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {module.lessons.map((lesson, index) => (
            <div key={lesson.id} style={{ width: index === 0 ? '12px' : '10px', height: index === 0 ? '12px' : '10px', borderRadius: '50%', background: index === 0 ? module.accentColor : '#B0BEC5' }} />
          ))}
        </div>

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
        color: '#3D4A5C'
      }}>
        {module.title}
      </h1>

      <p className="mx-auto mb-6 max-w-[720px] text-center" style={{ fontSize: '20px', color: '#6B7A8D' }}>
        {module.description}
      </p>

      {/* Visual content card */}
      <div className="flex justify-center mb-6">
        <ModuleVisual visual={module.lessons[0].visual} large />
      </div>

      <div className="mx-auto mb-8 max-w-[680px] rounded-[24px] bg-white p-5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div style={{ fontWeight: 800, fontSize: '20px', color: '#3D4A5C' }}>{module.summary}</div>
        <div style={{ marginTop: '8px', fontSize: '16px', color: '#6B7A8D' }}>
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
