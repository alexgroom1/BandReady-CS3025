import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ3() {
  const navigate = useNavigate();

  return (
    <AssessmentQuestion
      questionNumber={3}
      totalQuestions={8}
      question="What note is on Line 4?"
      notePosition="line4"
      noteColor="#E8524A"
      options={['G', 'B', 'F', 'D']}
      onAnswer={() => navigate('/assessment/q4')}
    />
  );
}
