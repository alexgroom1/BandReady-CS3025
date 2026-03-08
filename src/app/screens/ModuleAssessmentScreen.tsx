import { ChevronLeft, Volume2 } from 'lucide-react';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { ModuleVisual } from '../components/ModuleVisual';
import { playVisualAudio } from '../lib/audio';
import { getAssessmentBackRoute, getModuleById, getSafeModuleRoute, isPracticeComplete } from '../lib/moduleProgress';
import { useAppState } from '../state/AppState';

export function ModuleAssessmentScreen() {
  const navigate = useNavigate();
  const { moduleId, questionId } = useParams();
  const { getModuleProgress, startAssessment, submitAssessmentAnswer, markRouteVisited, recordNavigationError } = useAppState();
  const module = getModuleById(moduleId);
  const progress = module ? getModuleProgress(module.id) : null;
  const practiceComplete = module && progress ? isPracticeComplete(module, progress) : false;

  useEffect(() => {
    if (module && practiceComplete) {
      startAssessment(module.id);
    }
  }, [module, practiceComplete, startAssessment]);

  if (!module) {
    return <Navigate to="/home" replace />;
  }

  if (!progress) {
    return <Navigate to="/home" replace />;
  }
  const questionIndex = module.assessmentQuestions.findIndex((question) => question.id === questionId);
  const question = module.assessmentQuestions[questionIndex];

  if (!practiceComplete) {
    recordNavigationError(module.id);
    return <Navigate to={`/module/${module.id}`} replace />;
  }

  if (!question) {
    recordNavigationError(module.id);
    return <Navigate to={getSafeModuleRoute(module)} replace />;
  }

  const answeredCount = progress.currentAssessment && !progress.currentAssessment.finishedAt
    ? Object.keys(progress.currentAssessment.answers).length
    : 0;

  useEffect(() => {
    markRouteVisited(module.id, `/module/${module.id}/assessment/${question.id}`);
  }, [markRouteVisited, module.id, question.id]);

  return (
    <div className="min-h-screen" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      <div className="mb-4 flex items-center">
        <button
          onClick={() => navigate(getAssessmentBackRoute(module, questionIndex))}
          style={{ width: '48px', height: '48px', border: 'none', background: 'transparent', color: '#4A90D9', cursor: 'pointer' }}
        >
          <ChevronLeft size={32} />
        </button>
      </div>
      <div className="mb-3 text-center" style={{ fontWeight: 700, fontSize: '14px', color: '#6B7A8D', letterSpacing: '1.5px' }}>
        QUESTION {questionIndex + 1} OF {module.assessmentQuestions.length}
      </div>

      <div className="mb-7 flex gap-1" style={{ height: '12px' }}>
        {module.assessmentQuestions.map((_, index) => {
          let color = '#E2E8F0';
          if (index < answeredCount) {
            color = '#52C98A';
          } else if (index === questionIndex) {
            color = '#4A90D9';
          }
          return <div key={index} style={{ flex: 1, background: color, borderRadius: '6px' }} />;
        })}
      </div>

      <h1 className="mb-4 text-center" style={{ fontWeight: 800, fontSize: '34px', color: '#3D4A5C' }}>
        {question.prompt}
      </h1>

      <div className="mb-5 flex justify-center gap-6">
        <ModuleVisual visual={question.visual} />
        <button
          onClick={() => void playVisualAudio(question.visual)}
          className="flex flex-col items-center justify-center gap-2 self-center"
          style={{
            width: '110px',
            height: '110px',
            borderRadius: '22px',
            border: 'none',
            background: '#4A90D9',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          <Volume2 size={38} />
          <span style={{ fontWeight: 700, fontSize: '15px' }}>Play</span>
        </button>
      </div>

      <div className="mt-8 flex justify-center">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '456px' }}>
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                const isLastQuestion = questionIndex === module.assessmentQuestions.length - 1;
                submitAssessmentAnswer(
                  module.id,
                  question.id,
                  option.id,
                  option.id === question.correctOptionId,
                  isLastQuestion,
                );
                navigate(
                  isLastQuestion
                    ? `/module/${module.id}/results`
                    : `/module/${module.id}/assessment/${module.assessmentQuestions[questionIndex + 1].id}`,
                );
              }}
              style={{
                width: '220px',
                height: '100px',
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '24px',
                color: '#3D4A5C',
                cursor: 'pointer',
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
