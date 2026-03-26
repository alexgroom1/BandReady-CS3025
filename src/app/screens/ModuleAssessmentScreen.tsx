import { Check, ChevronLeft, Volume2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
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

  const answeredCount = Object.keys(progress.currentAssessment?.answers ?? {}).length;
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOptionId(null);
  }, [question.id]);

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
          {question.options.map((option) => {
            const isCorrect = option.id === question.correctOptionId;
            const isSelected = option.id === selectedOptionId;
            const isWrongSelection = selectedOptionId !== null && isSelected && !isCorrect;

            let background = '#FFFFFF';
            let border = '1.5px solid #E2E8F0';
            let color = selectedOptionId ? '#B0BEC5' : '#3D4A5C';

            if (selectedOptionId) {
              if (isCorrect) {
                background = '#E8F8F0';
                border = '2px solid #52C98A';
                color = '#52C98A';
              } else if (isWrongSelection) {
                background = '#FEF0F0';
                border = '2px solid #E8524A';
                color = '#E8524A';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => {
                  if (selectedOptionId) return;
                  const isLastQuestion = questionIndex === module.assessmentQuestions.length - 1;
                  setSelectedOptionId(option.id);
                  submitAssessmentAnswer(
                    module.id,
                    question.id,
                    option.id,
                    option.id === question.correctOptionId,
                    isLastQuestion,
                  );
                }}
                style={{
                  width: '220px',
                  height: '100px',
                  background,
                  border,
                  borderRadius: '16px',
                  fontWeight: 800,
                  fontSize: '24px',
                  color,
                  cursor: selectedOptionId ? 'default' : 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {option.label}
                {selectedOptionId && isCorrect && (
                  <div style={{
                    position: 'absolute',
                    right: '14px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#52C98A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Check size={16} color="white" strokeWidth={3} />
                  </div>
                )}
                {isWrongSelection && (
                  <div style={{
                    position: 'absolute',
                    right: '14px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#E8524A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <X size={16} color="white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedOptionId && (() => {
        const isLastQuestion = questionIndex === module.assessmentQuestions.length - 1;
        const nextRoute = isLastQuestion
          ? `/module/${module.id}/results`
          : `/module/${module.id}/assessment/${module.assessmentQuestions[questionIndex + 1].id}`;
        return (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate(nextRoute)}
              style={{
                width: '200px',
                height: '60px',
                background: '#F5A623',
                color: 'white',
                fontWeight: 700,
                fontSize: '20px',
                borderRadius: '30px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(245, 166, 35, 0.4)',
              }}
            >
              Next →
            </button>
          </div>
        );
      })()}
    </div>
  );
}
