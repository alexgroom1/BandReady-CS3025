import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ5B() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="Which note is on Line 4?"
      notePosition="line4"
      noteColor="#9B59B6"
      options={['B', 'D', 'F', 'E']}
      correctAnswer="D"
      hint="Every Good Boy Deserves Fudge — D is the 4th word!"
      mascotMessage="D is on Line 4! Keep it up! ✓"
      progressPercent={62.5}
      answered={true}
      onNextClick={() => navigate('/practice/q6')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
