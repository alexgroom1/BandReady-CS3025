import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ8() {
  const navigate = useNavigate();

  return (
    <AssessmentQuestion
      questionNumber={8}
      totalQuestions={8}
      question="Which note is in Space 4?"
      notePosition="space4"
      noteColor="#E8524A"
      options={['B', 'G', 'D', 'E']}
      onAnswer={() => navigate('/results-pass')}
    />
  );
}
