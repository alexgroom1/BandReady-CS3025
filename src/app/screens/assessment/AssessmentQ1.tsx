import { useState } from "react";
import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ1() {
  const navigate = useNavigate();
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <AssessmentQuestion
      questionNumber={1}
      totalQuestions={8}
      question="What note is on Line 2?"
      notePosition="line2"
      noteColor="#4A90D9"
      options={['A', 'G', 'E', 'D']}
      correctAnswer="G"
      answered={answered}
      selectedAnswer={selectedAnswer}
      onAnswer={(answer) => { setSelectedAnswer(answer); setAnswered(true); }}
      onNext={() => navigate('/assessment/q2')}
    />
  );
}
