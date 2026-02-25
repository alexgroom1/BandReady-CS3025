import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ1() {
  const navigate = useNavigate();

  return (
    <AssessmentQuestion
      questionNumber={1}
      totalQuestions={8}
      question="What note is on Line 2?"
      notePosition="line2"
      noteColor="#4A90D9"
      options={['A', 'G', 'E', 'D']}
      onAnswer={() => navigate('/assessment/q2')}
    />
  );
}
