import { useState } from "react";
import { useNavigate } from "react-router";
import { AssessmentQuestion } from "../../components/AssessmentQuestion";

export function AssessmentQ7() {
  const navigate = useNavigate();
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <AssessmentQuestion
      questionNumber={7}
      totalQuestions={8}
      question="What note is on Line 3?"
      notePosition="line3"
      noteColor="#52C98A"
      options={['F', 'B', 'D', 'A']}
      correctAnswer="B"
      answered={answered}
      selectedAnswer={selectedAnswer}
      onAnswer={(answer) => { setSelectedAnswer(answer); setAnswered(true); }}
      onNext={() => navigate('/assessment/q8')}
    />
  );
}
