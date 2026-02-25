import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ8A() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="What note is in Space 4?"
      notePosition="space4"
      noteColor="#F5A623"
      options={['C', 'F', 'E', 'D']}
      correctAnswer="E"
      hint="Space 4 is the last space — E finishes FACE!"
      mascotMessage="You've got this!"
      progressPercent={100}
      answered={false}
      onAnswerClick={() => navigate('/practice/q8/answered')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
