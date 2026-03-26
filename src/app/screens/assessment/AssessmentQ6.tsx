import { useState } from "react";
import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ6() {
  const navigate = useNavigate();
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <AssessmentQuestion
      questionNumber={6}
      totalQuestions={8}
      question="Which note is in Space 2?"
      notePosition="space2"
      noteColor="#4A90D9"
      options={['C', 'E', 'A', 'D']}
      correctAnswer="A"
      answered={answered}
      selectedAnswer={selectedAnswer}
      onAnswer={(answer) => { setSelectedAnswer(answer); setAnswered(true); }}
      onNext={() => navigate('/assessment/q7')}
    />
  );
}
