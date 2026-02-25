import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ2B() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="What note is in Space 2?"
      notePosition="space2"
      noteColor="#52C98A"
      options={['F', 'A', 'C', 'E']}
      correctAnswer="A"
      hint="Spaces spell FACE from bottom to top."
      mascotMessage="Nice! Space 2 = A ✓"
      progressPercent={25}
      answered={true}
      onNextClick={() => navigate('/practice/q3')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
