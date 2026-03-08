import { CheckCircle2, ChevronLeft, Home, RotateCcw, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { buildAssessmentReview, getLatestFinishedAttempt, getModuleById, getSafeModuleRoute } from '../lib/moduleProgress';
import { useAppState } from '../state/AppState';

export function ModuleResultsScreen() {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const { getModuleProgress, markRouteVisited, recordNavigationError } = useAppState();
  const module = getModuleById(moduleId);

  if (!module) {
    return <Navigate to="/home" replace />;
  }

  const latestAttempt = getLatestFinishedAttempt(getModuleProgress(module.id));
  if (!latestAttempt) {
    recordNavigationError(module.id);
    return <Navigate to={getSafeModuleRoute(module)} replace />;
  }

  const accuracy = Math.round((latestAttempt.score / Math.max(latestAttempt.total, 1)) * 100);
  const elapsedMs = (latestAttempt.finishedAt ?? latestAttempt.startedAt) - latestAttempt.startedAt;
  const totalSeconds = Math.max(1, Math.round(elapsedMs / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(1, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const reviewItems = buildAssessmentReview(module, latestAttempt);

  useEffect(() => {
    markRouteVisited(module.id, `/module/${module.id}/results`);
  }, [markRouteVisited, module.id]);

  return (
    <div className="min-h-screen" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/home')}
            style={{ width: '48px', height: '48px', border: 'none', background: 'transparent', color: '#4A90D9', cursor: 'pointer' }}
          >
            <ChevronLeft size={32} />
          </button>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#6B7A8D' }}>
            Final quiz results
          </div>
        </div>

        <div className="mb-6 rounded-[28px] bg-white p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div className="mb-6 flex items-center gap-5">
            <div
              className="flex h-[120px] w-[120px] items-center justify-center rounded-full"
              style={{
                background: latestAttempt.passed ? 'linear-gradient(135deg, #52C98A 0%, #4A90D9 100%)' : '#FFF1F0',
              }}
            >
              {latestAttempt.passed ? <CheckCircle2 size={54} color="white" /> : <XCircle size={54} color="#E8524A" />}
            </div>
            <div>
              <h1 style={{ fontWeight: 900, fontSize: '42px', color: '#3D4A5C' }}>
                {latestAttempt.passed ? 'Module Passed' : 'Practice More And Try Again'}
              </h1>
              <p style={{ marginTop: '8px', fontSize: '19px', color: '#6B7A8D', maxWidth: '720px' }}>
                {latestAttempt.passed
                  ? `You passed ${module.title}. The module is now marked complete.`
                  : `You need at least ${Math.round((module.passThreshold / module.assessmentQuestions.length) * 100)}% to pass ${module.title}. Review the answers below and go back to practice before retaking the quiz.`}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[20px] bg-[#F8FBFF] p-5 text-center">
              <div style={{ fontWeight: 900, fontSize: '42px', color: '#4A90D9' }}>{latestAttempt.score}/{latestAttempt.total}</div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#6B7A8D' }}>Correct answers</div>
            </div>
            <div className="rounded-[20px] bg-[#F8FBFF] p-5 text-center">
              <div style={{ fontWeight: 900, fontSize: '42px', color: '#4A90D9' }}>{accuracy}%</div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#6B7A8D' }}>Final quiz score</div>
            </div>
            <div className="rounded-[20px] bg-[#F8FBFF] p-5 text-center">
              <div style={{ fontWeight: 900, fontSize: '42px', color: '#4A90D9' }}>{minutes}:{seconds}</div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#6B7A8D' }}>Time</div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-[28px] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <h2 style={{ fontWeight: 800, fontSize: '26px', color: '#3D4A5C', marginBottom: '18px' }}>Answer Review</h2>
          <div className="grid gap-4">
            {reviewItems.map((item, index) => (
              <div
                key={item.questionId}
                className="rounded-[20px] border p-5"
                style={{
                  borderColor: item.isCorrect ? '#52C98A' : '#F2C0BD',
                  background: item.isCorrect ? '#F4FCF8' : '#FFF7F6',
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div style={{ fontWeight: 800, fontSize: '18px', color: '#3D4A5C' }}>
                    Question {index + 1}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: item.isCorrect ? '#52C98A' : '#E8524A' }}>
                    {item.isCorrect ? 'Correct' : 'Incorrect'}
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: '#3D4A5C', lineHeight: 1.4 }}>
                  {item.prompt}
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-[16px] bg-white p-4">
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#6B7A8D', marginBottom: '6px' }}>Your answer</div>
                    <div style={{ fontWeight: 800, fontSize: '18px', color: item.isCorrect ? '#52C98A' : '#E8524A' }}>
                      {item.selectedAnswerLabel}
                    </div>
                  </div>
                  <div className="rounded-[16px] bg-white p-4">
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#6B7A8D', marginBottom: '6px' }}>Correct answer</div>
                    <div style={{ fontWeight: 800, fontSize: '18px', color: '#3D4A5C' }}>
                      {item.correctAnswerLabel}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center justify-center gap-2"
            style={{
              width: '220px',
              height: '76px',
              borderRadius: '18px',
              border: latestAttempt.passed ? 'none' : '2px solid #4A90D9',
              background: latestAttempt.passed ? '#4A90D9' : 'transparent',
              color: latestAttempt.passed ? 'white' : '#4A90D9',
              fontWeight: 800,
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            <Home size={22} />
            Home
          </button>

          <button
            onClick={() => navigate(`/module/${module.id}`)}
            className="flex items-center justify-center gap-2"
            style={{
              width: '260px',
              height: '76px',
              borderRadius: '18px',
              border: 'none',
              background: module.accentColor,
              color: 'white',
              fontWeight: 800,
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={22} />
            {latestAttempt.passed ? 'Review Module Hub' : 'Review Practice'}
          </button>
        </div>
      </div>
    </div>
  );
}
