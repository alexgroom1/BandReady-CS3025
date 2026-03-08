import { ChevronLeft, Lightbulb } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { ModuleVisual } from '../components/ModuleVisual';
import { playVisualAudio } from '../lib/audio';
import { getModuleById, getPracticeBackRoute, getSafeModuleRoute } from '../lib/moduleProgress';
import { useAppState } from '../state/AppState';

export function ModulePracticeScreen() {
  const navigate = useNavigate();
  const { moduleId, questionId } = useParams();
  const { submitPracticeAnswer, getModuleProgress, startAssessment, markRouteVisited, recordNavigationError } = useAppState();
  const module = getModuleById(moduleId);
  const progress = module ? getModuleProgress(module.id) : null;

  const question = useMemo(
    () => module?.practiceQuestions.find((entry) => entry.id === questionId) ?? null,
    [module, questionId],
  );
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(
    question ? progress?.practiceAnswers[question.id] ?? null : null,
  );

  if (!module || !question || !progress) {
    if (module) {
      recordNavigationError(module.id);
      return <Navigate to={getSafeModuleRoute(module)} replace />;
    }
    return <Navigate to="/home" replace />;
  }

  const questionIndex = module.practiceQuestions.findIndex((entry) => entry.id === question.id);
  const isAnswered = Boolean(selectedAnswerId);
  const isCorrect = selectedAnswerId === question.correctOptionId;
  const nextQuestion = module.practiceQuestions[questionIndex + 1];
  const percent = Math.round(((questionIndex + (isAnswered ? 1 : 0)) / module.practiceQuestions.length) * 100);

  useEffect(() => {
    markRouteVisited(module.id, `/module/${module.id}/practice/${question.id}`);
  }, [markRouteVisited, module.id, question.id]);

  return (
    <div className="min-h-screen relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      <div className="mb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(getPracticeBackRoute(module, questionIndex))}
            style={{ width: '48px', height: '48px', border: 'none', background: 'transparent', color: '#4A90D9', cursor: 'pointer' }}
          >
            <ChevronLeft size={32} />
          </button>
          <div
            style={{
              background: '#E8F8F0',
              color: '#52C98A',
              fontWeight: 700,
              fontSize: '14px',
              height: '36px',
              padding: '0 16px',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Practice Mode
          </div>
        </div>
        <div style={{ fontSize: '16px', color: '#6B7A8D' }}>Take your time. No points, just practice.</div>
        <button
          onClick={() => {
            startAssessment(module.id);
            navigate(`/module/${module.id}/assessment/${module.assessmentQuestions[0].id}`);
          }}
          style={{
            width: '110px',
            height: '44px',
            background: '#4A90D9',
            color: 'white',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          Done
        </button>
      </div>

      <div className="mb-4 text-center">
        <h1 style={{ fontWeight: 800, fontSize: '34px', color: '#3D4A5C' }}>{question.prompt}</h1>
        <div style={{ fontSize: '14px', color: '#B0BEC5' }}>Question {questionIndex + 1} of {module.practiceQuestions.length}</div>
      </div>

      <div className="mb-5 flex justify-center">
        <ModuleVisual visual={question.visual} />
      </div>

      <div className="mb-5 flex justify-center">
        <button
          onClick={() => void playVisualAudio(question.visual)}
          style={{
            width: '180px',
            height: '48px',
            borderRadius: '16px',
            border: '2px solid #4A90D9',
            background: 'white',
            color: '#4A90D9',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Play Example
        </button>
      </div>

      <div className="mb-5 flex justify-center">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '460px' }}>
          {question.options.map((option) => {
            const isSelected = selectedAnswerId === option.id;
            const showCorrect = isAnswered && option.id === question.correctOptionId;
            const showIncorrect = isAnswered && isSelected && !isCorrect;
            return (
              <button
                key={option.id}
                onClick={() => {
                  if (isAnswered) {
                    return;
                  }
                  setSelectedAnswerId(option.id);
                  submitPracticeAnswer(module.id, question.id, option.id);
                }}
                style={{
                  width: '220px',
                  height: '90px',
                  borderRadius: '16px',
                  border: showCorrect ? '2px solid #52C98A' : showIncorrect ? '2px solid #E8524A' : '1.5px solid #E2E8F0',
                  background: showCorrect ? '#E8F8F0' : showIncorrect ? '#FFF1F0' : '#FFFFFF',
                  color: showCorrect ? '#52C98A' : showIncorrect ? '#E8524A' : '#3D4A5C',
                  fontWeight: 800,
                  fontSize: '26px',
                  cursor: isAnswered ? 'default' : 'pointer',
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6 flex justify-center">
        <div
          style={{
            width: '460px',
            minHeight: '56px',
            background: '#EBF4FF',
            borderLeft: '4px solid #4A90D9',
            borderRadius: '0 12px 12px 0',
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            gap: '8px',
          }}
        >
          <Lightbulb size={20} color="#4A90D9" />
          <span style={{ fontSize: '16px', color: '#4A90D9' }}>
            {isAnswered ? (isCorrect ? question.successMessage : question.hint) : question.hint}
          </span>
        </div>
      </div>

      <div className="mb-4 text-center" style={{ fontSize: '16px', color: isAnswered ? (isCorrect ? '#52C98A' : '#E8524A') : '#6B7A8D' }}>
        {isAnswered ? (isCorrect ? question.successMessage : `${question.encouragement} The correct answer is ${question.options.find((option) => option.id === question.correctOptionId)?.label}.`) : question.encouragement}
      </div>

      <div className="mx-auto max-w-[520px]">
        <div style={{ width: '100%', height: '12px', background: '#E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ width: `${percent}%`, height: '100%', background: module.accentColor }} />
        </div>
      </div>

      {isAnswered ? (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              if (nextQuestion) {
                navigate(`/module/${module.id}/practice/${nextQuestion.id}`);
                return;
              }
              startAssessment(module.id);
              navigate(`/module/${module.id}/assessment/${module.assessmentQuestions[0].id}`);
            }}
            style={{
              width: '260px',
              height: '70px',
              borderRadius: '35px',
              border: 'none',
              background: module.accentColor,
              color: 'white',
              fontWeight: 800,
              fontSize: '22px',
              cursor: 'pointer',
            }}
          >
            {nextQuestion ? 'Next Practice' : 'Start Assessment'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
