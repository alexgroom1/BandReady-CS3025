import { BookOpen, CheckCircle2, ChevronLeft, Circle, Headphones, LockKeyhole, PencilRuler } from 'lucide-react';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { ModuleVisual } from '../components/ModuleVisual';
import { playVisualAudio } from '../lib/audio';
import {
  getLatestFinishedAttempt,
  getModuleById,
  getPassThresholdLabel,
  getPracticeCardState,
  isPracticeComplete,
} from '../lib/moduleProgress';
import { useAppState } from '../state/AppState';

export function ModuleIntroScreen() {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const { getModuleProgress, markRouteVisited, startAssessment } = useAppState();
  const module = getModuleById(moduleId);

  if (!module) {
    return <Navigate to="/home" replace />;
  }

  const progress = getModuleProgress(module.id);
  const practiceComplete = isPracticeComplete(module, progress);
  const completedPracticeCount = module.practiceQuestions.filter((question) =>
    progress.completedPracticeIds.includes(question.id),
  ).length;
  const latestAttempt = getLatestFinishedAttempt(progress);

  useEffect(() => {
    markRouteVisited(module.id, `/module/${module.id}`);
  }, [markRouteVisited, module.id]);

  return (
    <div className="min-h-screen" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/home')}
          style={{
            width: '48px',
            height: '48px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#4A90D9',
          }}
        >
          <ChevronLeft size={32} />
        </button>

        <div style={{ fontWeight: 700, fontSize: '16px', color: '#6B7A8D' }}>
          {module.lessons.length} lessons • {module.practiceQuestions.length} practice • {module.assessmentQuestions.length} quiz questions
        </div>
      </div>

      <h1 className="mb-4 text-center" style={{ fontWeight: 800, fontSize: '38px', color: '#3D4A5C' }}>
        {module.title}
      </h1>
      <p className="mx-auto mb-6 max-w-[760px] text-center" style={{ fontSize: '20px', color: '#6B7A8D', lineHeight: 1.45 }}>
        {module.description}
      </p>

      <div className="mb-6 flex justify-center">
        <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <ModuleVisual visual={module.lessons[0].visual} large />
        </div>
      </div>

      <div className="mx-auto mb-6 grid max-w-[1060px] gap-5 md:grid-cols-3">
        <div className="rounded-[24px] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div className="mb-3 flex items-center gap-2" style={{ color: '#3D4A5C', fontWeight: 800, fontSize: '18px' }}>
            <BookOpen size={20} color="#4A90D9" />
            Lessons
          </div>
          <div style={{ fontSize: '15px', color: '#6B7A8D', lineHeight: 1.45 }}>
            Review the lesson steps first, then work through practice before the final quiz.
          </div>
          <button
            onClick={() => navigate(`/module/${module.id}/lesson/${module.lessons[0].id}`)}
            style={{
              width: '100%',
              height: '48px',
              marginTop: '18px',
              borderRadius: '14px',
              border: 'none',
              background: module.accentColor,
              color: 'white',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Start Lessons
          </button>
        </div>

        <div className="rounded-[24px] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div className="mb-3 flex items-center gap-2" style={{ color: '#3D4A5C', fontWeight: 800, fontSize: '18px' }}>
            <PencilRuler size={20} color="#52C98A" />
            Practice Progress
          </div>
          <div style={{ fontSize: '15px', color: '#6B7A8D', lineHeight: 1.45 }}>
            {completedPracticeCount} of {module.practiceQuestions.length} practice questions answered.
          </div>
          <div style={{ marginTop: '12px', width: '100%', height: '10px', background: '#E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${Math.round((completedPracticeCount / Math.max(module.practiceQuestions.length, 1)) * 100)}%`,
                height: '100%',
                background: '#52C98A',
              }}
            />
          </div>
          <div style={{ marginTop: '16px', fontSize: '14px', fontWeight: 700, color: practiceComplete ? '#52C98A' : '#6B7A8D' }}>
            {practiceComplete ? 'Practice complete. Final quiz unlocked.' : 'Answer every practice question to unlock the final quiz.'}
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div className="mb-3 flex items-center gap-2" style={{ color: '#3D4A5C', fontWeight: 800, fontSize: '18px' }}>
            <CheckCircle2 size={20} color="#F5A623" />
            Final Quiz
          </div>
          <div style={{ fontSize: '15px', color: '#6B7A8D', lineHeight: 1.45 }}>
            Pass target {getPassThresholdLabel(module)} ({Math.round((module.passThreshold / module.assessmentQuestions.length) * 100)}%).
          </div>
          <div style={{ marginTop: '12px', fontSize: '14px', color: '#6B7A8D' }}>
            {latestAttempt
              ? `Latest score: ${latestAttempt.score}/${latestAttempt.total} ${latestAttempt.passed ? 'pass' : 'retry'}`
              : 'No final quiz attempt yet.'}
          </div>
          <button
            onClick={() => {
              if (!practiceComplete) {
                return;
              }
              startAssessment(module.id);
              navigate(`/module/${module.id}/assessment/${module.assessmentQuestions[0].id}`);
            }}
            disabled={!practiceComplete}
            style={{
              width: '100%',
              height: '48px',
              marginTop: '18px',
              borderRadius: '14px',
              border: 'none',
              background: practiceComplete ? '#4A90D9' : '#D7E2ED',
              color: practiceComplete ? 'white' : '#7F90A8',
              fontWeight: 800,
              cursor: practiceComplete ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {!practiceComplete ? <LockKeyhole size={18} /> : null}
            {latestAttempt ? 'Retake Final Quiz' : 'Start Final Quiz'}
          </button>
        </div>
      </div>

      <div className="mx-auto mb-6 flex max-w-[1060px] justify-center">
        <button
          onClick={() => void playVisualAudio(module.lessons[0].visual)}
          style={{
            width: '200px',
            height: '56px',
            background: 'transparent',
            border: '1.5px solid #4A90D9',
            color: '#4A90D9',
            fontWeight: 700,
            fontSize: '16px',
            borderRadius: '28px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Headphones size={20} />
          Preview Audio
        </button>
      </div>

      <div className="mx-auto max-w-[1060px] rounded-[28px] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 style={{ fontWeight: 800, fontSize: '24px', color: '#3D4A5C' }}>Practice Questions</h2>
            <div style={{ fontSize: '15px', color: '#6B7A8D', marginTop: '4px' }}>
              Pick any practice question. Completed cards show a check mark.
            </div>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#6B7A8D' }}>
            {completedPracticeCount}/{module.practiceQuestions.length} complete
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {module.practiceQuestions.map((question) => {
            const card = getPracticeCardState(module, progress, question.id);
            return (
              <button
                key={question.id}
                onClick={() => navigate(`/module/${module.id}/practice/${question.id}`)}
                className="text-left"
                style={{
                  minHeight: '132px',
                  borderRadius: '20px',
                  border: `2px solid ${card.completed ? '#52C98A' : '#E2E8F0'}`,
                  background: card.completed ? '#F4FCF8' : '#F8FBFF',
                  padding: '18px',
                  cursor: 'pointer',
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div
                    style={{
                      background: module.accentColor,
                      color: 'white',
                      borderRadius: '999px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: 800,
                    }}
                  >
                    Practice {card.questionIndex + 1}
                  </div>
                  {card.completed ? <CheckCircle2 size={22} color="#52C98A" /> : <Circle size={20} color="#B0BEC5" />}
                </div>
                <div style={{ fontWeight: 800, fontSize: '18px', color: '#3D4A5C', lineHeight: 1.35 }}>
                  {question.prompt}
                </div>
                <div style={{ marginTop: '10px', fontSize: '14px', color: '#6B7A8D' }}>
                  {card.completed ? 'Answered. Tap to review this practice question.' : 'Not answered yet. Tap to begin.'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
