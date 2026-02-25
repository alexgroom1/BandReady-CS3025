import { createBrowserRouter } from "react-router";
import { LaunchScreen } from "./screens/LaunchScreen";
import { ProfileSelectScreen } from "./screens/ProfileSelectScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ModuleIntroScreen } from "./screens/ModuleIntroScreen";
import { ActivityCorrectScreen } from "./screens/ActivityCorrectScreen";
import { ActivityIncorrectScreen } from "./screens/ActivityIncorrectScreen";
import { AssessmentScreen } from "./screens/AssessmentScreen";
import { ResultsPassScreen } from "./screens/ResultsPassScreen";
import { ResultsFailScreen } from "./screens/ResultsFailScreen";

// Lesson Steps
import { LessonStep1 } from "./screens/lesson/LessonStep1";
import { LessonStep2 } from "./screens/lesson/LessonStep2";
import { LessonStep3 } from "./screens/lesson/LessonStep3";
import { LessonStep4 } from "./screens/lesson/LessonStep4";
import { LessonStep5 } from "./screens/lesson/LessonStep5";

// Practice Questions (A = default, B = answered)
import { PracticeQ1A } from "./screens/practice/PracticeQ1A";
import { PracticeQ1B } from "./screens/practice/PracticeQ1B";
import { PracticeQ2A } from "./screens/practice/PracticeQ2A";
import { PracticeQ2B } from "./screens/practice/PracticeQ2B";
import { PracticeQ3A } from "./screens/practice/PracticeQ3A";
import { PracticeQ3B } from "./screens/practice/PracticeQ3B";
import { PracticeQ4A } from "./screens/practice/PracticeQ4A";
import { PracticeQ4B } from "./screens/practice/PracticeQ4B";
import { PracticeQ5A } from "./screens/practice/PracticeQ5A";
import { PracticeQ5B } from "./screens/practice/PracticeQ5B";
import { PracticeQ6A } from "./screens/practice/PracticeQ6A";
import { PracticeQ6B } from "./screens/practice/PracticeQ6B";
import { PracticeQ7A } from "./screens/practice/PracticeQ7A";
import { PracticeQ7B } from "./screens/practice/PracticeQ7B";
import { PracticeQ8A } from "./screens/practice/PracticeQ8A";
import { PracticeQ8B } from "./screens/practice/PracticeQ8B";

// Assessment Questions
import { AssessmentQ1 } from "./screens/assessment/AssessmentQ1";
import { AssessmentQ2 } from "./screens/assessment/AssessmentQ2";
import { AssessmentQ3 } from "./screens/assessment/AssessmentQ3";
import { AssessmentQ4 } from "./screens/assessment/AssessmentQ4";
import { AssessmentQ5 } from "./screens/assessment/AssessmentQ5";
import { AssessmentQ6 } from "./screens/assessment/AssessmentQ6";
import { AssessmentQ7 } from "./screens/assessment/AssessmentQ7";
import { AssessmentQ8 } from "./screens/assessment/AssessmentQ8";

export const router = createBrowserRouter([
  // Original screens
  {
    path: "/",
    Component: LaunchScreen,
  },
  {
    path: "/profile-select",
    Component: ProfileSelectScreen,
  },
  {
    path: "/home",
    Component: HomeScreen,
  },
  {
    path: "/module-intro",
    Component: ModuleIntroScreen,
  },
  {
    path: "/activity-correct",
    Component: ActivityCorrectScreen,
  },
  {
    path: "/activity-incorrect",
    Component: ActivityIncorrectScreen,
  },
  {
    path: "/assessment",
    Component: AssessmentScreen,
  },
  {
    path: "/results-pass",
    Component: ResultsPassScreen,
  },
  {
    path: "/results-fail",
    Component: ResultsFailScreen,
  },
  
  // Lesson Steps
  {
    path: "/lesson/step1",
    Component: LessonStep1,
  },
  {
    path: "/lesson/step2",
    Component: LessonStep2,
  },
  {
    path: "/lesson/step3",
    Component: LessonStep3,
  },
  {
    path: "/lesson/step4",
    Component: LessonStep4,
  },
  {
    path: "/lesson/step5",
    Component: LessonStep5,
  },
  
  // Practice Questions
  {
    path: "/practice/q1",
    Component: PracticeQ1A,
  },
  {
    path: "/practice/q1/answered",
    Component: PracticeQ1B,
  },
  {
    path: "/practice/q2",
    Component: PracticeQ2A,
  },
  {
    path: "/practice/q2/answered",
    Component: PracticeQ2B,
  },
  {
    path: "/practice/q3",
    Component: PracticeQ3A,
  },
  {
    path: "/practice/q3/answered",
    Component: PracticeQ3B,
  },
  {
    path: "/practice/q4",
    Component: PracticeQ4A,
  },
  {
    path: "/practice/q4/answered",
    Component: PracticeQ4B,
  },
  {
    path: "/practice/q5",
    Component: PracticeQ5A,
  },
  {
    path: "/practice/q5/answered",
    Component: PracticeQ5B,
  },
  {
    path: "/practice/q6",
    Component: PracticeQ6A,
  },
  {
    path: "/practice/q6/answered",
    Component: PracticeQ6B,
  },
  {
    path: "/practice/q7",
    Component: PracticeQ7A,
  },
  {
    path: "/practice/q7/answered",
    Component: PracticeQ7B,
  },
  {
    path: "/practice/q8",
    Component: PracticeQ8A,
  },
  {
    path: "/practice/q8/answered",
    Component: PracticeQ8B,
  },
  
  // Assessment Questions
  {
    path: "/assessment/q1",
    Component: AssessmentQ1,
  },
  {
    path: "/assessment/q2",
    Component: AssessmentQ2,
  },
  {
    path: "/assessment/q3",
    Component: AssessmentQ3,
  },
  {
    path: "/assessment/q4",
    Component: AssessmentQ4,
  },
  {
    path: "/assessment/q5",
    Component: AssessmentQ5,
  },
  {
    path: "/assessment/q6",
    Component: AssessmentQ6,
  },
  {
    path: "/assessment/q7",
    Component: AssessmentQ7,
  },
  {
    path: "/assessment/q8",
    Component: AssessmentQ8,
  },
]);
