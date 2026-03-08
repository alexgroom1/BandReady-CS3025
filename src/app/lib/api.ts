import { MODULES } from '../data/modules';
import type {
  AssessmentAttempt,
  LearnerProfile,
  LearnerProgress,
  ModuleId,
  ModuleProgress,
  TeacherDashboardView,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers,
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed for ${path}`);
  }

  return response.json() as Promise<T>;
}

export function createEmptyModuleProgress(): ModuleProgress {
  return {
    viewedLessonIds: [],
    practiceAnswers: {},
    completedPracticeIds: [],
    assessmentHistory: [],
    navigationErrorCount: 0,
  };
}

export function createEmptyLearnerProgress(): LearnerProgress {
  return {
    modules: MODULES.reduce((accumulator, module) => {
      accumulator[module.id] = createEmptyModuleProgress();
      return accumulator;
    }, {} as Record<ModuleId, ModuleProgress>),
  };
}

export async function fetchLearners() {
  return request<LearnerProfile[]>('/api/learners');
}

export async function fetchLearnerProgress(learnerId: string) {
  return request<LearnerProgress>(`/api/learners/${learnerId}/progress`);
}

export async function updateModuleProgress(
  learnerId: string,
  moduleId: ModuleId,
  progress: ModuleProgress,
) {
  return request<ModuleProgress>(`/api/learners/${learnerId}/modules/${moduleId}/progress`, {
    method: 'PUT',
    body: JSON.stringify(progress),
  });
}

export async function startAssessmentAttempt(
  learnerId: string,
  moduleId: ModuleId,
  startedAt: number,
) {
  return request<AssessmentAttempt>(`/api/learners/${learnerId}/modules/${moduleId}/assessment/start`, {
    method: 'POST',
    body: JSON.stringify({ startedAt }),
  });
}

export async function updateAssessmentAttempt(
  learnerId: string,
  moduleId: ModuleId,
  attempt: AssessmentAttempt,
  moduleProgress: ModuleProgress,
) {
  if (!attempt.id) {
    throw new Error('Assessment attempt id is required before updating.');
  }

  return request<ModuleProgress>(
    `/api/learners/${learnerId}/modules/${moduleId}/assessment/${attempt.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...attempt,
        moduleProgress,
      }),
    },
  );
}

export async function teacherLogin(pin: string) {
  return request<{ authenticated: boolean }>('/api/teacher/login', {
    method: 'POST',
    body: JSON.stringify({ pin }),
  });
}

export async function teacherLogout() {
  return request<{ authenticated: boolean }>('/api/teacher/logout', {
    method: 'POST',
  });
}

export async function fetchTeacherDashboard() {
  const params = new URLSearchParams(
    Object.fromEntries(MODULES.map((module) => [module.id, module.title])),
  );
  return request<TeacherDashboardView>(`/api/teacher/dashboard?${params.toString()}`);
}
