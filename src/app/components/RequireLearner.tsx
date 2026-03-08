import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../state/AppState';

export function RequireLearner({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const { selectedLearner } = useAppState();

  useEffect(() => {
    if (!selectedLearner) {
      navigate('/profile-select');
    }
  }, [navigate, selectedLearner]);

  if (!selectedLearner) {
    return <div style={{ minHeight: '100vh', background: '#F0F4F8' }} />;
  }

  return children;
}
