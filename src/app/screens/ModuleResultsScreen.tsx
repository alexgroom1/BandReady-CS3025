import { ChevronLeft, Home, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { getModuleById, getSafeModuleRoute } from '../lib/moduleProgress';
import { useAppState } from '../state/AppState';

export function ModuleResultsScreen() {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const { getModuleProgress, markRouteVisited, recordNavigationError } = useAppState();
  const module = getModuleById(moduleId);

  if (!module) {
    return <Navigate to="/home" replace />;
  }

  const latestAttempt = getModuleProgress(module.id).assessmentHistory.slice(-1)[0];
  if (!latestAttempt) {
    recordNavigationError(module.id);
    return <Navigate to={getSafeModuleRoute(module)} replace />;
  }

  const accuracy = Math.round((latestAttempt.score / Math.max(latestAttempt.total, 1)) * 100);
  const elapsedMs = (latestAttempt.finishedAt ?? latestAttempt.startedAt) - latestAttempt.startedAt;
  const totalSeconds = Math.max(1, Math.round(elapsedMs / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(1, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  useEffect(() => {
    markRouteVisited(module.id, `/module/${module.id}/results`);
  }, [markRouteVisited, module.id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#F0F4F8' }}>
      <div className="mb-4 flex w-full max-w-[760px] justify-start">
        <button
          onClick={() => navigate('/home')}
          style={{ width: '48px', height: '48px', border: 'none', background: 'transparent', color: '#4A90D9', cursor: 'pointer' }}
        >
          <ChevronLeft size={32} />
        </button>
      </div>
      <div
        className="mb-6 flex h-[140px] w-[140px] items-center justify-center rounded-full"
        style={{
          background: latestAttempt.passed ? 'linear-gradient(135deg, #52C98A 0%, #4A90D9 100%)' : '#EBF4FF',
          border: latestAttempt.passed ? 'none' : '4px solid #4A90D9',
        }}
      >
        <div style={{ fontWeight: 900, fontSize: '58px', color: latestAttempt.passed ? 'white' : '#4A90D9' }}>
          {latestAttempt.passed ? 'A' : 'R'}
        </div>
      </div>

      <h1 className="mb-2" style={{ fontWeight: 900, fontSize: '48px', color: '#3D4A5C', textAlign: 'center' }}>
        {latestAttempt.passed ? 'Fantastic Work!' : 'Keep Practicing!'}
      </h1>
      <p className="mb-8" style={{ fontSize: '20px', color: '#6B7A8D', textAlign: 'center', maxWidth: '560px' }}>
        {latestAttempt.passed
          ? `You passed ${module.title}.`
          : `You need ${module.passThreshold} or more correct answers to pass ${module.title}.`}
      </p>

      <div className="mb-10 rounded-[24px] bg-white p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]" style={{ width: '480px' }}>
        <div className="mb-6 text-center">
          <div style={{ fontWeight: 800, fontSize: '64px', color: latestAttempt.passed ? '#52C98A' : '#4A90D9', lineHeight: '1' }}>
            {latestAttempt.score}/{latestAttempt.total}
          </div>
          <div style={{ fontWeight: 700, fontSize: '18px', color: '#6B7A8D' }}>Correct Answers</div>
        </div>

        <div className="flex justify-around border-t border-[#E2E8F0] pt-6">
          <div className="text-center">
            <div style={{ fontWeight: 800, fontSize: '28px', color: '#4A90D9' }}>{accuracy}%</div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#6B7A8D' }}>Accuracy</div>
          </div>
          <div className="text-center">
            <div style={{ fontWeight: 800, fontSize: '28px', color: '#4A90D9' }}>{minutes}:{seconds}</div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#6B7A8D' }}>Time</div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center justify-center gap-2"
          style={{
            width: '200px',
            height: '80px',
            borderRadius: '16px',
            border: latestAttempt.passed ? 'none' : '2px solid #4A90D9',
            background: latestAttempt.passed ? '#4A90D9' : 'transparent',
            color: latestAttempt.passed ? 'white' : '#4A90D9',
            fontWeight: 800,
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          <Home size={24} />
          Home
        </button>
        <button
          onClick={() => navigate(`/module/${module.id}/practice/${module.practiceQuestions[0].id}`)}
          className="flex items-center justify-center gap-2"
          style={{
            width: '220px',
            height: '80px',
            borderRadius: '16px',
            border: 'none',
            background: module.accentColor,
            color: 'white',
            fontWeight: 800,
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={24} />
          {latestAttempt.passed ? 'Review Again' : 'Try Again'}
        </button>
      </div>
    </div>
  );
}
