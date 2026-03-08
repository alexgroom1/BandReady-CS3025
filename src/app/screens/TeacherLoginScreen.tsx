import { ChevronLeft, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../state/AppState';

export function TeacherLoginScreen() {
  const navigate = useNavigate();
  const { authenticateTeacher, clearTeacherAuth } = useAppState();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      <button
        onClick={() => {
          clearTeacherAuth();
          navigate('/');
        }}
        style={{
          width: '48px',
          height: '48px',
          border: 'none',
          background: 'transparent',
          color: '#4A90D9',
          cursor: 'pointer',
        }}
      >
        <ChevronLeft size={32} />
      </button>

      <div className="mx-auto mt-16 flex max-w-[540px] flex-col items-center rounded-[28px] bg-white px-10 py-12 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#EBF4FF]">
          <LockKeyhole size={36} color="#4A90D9" />
        </div>
        <h1 style={{ fontWeight: 900, fontSize: '40px', color: '#3D4A5C' }}>Teacher Access</h1>
        <p className="mt-3 max-w-[420px]" style={{ fontSize: '18px', color: '#6B7A8D' }}>
          Enter the facilitator PIN to open the teacher dashboard. This area is not shown in the student experience.
        </p>

        <input
          value={pin}
          onChange={(event) => {
            setPin(event.target.value);
            setError('');
          }}
          inputMode="numeric"
          maxLength={4}
          placeholder="Enter PIN"
          style={{
            width: '220px',
            height: '64px',
            marginTop: '26px',
            borderRadius: '18px',
            border: '2px solid #D7E2ED',
            textAlign: 'center',
            fontWeight: 800,
            fontSize: '28px',
            color: '#3D4A5C',
          }}
        />
        {error ? (
          <div style={{ marginTop: '12px', fontSize: '15px', color: '#E8524A', fontWeight: 700 }}>{error}</div>
        ) : null}

        <button
          onClick={() => {
            if (authenticateTeacher(pin)) {
              navigate('/teacher');
              return;
            }
            setError('Incorrect PIN. Ask the facilitator for access.');
          }}
          style={{
            width: '240px',
            height: '72px',
            marginTop: '26px',
            borderRadius: '36px',
            border: 'none',
            background: '#4A90D9',
            color: 'white',
            fontWeight: 800,
            fontSize: '22px',
            cursor: 'pointer',
          }}
        >
          Unlock Dashboard
        </button>
      </div>
    </div>
  );
}
