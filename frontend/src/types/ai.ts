export interface AIHintRequest {
    question: string;
    alternatives: string[];
    difficulty: string;
    subject: string;
}
  
export interface AIHintResponse {
    hint: string;
}