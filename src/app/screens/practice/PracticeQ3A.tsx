import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ3A() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="Which note is on Line 3?"
      notePosition="line3"
      noteColor="#F5A623"
      options={['G', 'D', 'B', 'F']}
      correctAnswer="B"
      hint="Line 3 is the middle line of the staff."
      mascotMessage="You've got this!"
      progressPercent={37.5}
      answered={false}
      onAnswerClick={() => navigate('/practice/q3/answered')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
