import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ2A() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="What note is in Space 2?"
      notePosition="space2"
      noteColor="#52C98A"
      options={['F', 'A', 'C', 'E']}
      correctAnswer="A"
      hint="Spaces spell FACE from bottom to top."
      mascotMessage="You've got this!"
      progressPercent={25}
      answered={false}
      onAnswerClick={() => navigate('/practice/q2/answered')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
