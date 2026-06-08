import api from "@/services/api/api";

interface GenerateHintPayload {
  question: string;
  alternatives: string[];
  difficulty: string;
  subject: string;
}

export async function generateHint(
  payload: GenerateHintPayload,
) {
  const response =
    await api.post(
      "/ai/hint",
      payload,
    );

  return response.data;
}