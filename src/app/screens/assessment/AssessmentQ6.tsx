import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ6() {
  const navigate = useNavigate();

  return (
    <AssessmentQuestion
      questionNumber={6}
      totalQuestions={8}
      question="Which note is in Space 2?"
      notePosition="space2"
      noteColor="#4A90D9"
      options={['C', 'E', 'A', 'D']}
      onAnswer={() => navigate('/assessment/q7')}
    />
  );
}
