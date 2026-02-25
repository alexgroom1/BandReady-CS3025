import { Lightbulb, Check } from "lucide-react";

interface PracticeQuestionProps {
  question: string;
  notePosition: 'line1' | 'line2' | 'line3' | 'line4' | 'line5' | 'space1' | 'space2' | 'space3' | 'space4';
  noteColor: string;
  options: [string, string, string, string];
  correctAnswer: string;
  hint: string;
  mascotMessage: string;
  progressPercent: number;
  answered: boolean;
  onAnswerClick?: () => void;
  onNextClick?: () => void;
  onDoneClick?: () => void;
}

const NOTE_POSITIONS = {
  line1: 60,
  line2: 80,
  line3: 100,
  line4: 120,
  line5: 140,
  space1: 70,
  space2: 90,
  space3: 110,
  space4: 130,
};

export function PracticeQuestion({
  question,
  notePosition,
  noteColor,
  options,
  correctAnswer,
  hint,
  mascotMessage,
  progressPercent,
  answered,
  onAnswerClick,
  onNextClick,
  onDoneClick
}: PracticeQuestionProps) {
  const noteY = NOTE_POSITIONS[notePosition];

  return (
    <div className="w-[1024px] h-[768px] relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-5">
        {/* Practice Mode badge */}
        <div style={{
          background: '#E8F8F0',
          color: '#52C98A',
          fontFamily: 'Nunito',
          fontWeight: 600,
          fontSize: '14px',
          height: '36px',
          padding: '0 16px',
          borderRadius: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          ↺ Practice Mode
        </div>

        {/* Center text */}
        <div style={{
          fontFamily: 'Nunito',
          fontWeight: 400,
          fontSize: '16px',
          color: '#6B7A8D'
        }}>
          Take your time — no points, just practice!
        </div>

        {/* Done button */}
        <button
          onClick={onDoneClick}
          style={{
            width: '96px',
            height: '44px',
            background: '#4A90D9',
            color: 'white',
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '16px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Done
        </button>
      </div>

      {/* Question area */}
      <div className="text-center mb-4">
        <h1 style={{
          fontFamily: 'Nunito',
          fontWeight: 700,
          fontSize: '32px',
          color: '#3D4A5C',
          marginBottom: '8px'
        }}>
          {question}
        </h1>
        <div style={{
          fontFamily: 'Nunito',
          fontWeight: 400,
          fontSize: '14px',
          color: '#B0BEC5'
        }}>
          Attempt 1 of unlimited
        </div>
      </div>

      {/* Content card with staff */}
      <div className="flex justify-center mb-5">
        <div style={{
          width: '440px',
          height: '200px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          padding: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="380" height="140" viewBox="0 0 380 140">
            {/* Music staff */}
            <line x1="10" y1="40" x2="370" y2="40" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="10" y1="60" x2="370" y2="60" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="10" y1="80" x2="370" y2="80" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="10" y1="100" x2="370" y2="100" stroke="#3D4A5C" strokeWidth="1.5" />
            <line x1="10" y1="120" x2="370" y2="120" stroke="#3D4A5C" strokeWidth="1.5" />

            {/* Treble clef */}
            <text x="20" y="105" fontSize="50" fill="#3D4A5C" fontFamily="serif">𝄞</text>

            {/* Note */}
            <circle cx="200" cy={noteY} r="14" fill={noteColor} />
          </svg>
        </div>
      </div>

      {/* Answer buttons grid */}
      <div className="flex justify-center mb-5">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '416px' }}>
          {options.map((option, index) => {
            const isCorrect = option === correctAnswer;
            const showCorrect = answered && isCorrect;

            return (
              <button
                key={index}
                onClick={!answered ? onAnswerClick : undefined}
                style={{
                  width: '200px',
                  height: '90px',
                  background: showCorrect ? '#E8F8F0' : '#FFFFFF',
                  border: showCorrect ? '2px solid #52C98A' : '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  fontFamily: 'Nunito',
                  fontWeight: 700,
                  fontSize: '28px',
                  color: showCorrect ? '#52C98A' : '#3D4A5C',
                  cursor: answered ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  position: 'relative'
                }}
              >
                {option}
                {showCorrect && (
                  <div style={{
                    position: 'absolute',
                    right: '16px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#52C98A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check size={16} color="white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint box */}
      <div className="flex justify-center mb-6">
        <div style={{
          width: '416px',
          minHeight: '56px',
          background: '#EBF4FF',
          borderLeft: '4px solid #4A90D9',
          borderRadius: '0 12px 12px 0',
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          gap: '8px'
        }}>
          <Lightbulb size={20} color="#4A90D9" fill="#4A90D9" />
          <span style={{
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: '16px',
            color: '#4A90D9'
          }}>
            {hint}
          </span>
        </div>
      </div>

      {/* Mascot with speech bubble */}
      <div style={{ position: 'absolute', bottom: answered ? '100px' : '80px', right: '80px' }}>
        {/* Speech bubble */}
        <div style={{
          position: 'absolute',
          bottom: '130px',
          right: '10px',
          background: answered ? '#52C98A' : '#4A90D9',
          color: 'white',
          fontFamily: 'Nunito',
          fontWeight: 600,
          fontSize: '14px',
          padding: '8px 16px',
          borderRadius: '12px',
          whiteSpace: 'nowrap',
          maxWidth: '200px'
        }}>
          {mascotMessage}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            right: '20px',
            width: '0',
            height: '0',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: `8px solid ${answered ? '#52C98A' : '#4A90D9'}`
          }} />
        </div>

        {/* Mascot */}
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="75" r="26" fill="#3D4A5C" />
          <rect x="82" y="22" width="9" height="54" rx="4.5" fill="#3D4A5C" />
          <circle cx="86.5" cy="22" r="15" fill="#3D4A5C" />
          <circle cx="52" cy="71" r="3" fill="white" />
          <circle cx="68" cy="71" r="3" fill="white" />
          <path d="M 49 79 Q 60 86 71 79" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="90" r="9" fill="white" />
          <circle cx="82" cy="90" r="9" fill="white" />
          <ellipse cx="52" cy="105" rx="7.5" ry="4.5" fill="#E8524A" />
          <ellipse cx="68" cy="105" rx="7.5" ry="4.5" fill="#E8524A" />
        </svg>
      </div>

      {/* Next button (only when answered) */}
      {answered && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <button
            onClick={onNextClick}
            style={{
              width: '200px',
              height: '60px',
              background: '#F5A623',
              color: 'white',
              fontFamily: 'Nunito',
              fontWeight: 700,
              fontSize: '20px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(245, 166, 35, 0.4)'
            }}
          >
            Next →
          </button>
        </div>
      )}

      {/* Progress bar (only when not answered) */}
      {!answered && (
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '8px',
          background: '#E2E8F0'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: '#4A90D9'
          }} />
        </div>
      )}
    </div>
  );
}
