import { createBrowserRouter } from 'react-router';
import { RequireLearner } from './components/RequireLearner';
import { RequireTeacher } from './components/RequireTeacher';
import { HomeScreen } from './screens/HomeScreen';
import { LaunchScreen } from './screens/LaunchScreen';
import { ModuleAssessmentScreen } from './screens/ModuleAssessmentScreen';
import { ModuleIntroScreen } from './screens/ModuleIntroScreen';
import { ModuleLessonScreen } from './screens/ModuleLessonScreen';
import { ModulePracticeScreen } from './screens/ModulePracticeScreen';
import { ModuleResultsScreen } from './screens/ModuleResultsScreen';
import { ProfileSelectScreen } from './screens/ProfileSelectScreen';
import { TeacherDashboardScreen } from './screens/TeacherDashboardScreen';
import { TeacherLoginScreen } from './screens/TeacherLoginScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LaunchScreen,
  },
  {
    path: '/profile-select',
    Component: ProfileSelectScreen,
  },
  {
    path: '/home',
    Component: () => (
      <RequireLearner>
        <HomeScreen />
      </RequireLearner>
    ),
  },
  {
    path: '/teacher-login',
    Component: TeacherLoginScreen,
  },
  {
    path: '/teacher',
    Component: () => (
      <RequireTeacher>
        <TeacherDashboardScreen />
      </RequireTeacher>
    ),
  },
  {
    path: '/module/:moduleId',
    Component: () => (
      <RequireLearner>
        <ModuleIntroScreen />
      </RequireLearner>
    ),
  },
  {
    path: '/module/:moduleId/lesson/:stepId',
    Component: () => (
      <RequireLearner>
        <ModuleLessonScreen />
      </RequireLearner>
    ),
  },
  {
    path: '/module/:moduleId/practice/:questionId',
    Component: () => (
      <RequireLearner>
        <ModulePracticeScreen />
      </RequireLearner>
    ),
  },
  {
    path: '/module/:moduleId/assessment/:questionId',
    Component: () => (
      <RequireLearner>
        <ModuleAssessmentScreen />
      </RequireLearner>
    ),
  },
  {
    path: '/module/:moduleId/results',
    Component: () => (
      <RequireLearner>
        <ModuleResultsScreen />
      </RequireLearner>
    ),
  },
]);
