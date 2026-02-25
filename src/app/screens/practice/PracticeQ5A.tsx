import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ5A() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="Which note is on Line 4?"
      notePosition="line4"
      noteColor="#9B59B6"
      options={['B', 'D', 'F', 'E']}
      correctAnswer="D"
      hint="Every Good Boy Deserves Fudge — D is the 4th word!"
      mascotMessage="You've got this!"
      progressPercent={62.5}
      answered={false}
      onAnswerClick={() => navigate('/practice/q5/answered')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
