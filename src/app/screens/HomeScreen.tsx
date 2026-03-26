import { useNavigate } from 'react-router';
import { Award, Book, Drum, Lock, LogOut, Music, Trophy, Users } from 'lucide-react';
import { MODULES } from '../data/modules';
import { getModuleCompletionPercent, getNextModuleRoute } from '../lib/moduleProgress';
import { useAppState } from '../state/AppState';
import { ScreenLayout, BandCard, BandButton, BandBadge } from '../components/ui/band';

const iconMap = {
  book:   Book,
  music:  Music,
  drum:   Drum,
  users:  Users,
  trophy: Trophy,
} as const;

type ModuleStatus = 'complete' | 'active' | 'locked';

function resolveModuleStatuses(
  moduleIds: string[],
  getProgress: (id: string) => { completedAt?: number | null },
): Record<string, ModuleStatus> {
  const statuses: Record<string, ModuleStatus> = {};
  let foundActive = false;
  for (const id of moduleIds) {
    if (getProgress(id).completedAt) {
      statuses[id] = 'complete';
    } else if (!foundActive) {
      statuses[id] = 'active';
      foundActive = true;
    } else {
      statuses[id] = 'locked';
    }
  }
  return statuses;
}

const statusLabel: Record<ModuleStatus, string> = {
  complete: 'COMPLETE',
  active:   'CURRENT',
  locked:   'LOCKED',
};

const statusAccent: Record<ModuleStatus, string> = {
  complete: '#52C98A',
  active:   '#4A90D9',
  locked:   '#B0BEC5',
};

export function HomeScreen() {
  const navigate = useNavigate();
  const { selectedLearner, getModuleProgress, logout } = useAppState();

  const moduleStatuses = resolveModuleStatuses(
    MODULES.map(m => m.id),
    (id) => getModuleProgress(id as Parameters<typeof getModuleProgress>[0]),
  );

  const averageProgress = Math.round(
    MODULES.reduce(
      (total, module) => total + getModuleCompletionPercent(module, getModuleProgress(module.id)),
      0,
    ) / MODULES.length,
  );

  const completedCount = MODULES.filter(
    (module) => Boolean(getModuleProgress(module.id).completedAt),
  ).length;

  return (
    <ScreenLayout>
      {/* Top Row */}
      <div className="flex justify-between items-start mb-9">
        <div>
          <h1 className="text-4xl font-bold text-band-body mb-2">
            Welcome back, {selectedLearner?.name}!
          </h1>
          <p className="text-lg text-band-secondary">
            You're doing great! Keep going to complete your band preparation.
          </p>
        </div>

        <BandButton
          variant="danger"
          size="sm"
          className="rounded-[16px] px-5 h-14 text-base"
          onClick={() => {
            logout();
            navigate('/profile-select');
          }}
        >
          <LogOut size={18} />
          Switch Learner
        </BandButton>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid gap-5 md:grid-cols-3">
        {/* Course Progress */}
        <BandCard className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-base font-bold text-band-secondary">Course Progress</span>
            <span className="text-lg font-[800] text-band-active">{averageProgress}%</span>
          </div>
          <div className="w-full h-3 bg-band-border rounded-full overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${averageProgress}%`,
                background: 'linear-gradient(90deg, #52C98A 0%, #4A90D9 100%)',
              }}
            />
          </div>
        </BandCard>

        {/* Completed Modules */}
        <BandCard className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <Award size={18} color="#F5A623" />
            <span className="text-base font-bold text-band-secondary">Completed Modules</span>
          </div>
          <div className="text-[28px] font-[800] text-band-body">
            {completedCount} / {MODULES.length}
          </div>
        </BandCard>

        {/* Testing Ready */}
        <BandCard className="p-5">
          <div className="text-base font-bold text-band-secondary">Testing Ready</div>
          <div className="mt-2.5 text-[15px] font-semibold text-band-body">
            All five modules are active and support lesson, practice, assessment, and results.
          </div>
        </BandCard>
      </div>

      {/* Learning Path */}
      <h2 className="text-[22px] font-bold text-band-body mb-5">Your Learning Path</h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {MODULES.map((module) => {
          const progress  = getModuleProgress(module.id);
          const Icon      = iconMap[module.icon];
          const status    = moduleStatuses[module.id];
          const percent   = status === 'complete' ? 100 : getModuleCompletionPercent(module, progress);
          const accent    = statusAccent[status];
          const ctaLabel  = status === 'complete' ? 'Review Results'
                          : status === 'active'   ? (percent > 0 ? 'Continue' : 'Start Module')
                          :                         'Locked';

          return (
            <BandCard
              key={module.id}
              className="flex flex-col p-4"
              style={{
                border: `2px solid ${accent}`,
                backgroundColor: status === 'locked' ? '#F5F7FA' : undefined,
                boxShadow: status === 'active' ? '0 0 0 3px rgba(74,144,217,0.18), 0 4px 16px rgba(0,0,0,0.08)' : undefined,
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <BandBadge variant={status}>{statusLabel[status]}</BandBadge>
                <span className="text-sm font-[800]" style={{ color: accent }}>
                  {percent}%
                </span>
              </div>

              <div className={`mb-4 flex h-16 items-center justify-center${status === 'locked' ? ' opacity-40' : ''}`}>
                <Icon size={44} color={accent} />
              </div>

              <div className="text-lg font-[800] text-band-body text-center">{module.title}</div>
              <div className="mt-2 min-h-[54px] text-sm text-band-secondary text-center">
                {status === 'locked' ? 'Complete earlier modules to unlock.' : module.summary}
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full h-2.5 bg-band-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${percent}%`, backgroundColor: accent }}
                />
              </div>

              {/* Module CTA */}
              <BandButton
                className="w-full mt-4 rounded-[14px]"
                style={{ backgroundColor: accent }}
                disabled={status === 'locked'}
                onClick={status !== 'locked' ? () => navigate(getNextModuleRoute(module, progress)) : undefined}
              >
                {status === 'locked' ? <><Lock size={16} /> Locked</> : ctaLabel}
              </BandButton>
            </BandCard>
          );
        })}
      </div>
    </ScreenLayout>
  );
}
