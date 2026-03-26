import { useState } from "react";
import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ2() {
  const navigate = useNavigate();
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <AssessmentQuestion
      questionNumber={2}
      totalQuestions={8}
      question="Which note is in Space 1?"
      notePosition="space1"
      noteColor="#52C98A"
      options={['F', 'A', 'C', 'E']}
      correctAnswer="F"
      answered={answered}
      selectedAnswer={selectedAnswer}
      onAnswer={(answer) => { setSelectedAnswer(answer); setAnswered(true); }}
      onNext={() => navigate('/assessment/q3')}
    />
  );
}
