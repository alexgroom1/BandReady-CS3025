import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ4B() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="What note is in Space 1?"
      notePosition="space1"
      noteColor="#E8524A"
      options={['A', 'E', 'G', 'F']}
      correctAnswer="F"
      hint="Space 1 is the very first space — F starts FACE!"
      mascotMessage="F is the first space! ✓"
      progressPercent={50}
      answered={true}
      onNextClick={() => navigate('/practice/q5')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
