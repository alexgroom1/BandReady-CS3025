import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ8B() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="What note is in Space 4?"
      notePosition="space4"
      noteColor="#F5A623"
      options={['C', 'F', 'E', 'D']}
      correctAnswer="E"
      hint="Space 4 is the last space — E finishes FACE!"
      mascotMessage="E is in Space 4! You're ready! 🌟 ✓"
      progressPercent={100}
      answered={true}
      onNextClick={() => navigate('/assessment/q1')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
