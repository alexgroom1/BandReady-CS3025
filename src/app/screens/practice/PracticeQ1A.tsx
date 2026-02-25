import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ1A() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="Which note sits on Line 1?"
      notePosition="line1"
      noteColor="#4A90D9"
      options={['E', 'G', 'B', 'F']}
      correctAnswer="E"
      hint="Remember: count lines from the very bottom!"
      mascotMessage="You've got this!"
      progressPercent={12.5}
      answered={false}
      onAnswerClick={() => navigate('/practice/q1/answered')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
