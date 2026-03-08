import { useNavigate } from 'react-router';
import { Award, Book, Drum, LogOut, Music, Trophy, Users } from 'lucide-react';
import { MODULES } from '../data/modules';
import { getModuleCompletionPercent } from '../lib/moduleProgress';
import { useAppState } from '../state/AppState';

export function HomeScreen() {
  const navigate = useNavigate();
  const { selectedLearner, getModuleProgress, logout } = useAppState();

  const averageProgress = Math.round(
    MODULES.reduce((total, module) => total + getModuleCompletionPercent(module, getModuleProgress(module.id)), 0) /
      MODULES.length,
  );

  const completedCount = MODULES.filter((module) => Boolean(getModuleProgress(module.id).completedAt)).length;

  const iconMap = {
    book: Book,
    music: Music,
    drum: Drum,
    users: Users,
    trophy: Trophy,
  } as const;

  return (
    <div className="min-h-screen" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      {/* Top Row */}
      <div className="flex justify-between items-start mb-9">
        {/* Left side */}
        <div>
          <h1 style={{
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '36px',
            color: '#3D4A5C',
            marginBottom: '8px'
          }}>
            Welcome back, {selectedLearner?.name}!
          </h1>
          <p style={{
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: '18px',
            color: '#6B7A8D'
          }}>
            You're doing great! Keep going to complete your band preparation.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              logout();
              navigate('/profile-select');
            }}
            className="flex items-center justify-center gap-2"
            style={{
              width: '180px',
              height: '56px',
              background: '#E8524A',
              borderRadius: '16px',
              border: 'none',
              color: 'white',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <LogOut size={18} />
            Switch Learner
          </button>
        </div>
      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-[24px] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div className="mb-2 flex items-center justify-between">
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#6B7A8D' }}>Course Progress</span>
            <span style={{ fontWeight: 800, fontSize: '18px', color: '#4A90D9' }}>{averageProgress}%</span>
          </div>
          <div style={{ width: '100%', height: '12px', background: '#E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ width: `${averageProgress}%`, height: '100%', background: 'linear-gradient(90deg, #52C98A 0%, #4A90D9 100%)' }} />
          </div>
        </div>
        <div className="rounded-[24px] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div className="mb-2 flex items-center gap-2">
            <Award size={18} color="#F5A623" />
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#6B7A8D' }}>Completed Modules</span>
          </div>
          <div style={{ fontWeight: 800, fontSize: '28px', color: '#3D4A5C' }}>{completedCount} / {MODULES.length}</div>
        </div>
        <div className="rounded-[24px] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div style={{ fontWeight: 700, fontSize: '16px', color: '#6B7A8D' }}>Testing Ready</div>
          <div style={{ marginTop: '10px', fontWeight: 600, fontSize: '15px', color: '#3D4A5C' }}>
            All five modules are active and support lesson, practice, assessment, and results.
          </div>
        </div>
      </div>

      <h2 style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '22px', color: '#3D4A5C', marginBottom: '20px' }}>
        Your Learning Path
      </h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {MODULES.map((module) => {
          const progress = getModuleProgress(module.id);
          const percent = getModuleCompletionPercent(module, progress);
          const Icon = iconMap[module.icon];
          const ctaLabel = progress.completedAt ? 'Open Module' : percent > 0 ? 'Continue Module' : 'Start Module';

          return (
            <div
              key={module.id}
              className="flex flex-col rounded-[24px] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              style={{ border: `2px solid ${module.accentColor}` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="rounded-full px-3 py-1 text-[12px] font-[800] text-white"
                  style={{ background: module.accentColor }}
                >
                  {progress.completedAt ? 'COMPLETE' : percent > 0 ? 'ACTIVE' : 'READY'}
                </div>
                <div style={{ fontWeight: 800, fontSize: '14px', color: module.accentColor }}>{percent}%</div>
              </div>
              <div className="mb-4 flex h-16 items-center justify-center">
                <Icon size={44} color={module.accentColor} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '18px', color: '#3D4A5C', textAlign: 'center' }}>{module.title}</div>
              <div style={{ marginTop: '8px', minHeight: '54px', fontSize: '14px', color: '#6B7A8D', textAlign: 'center' }}>
                {module.summary}
              </div>
              <div style={{ marginTop: '12px', width: '100%', height: '10px', background: '#E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${percent}%`, height: '100%', background: module.accentColor }} />
              </div>
              <button
                onClick={() => navigate(`/module/${module.id}`)}
                style={{
                  width: '100%',
                  height: '46px',
                  marginTop: '16px',
                  borderRadius: '14px',
                  border: 'none',
                  background: module.accentColor,
                  color: 'white',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {ctaLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
