import { useState } from "react";
import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ3() {
  const navigate = useNavigate();
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <AssessmentQuestion
      questionNumber={3}
      totalQuestions={8}
      question="What note is on Line 4?"
      notePosition="line4"
      noteColor="#E8524A"
      options={['G', 'B', 'F', 'D']}
      correctAnswer="D"
      answered={answered}
      selectedAnswer={selectedAnswer}
      onAnswer={(answer) => { setSelectedAnswer(answer); setAnswered(true); }}
      onNext={() => navigate('/assessment/q4')}
    />
  );
}
