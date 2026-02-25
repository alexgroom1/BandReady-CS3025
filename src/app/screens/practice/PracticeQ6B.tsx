import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ6B() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="What note is in Space 3?"
      notePosition="space3"
      noteColor="#4A90D9"
      options={['E', 'A', 'D', 'C']}
      correctAnswer="C"
      hint="FACE — Space 3 is the 3rd letter, C!"
      mascotMessage="C is in Space 3! 🎵 ✓"
      progressPercent={75}
      answered={true}
      onNextClick={() => navigate('/practice/q7')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
