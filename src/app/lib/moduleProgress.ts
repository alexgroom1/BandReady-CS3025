import { MODULE_MAP } from '../data/modules';
import type { ModuleDefinition, ModuleId, ModuleProgress } from '../types';

export function getModuleById(moduleId?: string): ModuleDefinition | null {
  if (!moduleId) {
    return null;
  }

  return MODULE_MAP[moduleId as ModuleId] ?? null;
}

export function getModuleCompletionPercent(module: ModuleDefinition, progress: ModuleProgress) {
  const lessonWeight = module.lessons.length;
  const practiceWeight = module.practiceQuestions.length;
  const assessmentDone = progress.assessmentHistory.length > 0 ? 1 : 0;
  const totalWeight = lessonWeight + practiceWeight + 1;
  const completedWeight =
    progress.viewedLessonIds.length +
    progress.completedPracticeIds.length +
    assessmentDone;

  return Math.round((completedWeight / totalWeight) * 100);
}

export function getNextModuleRoute(module: ModuleDefinition, progress: ModuleProgress) {
  if (
    progress.viewedLessonIds.length === 0 &&
    progress.completedPracticeIds.length === 0 &&
    progress.assessmentHistory.length === 0 &&
    !progress.currentAssessment
  ) {
    return `/module/${module.id}`;
  }

  const nextLesson = module.lessons.find((lesson) => !progress.viewedLessonIds.includes(lesson.id));
  if (nextLesson) {
    return `/module/${module.id}/lesson/${nextLesson.id}`;
  }

  const nextPractice = module.practiceQuestions.find(
    (question) => !progress.completedPracticeIds.includes(question.id),
  );
  if (nextPractice) {
    return `/module/${module.id}/practice/${nextPractice.id}`;
  }

  const activeAttempt = progress.currentAssessment;
  const answeredCount = activeAttempt ? Object.keys(activeAttempt.answers).length : 0;
  if (answeredCount < module.assessmentQuestions.length) {
    const questionId = module.assessmentQuestions[answeredCount]?.id ?? module.assessmentQuestions[0].id;
    return `/module/${module.id}/assessment/${questionId}`;
  }

  return `/module/${module.id}/results`;
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
