import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ2() {
  const navigate = useNavigate();

  return (
    <AssessmentQuestion
      questionNumber={2}
      totalQuestions={8}
      question="Which note is in Space 1?"
      notePosition="space1"
      noteColor="#52C98A"
      options={['F', 'A', 'C', 'E']}
      onAnswer={() => navigate('/assessment/q3')}
    />
  );
}
