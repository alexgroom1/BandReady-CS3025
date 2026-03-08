import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { MODULES } from '../data/modules';
import {
  createEmptyLearnerProgress,
  createEmptyModuleProgress,
  fetchLearnerProgress,
  fetchLearners,
  fetchTeacherDashboard,
  startAssessmentAttempt,
  teacherLogin,
  teacherLogout,
  updateAssessmentAttempt,
  updateModuleProgress,
} from '../lib/api';
import type {
  AssessmentAttempt,
  LearnerProfile,
  LearnerProgress,
  ModuleId,
  ModuleProgress,
  TeacherDashboardView,
} from '../types';

interface AppStateValue {
  learners: LearnerProfile[];
  learnersLoading: boolean;
  selectedLearner: LearnerProfile | null;
  selectLearner: (learnerId: string) => void;
  logout: () => void;
  teacherAuthenticated: boolean;
  authenticateTeacher: (pin: string) => Promise<boolean>;
  clearTeacherAuth: () => Promise<void>;
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
  refreshTeacherDashboard: () => Promise<void>;
  teacherDashboardLoading: boolean;
}

interface AppStateShape {
  learners: LearnerProfile[];
  selectedLearnerId: string | null;
  progressByLearner: Record<string, LearnerProgress>;
  teacherAuthenticated: boolean;
  teacherDashboard: TeacherDashboardView;
}

const AppStateContext = createContext<AppStateValue | null>(null);

function formatRelativeDate(timestamp?: number) {
  if (!timestamp) {
    return 'No activity yet';
  }

  return new Date(timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

function emptyDashboard(): TeacherDashboardView {
  return { learners: [] };
}

export function AppStateProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AppStateShape>({
    learners: [],
    selectedLearnerId: null,
    progressByLearner: {},
    teacherAuthenticated: false,
    teacherDashboard: emptyDashboard(),
  });
  const [learnersLoading, setLearnersLoading] = useState(true);
  const [teacherDashboardLoading, setTeacherDashboardLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLearnersLoading(true);
    void fetchLearners()
      .then((learners) => {
        if (cancelled) {
          return;
        }
        setState((currentState) => ({
          ...currentState,
          learners,
        }));
      })
      .catch((error) => {
        console.error('Failed to load learners', error);
      })
      .finally(() => {
        if (!cancelled) {
          setLearnersLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedLearner = useMemo(
    () => state.learners.find((profile) => profile.id === state.selectedLearnerId) ?? null,
    [state.learners, state.selectedLearnerId],
  );

  const getLearnerProgress = useCallback((learnerId?: string | null) => {
    if (!learnerId) {
      return createEmptyLearnerProgress();
    }
    return state.progressByLearner[learnerId] ?? createEmptyLearnerProgress();
  }, [state.progressByLearner]);

  const syncModuleProgress = useCallback((learnerId: string, moduleId: ModuleId, progress: ModuleProgress) => {
    void updateModuleProgress(learnerId, moduleId, progress).catch((error) => {
      console.error(`Failed to persist module progress for ${moduleId}`, error);
    });
  }, []);

  const setModuleProgressForSelectedLearner = useCallback((
    moduleId: ModuleId,
    updater: (progress: ModuleProgress) => ModuleProgress,
  ) => {
    let learnerId: string | null = null;
    let nextProgress: ModuleProgress | null = null;

    setState((currentState) => {
      learnerId = currentState.selectedLearnerId;
      if (!learnerId) {
        return currentState;
      }

      const learnerProgress = currentState.progressByLearner[learnerId] ?? createEmptyLearnerProgress();
      const moduleProgress = learnerProgress.modules[moduleId] ?? createEmptyModuleProgress();
      nextProgress = updater(moduleProgress);

      return {
        ...currentState,
        progressByLearner: {
          ...currentState.progressByLearner,
          [learnerId]: {
            ...learnerProgress,
            modules: {
              ...learnerProgress.modules,
              [moduleId]: nextProgress,
            },
          },
        },
      };
    });

    if (learnerId && nextProgress) {
      syncModuleProgress(learnerId, moduleId, nextProgress);
    }
  }, [syncModuleProgress]);

  const selectLearner = useCallback((learnerId: string) => {
    setState((currentState) => ({
      ...currentState,
      selectedLearnerId: learnerId,
      progressByLearner: {
        ...currentState.progressByLearner,
        [learnerId]: currentState.progressByLearner[learnerId] ?? createEmptyLearnerProgress(),
      },
      teacherAuthenticated: false,
    }));

    void fetchLearnerProgress(learnerId)
      .then((progress) => {
        setState((currentState) => ({
          ...currentState,
          progressByLearner: {
            ...currentState.progressByLearner,
            [learnerId]: progress,
          },
        }));
      })
      .catch((error) => {
        console.error(`Failed to load progress for learner ${learnerId}`, error);
      });
  }, []);

  const logout = useCallback(() => {
    setState((currentState) => ({
      ...currentState,
      selectedLearnerId: null,
    }));
  }, []);

  const authenticateTeacher = useCallback(async (pin: string) => {
    try {
      const response = await teacherLogin(pin);
      setState((currentState) => ({
        ...currentState,
        teacherAuthenticated: response.authenticated,
      }));
      return response.authenticated;
    } catch (error) {
      console.error('Teacher login failed', error);
      setState((currentState) => ({
        ...currentState,
        teacherAuthenticated: false,
      }));
      return false;
    }
  }, []);

  const clearTeacherAuth = useCallback(async () => {
    try {
      await teacherLogout();
    } catch (error) {
      console.error('Teacher logout failed', error);
    } finally {
      setState((currentState) => ({
        ...currentState,
        teacherAuthenticated: false,
      }));
    }
  }, []);

  const getModuleProgress = useCallback((moduleId: ModuleId) => {
    const learnerProgress = getLearnerProgress(state.selectedLearnerId);
    return learnerProgress.modules[moduleId] ?? createEmptyModuleProgress();
  }, [getLearnerProgress, state.selectedLearnerId]);

  const markLessonViewed = useCallback((moduleId: ModuleId, lessonId: string) => {
    setModuleProgressForSelectedLearner(moduleId, (moduleProgress) => ({
      ...moduleProgress,
      viewedLessonIds: Array.from(new Set([...moduleProgress.viewedLessonIds, lessonId])),
      lastVisitedAt: Date.now(),
      lastVisitedRoute: `/module/${moduleId}/lesson/${lessonId}`,
    }));
  }, [setModuleProgressForSelectedLearner]);

  const submitPracticeAnswer = useCallback((
    moduleId: ModuleId,
    questionId: string,
    answerId: string,
  ) => {
    setModuleProgressForSelectedLearner(moduleId, (moduleProgress) => ({
      ...moduleProgress,
      practiceAnswers: {
        ...moduleProgress.practiceAnswers,
        [questionId]: answerId,
      },
      completedPracticeIds: Array.from(new Set([...moduleProgress.completedPracticeIds, questionId])),
      lastVisitedAt: Date.now(),
      lastVisitedRoute: `/module/${moduleId}/practice/${questionId}`,
    }));
  }, [setModuleProgressForSelectedLearner]);

  const startAssessment = useCallback((moduleId: ModuleId) => {
    let learnerId: string | null = null;
    let createdAttempt: AssessmentAttempt | null = null;

    setState((currentState) => {
      learnerId = currentState.selectedLearnerId;
      if (!learnerId) {
        return currentState;
      }

      const learnerProgress = currentState.progressByLearner[learnerId] ?? createEmptyLearnerProgress();
      const moduleProgress = learnerProgress.modules[moduleId] ?? createEmptyModuleProgress();
      if (moduleProgress.currentAssessment && !moduleProgress.currentAssessment.finishedAt) {
        return currentState;
      }

      createdAttempt = {
        startedAt: Date.now(),
        answers: {},
        score: 0,
        total: 0,
        passed: false,
      };

      return {
        ...currentState,
        progressByLearner: {
          ...currentState.progressByLearner,
          [learnerId]: {
            ...learnerProgress,
            modules: {
              ...learnerProgress.modules,
              [moduleId]: {
                ...moduleProgress,
                currentAssessment: createdAttempt,
                lastVisitedAt: Date.now(),
                lastVisitedRoute: `/module/${moduleId}/assessment/${MODULES.find((module) => module.id === moduleId)?.assessmentQuestions[0]?.id ?? ''}`,
              },
            },
          },
        },
      };
    });

    if (!learnerId || !createdAttempt) {
      return;
    }

    void startAssessmentAttempt(learnerId, moduleId, createdAttempt.startedAt)
      .then((attempt) => {
        setState((currentState) => {
          const learnerProgress = currentState.progressByLearner[learnerId!] ?? createEmptyLearnerProgress();
          const moduleProgress = learnerProgress.modules[moduleId] ?? createEmptyModuleProgress();
          return {
            ...currentState,
            progressByLearner: {
              ...currentState.progressByLearner,
              [learnerId!]: {
                ...learnerProgress,
                modules: {
                  ...learnerProgress.modules,
                  [moduleId]: {
                    ...moduleProgress,
                    currentAssessment: attempt,
                  },
                },
              },
            },
          };
        });
      })
      .catch((error) => {
        console.error(`Failed to start assessment for ${moduleId}`, error);
      });
  }, []);

  const submitAssessmentAnswer = useCallback((
    moduleId: ModuleId,
    questionId: string,
    answerId: string,
    isCorrect: boolean,
    isLastQuestion: boolean,
  ) => {
    let learnerId: string | null = null;
    let nextAttempt: AssessmentAttempt | null = null;
    let nextModuleProgress: ModuleProgress | null = null;

    setState((currentState) => {
      learnerId = currentState.selectedLearnerId;
      if (!learnerId) {
        return currentState;
      }

      const learnerProgress = currentState.progressByLearner[learnerId] ?? createEmptyLearnerProgress();
      const moduleProgress = learnerProgress.modules[moduleId] ?? createEmptyModuleProgress();
      const activeAttempt = moduleProgress.currentAssessment && !moduleProgress.currentAssessment.finishedAt
        ? moduleProgress.currentAssessment
        : {
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

      const passThreshold = MODULES.find((module) => module.id === moduleId)?.passThreshold ?? 0;
      nextAttempt = isLastQuestion
        ? {
            ...updatedAttempt,
            finishedAt: Date.now(),
            passed: updatedAttempt.score >= passThreshold,
          }
        : updatedAttempt;

      nextModuleProgress = {
        ...moduleProgress,
        currentAssessment: nextAttempt,
        assessmentHistory: isLastQuestion
          ? [...moduleProgress.assessmentHistory, nextAttempt]
          : moduleProgress.assessmentHistory,
        completedAt:
          isLastQuestion && nextAttempt.passed
            ? Date.now()
            : moduleProgress.completedAt,
        lastVisitedAt: Date.now(),
        lastVisitedRoute: isLastQuestion
          ? `/module/${moduleId}/results`
          : `/module/${moduleId}/assessment/${questionId}`,
      };

      return {
        ...currentState,
        progressByLearner: {
          ...currentState.progressByLearner,
          [learnerId]: {
            ...learnerProgress,
            modules: {
              ...learnerProgress.modules,
              [moduleId]: nextModuleProgress,
            },
          },
        },
      };
    });

    if (!learnerId || !nextModuleProgress || !nextAttempt) {
      return;
    }

    const persist = (attemptToPersist: AssessmentAttempt) =>
      updateAssessmentAttempt(learnerId!, moduleId, attemptToPersist, nextModuleProgress!);

    void (async () => {
      let attemptForPersistence = nextAttempt!;
      if (!attemptForPersistence.id) {
        attemptForPersistence = await startAssessmentAttempt(learnerId!, moduleId, attemptForPersistence.startedAt);
        setState((currentState) => {
          const learnerProgress = currentState.progressByLearner[learnerId!] ?? createEmptyLearnerProgress();
          const moduleProgress = learnerProgress.modules[moduleId] ?? createEmptyModuleProgress();
          return {
            ...currentState,
            progressByLearner: {
              ...currentState.progressByLearner,
              [learnerId!]: {
                ...learnerProgress,
                modules: {
                  ...learnerProgress.modules,
                  [moduleId]: {
                    ...moduleProgress,
                    currentAssessment: {
                      ...moduleProgress.currentAssessment,
                      id: attemptForPersistence.id,
                    } as AssessmentAttempt,
                  },
                },
              },
            },
          };
        });
        attemptForPersistence = {
          ...nextAttempt!,
          id: attemptForPersistence.id,
        };
      }

      const persistedModuleProgress = await persist(attemptForPersistence);
      setState((currentState) => {
        const learnerProgress = currentState.progressByLearner[learnerId!] ?? createEmptyLearnerProgress();
        return {
          ...currentState,
          progressByLearner: {
            ...currentState.progressByLearner,
            [learnerId!]: {
              ...learnerProgress,
              modules: {
                ...learnerProgress.modules,
                [moduleId]: persistedModuleProgress,
              },
            },
          },
        };
      });
    })().catch((error) => {
      console.error(`Failed to persist assessment answer for ${moduleId}`, error);
    });
  }, []);

  const markRouteVisited = useCallback((moduleId: ModuleId, route: string) => {
    setModuleProgressForSelectedLearner(moduleId, (moduleProgress) => ({
      ...moduleProgress,
      lastVisitedAt: Date.now(),
      lastVisitedRoute: route,
    }));
  }, [setModuleProgressForSelectedLearner]);

  const recordNavigationError = useCallback((moduleId: ModuleId) => {
    setModuleProgressForSelectedLearner(moduleId, (moduleProgress) => ({
      ...moduleProgress,
      navigationErrorCount: moduleProgress.navigationErrorCount + 1,
      lastVisitedAt: Date.now(),
    }));
  }, [setModuleProgressForSelectedLearner]);

  const refreshTeacherDashboard = useCallback(async () => {
    setTeacherDashboardLoading(true);
    try {
      const dashboard = await fetchTeacherDashboard();
      setState((currentState) => ({
        ...currentState,
        teacherDashboard: dashboard,
      }));
    } catch (error) {
      console.error('Failed to load teacher dashboard', error);
    } finally {
      setTeacherDashboardLoading(false);
    }
  }, []);

  const getTeacherDashboardView = useCallback(() => {
    if (state.teacherDashboard.learners.length > 0) {
      return state.teacherDashboard;
    }

    return {
      learners: state.learners.map((learner) => {
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
  }, [getLearnerProgress, state.learners, state.teacherDashboard]);

  const value = useMemo<AppStateValue>(() => ({
    learners: state.learners,
    learnersLoading,
    selectedLearner,
    selectLearner,
    logout,
    teacherAuthenticated: state.teacherAuthenticated,
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
    refreshTeacherDashboard,
    teacherDashboardLoading,
  }), [
    state.learners,
    learnersLoading,
    selectedLearner,
    selectLearner,
    logout,
    state.teacherAuthenticated,
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
    refreshTeacherDashboard,
    teacherDashboardLoading,
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
