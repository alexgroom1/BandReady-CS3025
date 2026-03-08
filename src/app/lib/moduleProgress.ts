import { MODULE_MAP } from '../data/modules';
import type {
  AssessmentAttempt,
  AssessmentReviewItem,
  ModuleDefinition,
  ModuleId,
  ModuleProgress,
} from '../types';

export function getModuleById(moduleId?: string): ModuleDefinition | null {
  if (!moduleId) {
    return null;
  }

  return MODULE_MAP[moduleId as ModuleId] ?? null;
}

export function getModuleCompletionPercent(module: ModuleDefinition, progress: ModuleProgress) {
  const lessonWeight = module.lessons.length;
  const practiceWeight = module.practiceQuestions.length;
  const assessmentDone = progress.completedAt ? 1 : 0;
  const totalWeight = lessonWeight + practiceWeight + 1;
  const completedWeight =
    progress.viewedLessonIds.length +
    progress.completedPracticeIds.length +
    assessmentDone;

  return Math.round((completedWeight / totalWeight) * 100);
}

export function getNextModuleRoute(module: ModuleDefinition, progress: ModuleProgress) {
  void progress;
  return `/module/${module.id}`;
}

export function getPassThresholdLabel(module: ModuleDefinition) {
  return `${module.passThreshold}/${module.assessmentQuestions.length}`;
}

export function getSafeModuleRoute(module: ModuleDefinition) {
  return `/module/${module.id}`;
}

export function getLessonBackRoute(module: ModuleDefinition, stepIndex: number) {
  if (stepIndex <= 0) {
    return getSafeModuleRoute(module);
  }

  return `/module/${module.id}/lesson/${module.lessons[stepIndex - 1].id}`;
}

export function getPracticeBackRoute(module: ModuleDefinition, questionIndex: number) {
  if (questionIndex <= 0) {
    return `/module/${module.id}/lesson/${module.lessons[module.lessons.length - 1].id}`;
  }

  return `/module/${module.id}/practice/${module.practiceQuestions[questionIndex - 1].id}`;
}

export function getAssessmentBackRoute(module: ModuleDefinition, questionIndex: number) {
  if (questionIndex <= 0) {
    return `/module/${module.id}/practice/${module.practiceQuestions[module.practiceQuestions.length - 1].id}`;
  }

  return `/module/${module.id}/assessment/${module.assessmentQuestions[questionIndex - 1].id}`;
}

export function isPracticeComplete(module: ModuleDefinition, progress: ModuleProgress) {
  return module.practiceQuestions.every((question) => progress.completedPracticeIds.includes(question.id));
}

export function getFirstIncompletePracticeQuestion(module: ModuleDefinition, progress: ModuleProgress) {
  return module.practiceQuestions.find((question) => !progress.completedPracticeIds.includes(question.id)) ?? null;
}

export function getLatestFinishedAttempt(progress: ModuleProgress): AssessmentAttempt | null {
  if (progress.currentAssessment?.finishedAt) {
    return progress.currentAssessment;
  }

  return progress.assessmentHistory.filter((attempt) => Boolean(attempt.finishedAt)).slice(-1)[0] ?? null;
}

export function getPracticeCardState(module: ModuleDefinition, progress: ModuleProgress, questionId: string) {
  const questionIndex = module.practiceQuestions.findIndex((question) => question.id === questionId);
  return {
    questionIndex,
    completed: progress.completedPracticeIds.includes(questionId),
    answered: Boolean(progress.practiceAnswers[questionId]),
  };
}

export function buildAssessmentReview(module: ModuleDefinition, attempt: AssessmentAttempt): AssessmentReviewItem[] {
  return module.assessmentQuestions.map((question) => {
    const selectedAnswerId = attempt.answers[question.id];
    const selectedAnswerLabel =
      question.options.find((option) => option.id === selectedAnswerId)?.label ?? 'No answer selected';
    const correctAnswerLabel =
      question.options.find((option) => option.id === question.correctOptionId)?.label ?? question.correctOptionId;

    return {
      questionId: question.id,
      prompt: question.prompt,
      selectedAnswerId,
      selectedAnswerLabel,
      correctAnswerId: question.correctOptionId,
      correctAnswerLabel,
      isCorrect: selectedAnswerId === question.correctOptionId,
    };
  });
}
