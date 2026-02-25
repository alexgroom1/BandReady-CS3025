import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ4() {
  const navigate = useNavigate();

  return (
    <AssessmentQuestion
      questionNumber={4}
      totalQuestions={8}
      question="Which note is in Space 3?"
      notePosition="space3"
      noteColor="#9B59B6"
      options={['D', 'E', 'C', 'G']}
      onAnswer={() => navigate('/assessment/q5')}
    />
  );
}
