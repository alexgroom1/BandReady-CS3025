import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ3B() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="Which note is on Line 3?"
      notePosition="line3"
      noteColor="#F5A623"
      options={['G', 'D', 'B', 'F']}
      correctAnswer="B"
      hint="Line 3 is the middle line of the staff."
      mascotMessage="B is in the middle! Great job! ✓"
      progressPercent={37.5}
      answered={true}
      onNextClick={() => navigate('/practice/q4')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
