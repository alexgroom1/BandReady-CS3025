import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../state/AppState';

export function RequireTeacher({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const { teacherAuthenticated } = useAppState();

  useEffect(() => {
    if (!teacherAuthenticated) {
      navigate('/teacher-login');
    }
  }, [navigate, teacherAuthenticated]);

  if (!teacherAuthenticated) {
    return <div style={{ minHeight: '100vh', background: '#F0F4F8' }} />;
  }

  return children;
}
