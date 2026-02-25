import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ4A() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="What note is in Space 1?"
      notePosition="space1"
      noteColor="#E8524A"
      options={['A', 'E', 'G', 'F']}
      correctAnswer="F"
      hint="Space 1 is the very first space — F starts FACE!"
      mascotMessage="You've got this!"
      progressPercent={50}
      answered={false}
      onAnswerClick={() => navigate('/practice/q4/answered')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
