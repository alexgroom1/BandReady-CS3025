export type ModuleId =
  | 'reading-music'
  | 'note-names'
  | 'rhythm-basics'
  | 'instrument-families'
  | 'final-challenge';

export type StaffPosition =
  | 'line1'
  | 'line2'
  | 'line3'
  | 'line4'
  | 'line5'
  | 'space1'
  | 'space2'
  | 'space3'
  | 'space4';

export type QuestionVisual =
  | {
      kind: 'staff-note';
      position: StaffPosition;
      color: string;
      showLabel?: boolean;
    }
  | {
      kind: 'staff-numbering';
      emphasize?: StaffPosition;
      showNoteNames?: boolean;
    }
  | {
      kind: 'staff-treble-names';
    }
  | {
      kind: 'staff-sequence';
      items: Array<{
        position: StaffPosition;
        label: string;
        color: string;
      }>;
      title?: string;
    }
  | {
      kind: 'rhythm-pattern';
      patternId: string;
      title?: string;
    }
  | {
      kind: 'instrument-family';
      family: string;
      instrument: string;
      details?: string[];
    }
  | {
      kind: 'text';
      title: string;
      lines: string[];
    };

export interface AnswerOption {
  id: string;
  label: string;
}

export interface LessonStepDefinition {
  id: string;
  title: string;
  description: string;
  helperText?: string;
  audioLabel?: string;
  visual: QuestionVisual;
}

export interface PracticeQuestionDefinition {
  id: string;
  prompt: string;
  options: AnswerOption[];
  correctOptionId: string;
  hint: string;
  encouragement: string;
  successMessage: string;
  visual: QuestionVisual;
}

export interface AssessmentQuestionDefinition {
  id: string;
  prompt: string;
  options: AnswerOption[];
  correctOptionId: string;
  visual: QuestionVisual;
}

export interface ModuleDefinition {
  id: ModuleId;
  title: string;
  shortTitle: string;
  description: string;
  icon: 'book' | 'music' | 'drum' | 'users' | 'trophy';
  accentColor: string;
  summary: string;
  lessons: LessonStepDefinition[];
  practiceQuestions: PracticeQuestionDefinition[];
  assessmentQuestions: AssessmentQuestionDefinition[];
  passThreshold: number;
  estimatedMinutes: number;
}

export interface LearnerProfile {
  id: string;
  initial: string;
  name: string;
  color: string;
}

export interface AssessmentAttempt {
  id?: number;
  startedAt: number;
  finishedAt?: number;
  answers: Record<string, string>;
  score: number;
  total: number;
  passed: boolean;
}

export interface AssessmentReviewItem {
  questionId: string;
  prompt: string;
  selectedAnswerId?: string;
  selectedAnswerLabel: string;
  correctAnswerId: string;
  correctAnswerLabel: string;
  isCorrect: boolean;
}

export interface ModuleProgress {
  viewedLessonIds: string[];
  practiceAnswers: Record<string, string>;
  completedPracticeIds: string[];
  currentAssessment?: AssessmentAttempt;
  assessmentHistory: AssessmentAttempt[];
  lastVisitedAt?: number;
  completedAt?: number;
  lastVisitedRoute?: string;
  navigationErrorCount: number;
}

export interface LearnerProgress {
  modules: Record<ModuleId, ModuleProgress>;
}

export interface TeacherDashboardLearner {
  learner: LearnerProfile;
  moduleSummaries: Array<{
    moduleId: ModuleId;
    moduleTitle: string;
    completed: boolean;
    latestScoreLabel: string;
    attempts: number;
    lastVisitedLabel: string;
  }>;
}

export interface TeacherDashboardView {
  learners: TeacherDashboardLearner[];
}

export interface TeacherAuthState {
  teacherAuthenticated: boolean;
  teacherAuthCheckedAt?: number;
}
