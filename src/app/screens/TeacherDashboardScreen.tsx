import { GraduationCap, LogOut } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../state/AppState';

export function TeacherDashboardScreen() {
  const navigate = useNavigate();
  const {
    getTeacherDashboardView,
    clearTeacherAuth,
    logout,
    refreshTeacherDashboard,
    teacherDashboardLoading,
  } = useAppState();
  const dashboard = getTeacherDashboardView();

  useEffect(() => {
    void refreshTeacherDashboard();
  }, [refreshTeacherDashboard]);

  return (
    <div className="min-h-screen" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <GraduationCap size={36} color="#4A90D9" />
            <h1 style={{ fontWeight: 800, fontSize: '38px', color: '#3D4A5C' }}>Teacher Dashboard</h1>
          </div>
          <p style={{ fontSize: '18px', color: '#6B7A8D' }}>
            Review learner progress, recent attempts, and module completion.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              clearTeacherAuth();
              navigate('/');
            }}
            style={{
              width: '170px',
              height: '56px',
              borderRadius: '16px',
              border: '2px solid #4A90D9',
              color: '#4A90D9',
              background: 'white',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Launch
          </button>
          <button
            onClick={() => {
              clearTeacherAuth();
              logout();
              navigate('/');
            }}
            className="flex items-center justify-center gap-2"
            style={{
              width: '170px',
              height: '56px',
              borderRadius: '16px',
              border: 'none',
              color: 'white',
              background: '#E8524A',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <LogOut size={18} />
            Switch Learner
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {teacherDashboardLoading ? (
          <div className="rounded-[28px] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)]" style={{ fontWeight: 700, fontSize: '18px', color: '#6B7A8D' }}>
            Loading dashboard...
          </div>
        ) : null}
        {dashboard.learners.map((entry) => (
          <div
            key={entry.learner.id}
            className="rounded-[28px] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
          >
            <div className="mb-4 flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full text-[24px] font-[800] text-white"
                style={{ background: entry.learner.color }}
              >
                {entry.learner.initial}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '24px', color: '#3D4A5C' }}>{entry.learner.name}</div>
                <div style={{ fontWeight: 600, fontSize: '15px', color: '#6B7A8D' }}>
                  Active modules and most recent scores
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {entry.moduleSummaries.map((summary) => (
                <div
                  key={`${entry.learner.id}-${summary.moduleId}`}
                  className="rounded-[20px] border border-[#E2E8F0] bg-[#F8FBFF] p-4"
                >
                  <div style={{ fontWeight: 800, fontSize: '18px', color: '#3D4A5C' }}>{summary.moduleTitle}</div>
                  <div style={{ marginTop: '10px', fontSize: '14px', color: '#6B7A8D' }}>
                    Status: {summary.completed ? 'Completed' : 'In progress'}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6B7A8D' }}>Latest: {summary.latestScoreLabel}</div>
                  <div style={{ fontSize: '14px', color: '#6B7A8D' }}>Attempts: {summary.attempts}</div>
                  <div style={{ fontSize: '14px', color: '#6B7A8D' }}>Last active: {summary.lastVisitedLabel}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
