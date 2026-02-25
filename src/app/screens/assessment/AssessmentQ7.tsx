import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ7() {
  const navigate = useNavigate();

  return (
    <AssessmentQuestion
      questionNumber={7}
      totalQuestions={8}
      question="What note is on Line 3?"
      notePosition="line3"
      noteColor="#52C98A"
      options={['F', 'B', 'D', 'A']}
      onAnswer={() => navigate('/assessment/q8')}
    />
  );
}
