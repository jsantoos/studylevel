interface Props {
    currentQuestion: number;
  
    totalQuestions: number;
  
    timer: string;
  }
  
  export function MockExamHeader({
    currentQuestion,
    totalQuestions,
    timer,
  }: Props) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Simulado
          </h1>
  
          <p className="mt-2 text-gray-500">
            Questão {currentQuestion} de{" "}
            {totalQuestions}
          </p>
        </div>
  
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
          <div className="text-sm text-gray-500">
            Tempo
          </div>
  
          <div className="mt-1 text-2xl font-bold">
            ⏱️ {timer}
          </div>
        </div>
      </div>
    );
  }