import { ChevronLeft, ChevronRight, Headphones, Home } from 'lucide-react';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { ModuleVisual } from '../components/ModuleVisual';
import { playVisualAudio } from '../lib/audio';
import { getModuleById, getSafeModuleRoute } from '../lib/moduleProgress';
import { useAppState } from '../state/AppState';

export function ModuleLessonScreen() {
  const navigate = useNavigate();
  const { moduleId, stepId } = useParams();
  const { markLessonViewed, markRouteVisited, recordNavigationError } = useAppState();
  const module = getModuleById(moduleId);

  if (!module) {
    return <Navigate to="/home" replace />;
  }

  const stepIndex = module.lessons.findIndex((lesson) => lesson.id === stepId);
  const step = module.lessons[stepIndex];

  useEffect(() => {
    if (step) {
      markLessonViewed(module.id, step.id);
      markRouteVisited(module.id, `/module/${module.id}/lesson/${step.id}`);
    }
  }, [markLessonViewed, markRouteVisited, module.id, step]);

  if (!step) {
    recordNavigationError(module.id);
    return <Navigate to={getSafeModuleRoute(module)} replace />;
  }

  const isLastStep = stepIndex === module.lessons.length - 1;

  return (
    <div className="min-h-screen relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      {/* Home button — top-left, always visible */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate(getSafeModuleRoute(module))}
          style={{ width: '48px', height: '56px', border: 'none', background: 'transparent', color: '#4A90D9', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}
        >
          <Home size={24} />
          <span style={{ fontSize: '11px', fontWeight: 600 }}>Home</span>
        </button>
        <div className="flex items-center gap-2">
          {module.lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              style={{
                width: index === stepIndex ? '12px' : '10px',
                height: index === stepIndex ? '12px' : '10px',
                borderRadius: '999px',
                background: index === stepIndex ? module.accentColor : '#B0BEC5',
              }}
            />
          ))}
        </div>
        <div style={{ fontWeight: 600, fontSize: '16px', color: '#6B7A8D' }}>
          Step {stepIndex + 1} of {module.lessons.length}
        </div>
      </div>

      {/* Previous button — vertically centred on left, hidden on step 1 */}
      {stepIndex > 0 && (
        <button
          onClick={() => navigate(`/module/${module.id}/lesson/${module.lessons[stepIndex - 1].id}`)}
          style={{ position: 'absolute', left: '48px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '72px', border: 'none', background: 'transparent', color: '#4A90D9', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}
        >
          <ChevronLeft size={28} />
          <span style={{ fontSize: '11px', fontWeight: 600 }}>Previous</span>
        </button>
      )}

      <h1 className="mb-4 text-center" style={{ fontWeight: 800, fontSize: '38px', color: '#3D4A5C' }}>
        {step.title}
      </h1>
      <p className="mx-auto mb-6 max-w-[760px] text-center" style={{ fontSize: '20px', color: '#6B7A8D' }}>
        {step.description}
      </p>

      <div className="mb-6 flex justify-center">
        <ModuleVisual visual={step.visual} large />
      </div>

      {step.helperText ? (
        <div className="mb-8 text-center" style={{ fontSize: '18px', color: '#6B7A8D' }}>
          {step.helperText}
        </div>
      ) : null}

      <div className="mb-10 flex justify-center">
        <button
          onClick={() => void playVisualAudio(step.visual)}
          className="flex items-center justify-center gap-2"
          style={{
            width: '220px',
            height: '56px',
            background: 'transparent',
            borderRadius: '28px',
            border: '2px solid #4A90D9',
            color: '#4A90D9',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Headphones size={20} />
          {step.audioLabel ?? 'Listen along'}
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() =>
            navigate(
              isLastStep
                ? `/module/${module.id}/practice/${module.practiceQuestions[0].id}`
                : `/module/${module.id}/lesson/${module.lessons[stepIndex + 1].id}`,
            )
          }
          className="flex items-center justify-center gap-2"
          style={{
            width: '280px',
            height: '80px',
            background: module.accentColor,
            color: 'white',
            border: 'none',
            borderRadius: '40px',
            fontWeight: 800,
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          {isLastStep ? 'Start Practice' : 'Next'}
          <ChevronRight size={26} />
        </button>
      </div>
    </div>
  );
}
