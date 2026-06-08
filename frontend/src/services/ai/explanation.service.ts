import api from "@/services/api/api";

export interface GenerateExplanationPayload {
  questionId: string;
  selectedOptionId: string;
  forceAI?: boolean;
}

export interface ExplanationResponse {
    explanation: string;
    source: "database" | "ai";
}

export async function generateExplanation(
  payload: GenerateExplanationPayload,
): Promise<ExplanationResponse> {

  const { data } =
    await api.post(
      "/ai/explanation",
      {
        question_id:
          payload.questionId,

        selected_option_id:
          payload.selectedOptionId,

        force_ai:
          payload.forceAI ?? false,
      },
    );

  return data;
}