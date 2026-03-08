import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { LEARNER_PROFILES, MODULES } from '../data/modules';
import type {
  AssessmentAttempt,
  LearnerProfile,
  LearnerProgress,
  ModuleId,
  ModuleProgress,
  TeacherDashboardView,
  TeacherAuthState,
} from '../types';

const STORAGE_KEY = 'band-ready-state-v1';
const TEACHER_PIN = '3025';

interface StoredState {
  selectedLearnerId: string | null;
  progressByLearner: Record<string, LearnerProgress>;
  teacherAuth: TeacherAuthState;
}

interface AppStateValue {
  learners: LearnerProfile[];
  selectedLearner: LearnerProfile | null;
  selectLearner: (learnerId: string) => void;
  logout: () => void;
  teacherAuthenticated: boolean;
  authenticateTeacher: (pin: string) => boolean;
  clearTeacherAuth: () => void;
  getModuleProgress: (moduleId: ModuleId) => ModuleProgress;
  markLessonViewed: (moduleId: ModuleId, lessonId: string) => void;
  submitPracticeAnswer: (moduleId: ModuleId, questionId: string, answerId: string) => void;
  startAssessment: (moduleId: ModuleId) => void;
  submitAssessmentAnswer: (
    moduleId: ModuleId,
    questionId: string,
    answerId: string,
    isCorrect: boolean,
    isLastQuestion: boolean,
  ) => void;
  markRouteVisited: (moduleId: ModuleId, route: string) => void;
  recordNavigationError: (moduleId: ModuleId) => void;
  getTeacherDashboardView: () => TeacherDashboardView;
}

const AppStateContext = createContext<AppStateValue | null>(null);

function createEmptyModuleProgress(): ModuleProgress {
  return {
    viewedLessonIds: [],
    practiceAnswers: {},
    completedPracticeIds: [],
    assessmentHistory: [],
    navigationErrorCount: 0,
  };
}

function createEmptyLearnerProgress(): LearnerProgress {
  return {
    modules: MODULES.reduce((accumulator, module) => {
      accumulator[module.id] = createEmptyModuleProgress();
      return accumulator;
    }, {} as Record<ModuleId, ModuleProgress>),
  };
}

function hydrateState(): StoredState {
  const emptyState: StoredState = {
    selectedLearnerId: null,
    progressByLearner: {},
    teacherAuth: { teacherAuthenticated: false },
  };

  if (typeof window === 'undefined') {
    return emptyState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptyState;
    }

    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return {
      selectedLearnerId: parsed.selectedLearnerId ?? null,
      progressByLearner: parsed.progressByLearner ?? {},
      teacherAuth: parsed.teacherAuth ?? { teacherAuthenticated: false },
    };
  } catch {
    return emptyState;
  }
}

function formatRelativeDate(timestamp?: number) {
  if (!timestamp) {
    return 'No activity yet';
  }

  return new Date(timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function AppStateProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<StoredState>(() => hydrateState());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const selectedLearner = useMemo(
    () => LEARNER_PROFILES.find((profile) => profile.id === state.selectedLearnerId) ?? null,
    [state.selectedLearnerId],
  );

  const updateLearnerProgress = useCallback((
    updater: (progress: LearnerProgress) => LearnerProgress,
  ) => {
    setState((currentState) => {
      const learnerId = currentState.selectedLearnerId;
      if (!learnerId) {
        return currentState;
      }

      const currentProgress = currentState.progressByLearner[learnerId] ?? createEmptyLearnerProgress();

      return {
        ...currentState,
        progressByLearner: {
          ...currentState.progressByLearner,
          [learnerId]: updater(currentProgress),
        },
      };
    });
  }, []);

  const getLearnerProgress = useCallback((learnerId?: string | null) => {
    if (!learnerId) {
      return createEmptyLearnerProgress();
    }
    return state.progressByLearner[learnerId] ?? createEmptyLearnerProgress();
  }, [state.progressByLearner]);

  const selectLearner = useCallback((learnerId: string) => {
    setState((currentState) => ({
      selectedLearnerId: learnerId,
      progressByLearner: {
        ...currentState.progressByLearner,
        [learnerId]: currentState.progressByLearner[learnerId] ?? createEmptyLearnerProgress(),
      },
      teacherAuth: {
        teacherAuthenticated: false,
        teacherAuthCheckedAt: currentState.teacherAuth.teacherAuthCheckedAt,
      },
    }));
  }, []);

  const logout = useCallback(() => {
    setState((currentState) => ({
      ...currentState,
      selectedLearnerId: null,
    }));
  }, []);

  const authenticateTeacher = useCallback((pin: string) => {
    const passed = pin === TEACHER_PIN;
    setState((currentState) => ({
      ...currentState,
      teacherAuth: {
        teacherAuthenticated: passed,
        teacherAuthCheckedAt: Date.now(),
      },
    }));
    return passed;
  }, []);

  const clearTeacherAuth = useCallback(() => {
    setState((currentState) => ({
      ...currentState,
      teacherAuth: {
        teacherAuthenticated: false,
        teacherAuthCheckedAt: Date.now(),
      },
    }));
  }, []);

  const getModuleProgress = useCallback((moduleId: ModuleId) => {
    const learnerProgress = getLearnerProgress(state.selectedLearnerId);
    return learnerProgress.modules[moduleId] ?? createEmptyModuleProgress();
  }, [getLearnerProgress, state.selectedLearnerId]);

  const markLessonViewed = useCallback((moduleId: ModuleId, lessonId: string) => {
    updateLearnerProgress((progress) => {
      const moduleProgress = progress.modules[moduleId] ?? createEmptyModuleProgress();
      return {
        ...progress,
        modules: {
          ...progress.modules,
          [moduleId]: {
            ...moduleProgress,
            viewedLessonIds: Array.from(new Set([...moduleProgress.viewedLessonIds, lessonId])),
            lastVisitedAt: Date.now(),
            lastVisitedRoute: `/module/${moduleId}/lesson/${lessonId}`,
          },
        },
      };
    });
  }, [updateLearnerProgress]);

  const submitPracticeAnswer = useCallback((
    moduleId: ModuleId,
    questionId: string,
    answerId: string,
  ) => {
    updateLearnerProgress((progress) => {
      const moduleProgress = progress.modules[moduleId] ?? createEmptyModuleProgress();
      return {
        ...progress,
        modules: {
          ...progress.modules,
          [moduleId]: {
            ...moduleProgress,
            practiceAnswers: {
              ...moduleProgress.practiceAnswers,
              [questionId]: answerId,
            },
            completedPracticeIds: Array.from(new Set([...moduleProgress.completedPracticeIds, questionId])),
            lastVisitedAt: Date.now(),
            lastVisitedRoute: `/module/${moduleId}/practice/${questionId}`,
          },
        },
      };
    });
  }, [updateLearnerProgress]);

  const startAssessment = useCallback((moduleId: ModuleId) => {
    updateLearnerProgress((progress) => {
      const moduleProgress = progress.modules[moduleId] ?? createEmptyModuleProgress();
      if (moduleProgress.currentAssessment && !moduleProgress.currentAssessment.finishedAt) {
        return progress;
      }
      const newAttempt: AssessmentAttempt = {
        startedAt: Date.now(),
        answers: {},
        score: 0,
        total: 0,
        passed: false,
      };

      return {
        ...progress,
        modules: {
          ...progress.modules,
          [moduleId]: {
            ...moduleProgress,
            currentAssessment: newAttempt,
            lastVisitedAt: Date.now(),
            lastVisitedRoute: `/module/${moduleId}/assessment/${MODULES.find((module) => module.id === moduleId)?.assessmentQuestions[0]?.id ?? ''}`,
          },
        },
      };
    });
  }, [updateLearnerProgress]);

  const submitAssessmentAnswer = useCallback((
    moduleId: ModuleId,
    questionId: string,
    answerId: string,
    isCorrect: boolean,
    isLastQuestion: boolean,
  ) => {
    updateLearnerProgress((progress) => {
      const moduleProgress = progress.modules[moduleId] ?? createEmptyModuleProgress();
      const activeAttempt = moduleProgress.currentAssessment ?? {
        startedAt: Date.now(),
        answers: {},
        score: 0,
        total: 0,
        passed: false,
      };

      const updatedAttempt: AssessmentAttempt = {
        ...activeAttempt,
        answers: {
          ...activeAttempt.answers,
          [questionId]: answerId,
        },
        score: activeAttempt.score + (isCorrect ? 1 : 0),
        total: activeAttempt.total + 1,
      };

      const finalAttempt = isLastQuestion
        ? {
            ...updatedAttempt,
            finishedAt: Date.now(),
            passed: updatedAttempt.score >= MODULES.find((module) => module.id === moduleId)!.passThreshold,
          }
        : updatedAttempt;

      return {
        ...progress,
        modules: {
          ...progress.modules,
          [moduleId]: {
            ...moduleProgress,
            currentAssessment: finalAttempt,
            assessmentHistory: isLastQuestion
              ? [...moduleProgress.assessmentHistory, finalAttempt]
              : moduleProgress.assessmentHistory,
            completedAt: isLastQuestion && finalAttempt.passed ? Date.now() : moduleProgress.completedAt,
            lastVisitedAt: Date.now(),
            lastVisitedRoute: isLastQuestion
              ? `/module/${moduleId}/results`
              : `/module/${moduleId}/assessment/${questionId}`,
          },
        },
      };
    });
  }, [updateLearnerProgress]);

  const markRouteVisited = useCallback((moduleId: ModuleId, route: string) => {
    updateLearnerProgress((progress) => {
      const moduleProgress = progress.modules[moduleId] ?? createEmptyModuleProgress();
      return {
        ...progress,
        modules: {
          ...progress.modules,
          [moduleId]: {
            ...moduleProgress,
            lastVisitedAt: Date.now(),
            lastVisitedRoute: route,
          },
        },
      };
    });
  }, [updateLearnerProgress]);

  const recordNavigationError = useCallback((moduleId: ModuleId) => {
    updateLearnerProgress((progress) => {
      const moduleProgress = progress.modules[moduleId] ?? createEmptyModuleProgress();
      return {
        ...progress,
        modules: {
          ...progress.modules,
          [moduleId]: {
            ...moduleProgress,
            navigationErrorCount: moduleProgress.navigationErrorCount + 1,
            lastVisitedAt: Date.now(),
          },
        },
      };
    });
  }, [updateLearnerProgress]);

  const getTeacherDashboardView = useCallback(() => {
    return {
      learners: LEARNER_PROFILES.map((learner) => {
        const progress = getLearnerProgress(learner.id);
        return {
          learner,
          moduleSummaries: MODULES.map((module) => {
            const moduleProgress = progress.modules[module.id] ?? createEmptyModuleProgress();
            const latestAttempt = moduleProgress.assessmentHistory[moduleProgress.assessmentHistory.length - 1];
            return {
              moduleId: module.id,
              moduleTitle: module.title,
              completed: Boolean(moduleProgress.completedAt),
              latestScoreLabel: latestAttempt
                ? `${latestAttempt.score}/${latestAttempt.total} ${latestAttempt.passed ? 'pass' : 'retry'}`
                : 'No attempts yet',
              attempts: moduleProgress.assessmentHistory.length,
              lastVisitedLabel: `${formatRelativeDate(moduleProgress.lastVisitedAt)} • nav errors ${moduleProgress.navigationErrorCount}`,
            };
          }),
        };
      }),
    };
  }, [getLearnerProgress]);

  const value: AppStateValue = useMemo(() => ({
    learners: LEARNER_PROFILES,
    selectedLearner,
    selectLearner,
    logout,
    teacherAuthenticated: state.teacherAuth.teacherAuthenticated,
    authenticateTeacher,
    clearTeacherAuth,
    getModuleProgress,
    markLessonViewed,
    submitPracticeAnswer,
    startAssessment,
    submitAssessmentAnswer,
    markRouteVisited,
    recordNavigationError,
    getTeacherDashboardView,
  }), [
    selectedLearner,
    selectLearner,
    logout,
    state.teacherAuth.teacherAuthenticated,
    authenticateTeacher,
    clearTeacherAuth,
    getModuleProgress,
    markLessonViewed,
    submitPracticeAnswer,
    startAssessment,
    submitAssessmentAnswer,
    markRouteVisited,
    recordNavigationError,
    getTeacherDashboardView,
  ]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }
  return context;
}
