import { Volume2 } from "lucide-react";

interface AssessmentQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  notePosition: 'line1' | 'line2' | 'line3' | 'line4' | 'line5' | 'space1' | 'space2' | 'space3' | 'space4';
  noteColor: string;
  options: [string, string, string, string];
  onAnswer: () => void;
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

export function AssessmentQuestion({
  questionNumber,
  totalQuestions,
  question,
  notePosition,
  noteColor,
  options,
  onAnswer
}: AssessmentQuestionProps) {
  const noteY = NOTE_POSITIONS[notePosition];
  const completedSegments = questionNumber - 1;

  return (
    <div className="w-[1024px] h-[768px] relative" style={{ background: '#F0F4F8', padding: '40px 48px' }}>
      {/* Top label */}
      <div className="text-center mb-3">
        <div style={{
          fontFamily: 'Nunito',
          fontWeight: 600,
          fontSize: '14px',
          color: '#6B7A8D',
          letterSpacing: '1.5px'
        }}>
          QUESTION {questionNumber} OF {totalQuestions}
        </div>
      </div>

      {/* Segmented progress bar */}
      <div className="flex gap-1 mb-7" style={{ height: '12px' }}>
        {Array.from({ length: totalQuestions }).map((_, index) => {
          let color = '#E2E8F0'; // upcoming
          if (index < completedSegments) {
            color = '#52C98A'; // completed
          } else if (index === completedSegments) {
            color = '#4A90D9'; // current
          }
          return (
            <div key={index} style={{ flex: 1, background: color, borderRadius: '6px' }} />
          );
        })}
      </div>

      {/* Question */}
      <h1 className="text-center mb-4" style={{
        fontFamily: 'Nunito',
        fontWeight: 700,
        fontSize: '32px',
        color: '#3D4A5C'
      }}>
        {question}
      </h1>

      {/* Content row */}
      <div className="flex justify-center gap-6 mb-5">
        {/* Staff card */}
        <div style={{
          width: '440px',
          height: '220px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}>
          {/* Cream background panel for clef */}
          <div style={{
            width: '140px',
            height: '100%',
            background: '#FDF6E3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="80" height="120" viewBox="0 0 80 120">
              <text x="10" y="75" fontSize="70" fill="#3D4A5C" fontFamily="serif">𝄞</text>
            </svg>
          </div>

          {/* White area with staff */}
          <div style={{ flex: 1, padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="260" height="160" viewBox="0 0 260 160">
              {/* Music staff */}
              <line x1="10" y1="60" x2="250" y2="60" stroke="#3D4A5C" strokeWidth="1.5" />
              <line x1="10" y1="80" x2="250" y2="80" stroke="#3D4A5C" strokeWidth="1.5" />
              <line x1="10" y1="100" x2="250" y2="100" stroke="#3D4A5C" strokeWidth="1.5" />
              <line x1="10" y1="120" x2="250" y2="120" stroke="#3D4A5C" strokeWidth="1.5" />
              <line x1="10" y1="140" x2="250" y2="140" stroke="#3D4A5C" strokeWidth="1.5" />

              {/* Note */}
              <circle cx="130" cy={noteY} r="16" fill={noteColor} />
            </svg>
          </div>
        </div>

        {/* Play Note button */}
        <button style={{
          width: '100px',
          height: '100px',
          background: '#4A90D9',
          borderRadius: '20px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(74, 144, 217, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          alignSelf: 'center'
        }}>
          <Volume2 size={40} color="white" />
          <span style={{
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '16px',
            color: 'white'
          }}>
            Play Note
          </span>
        </button>
      </div>

      {/* Answer grid */}
      <div className="flex justify-center mt-8">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '456px' }}>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={onAnswer}
              style={{
                width: '220px',
                height: '100px',
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '16px',
                fontFamily: 'Nunito',
                fontWeight: 700,
                fontSize: '28px',
                color: '#3D4A5C',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
