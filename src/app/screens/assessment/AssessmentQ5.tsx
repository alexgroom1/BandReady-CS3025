import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ5() {
  const navigate = useNavigate();

  return (
    <AssessmentQuestion
      questionNumber={5}
      totalQuestions={8}
      question="What note is on Line 1?"
      notePosition="line1"
      noteColor="#F5A623"
      options={['G', 'F', 'B', 'E']}
      onAnswer={() => navigate('/assessment/q6')}
    />
  );
}
