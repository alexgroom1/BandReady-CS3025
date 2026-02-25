import { useNavigate } from "react-router";
import { PracticeQuestion } from "../../components/PracticeQuestion";

export function PracticeQ7B() {
  const navigate = useNavigate();

  return (
    <PracticeQuestion
      question="Which note is on Line 5?"
      notePosition="line5"
      noteColor="#52C98A"
      options={['D', 'E', 'F', 'G']}
      correctAnswer="F"
      hint="Line 5 is the very top — Fudge! The last word in the mnemonic."
      mascotMessage="F is on Line 5! Almost there! ✓"
      progressPercent={87.5}
      answered={true}
      onNextClick={() => navigate('/practice/q8')}
      onDoneClick={() => navigate('/assessment/q1')}
    />
  );
}
