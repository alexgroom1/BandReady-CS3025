import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ6A() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="What note is in Space 3?"
      notePosition="space3"
      noteColor="#4A90D9"
      options={['E', 'A', 'D', 'C']}
      correctAnswer="C"
      hint="FACE — Space 3 is the 3rd letter, C!"
      mascotMessage="You've got this!"
      progressPercent={75}
      answered={false}
      onAnswerClick={() => navigate('/practice/q6/answered')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
