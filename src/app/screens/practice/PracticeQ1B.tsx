import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ1B() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="Which note sits on Line 1?"
      notePosition="line1"
      noteColor="#4A90D9"
      options={['E', 'G', 'B', 'F']}
      correctAnswer="E"
      hint="Remember: count lines from the very bottom!"
      mascotMessage="That's right! E is on Line 1! 🎉"
      progressPercent={12.5}
      answered={true}
      onNextClick={() => navigate('/practice/q2')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
