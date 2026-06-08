import {
    useMutation,
  } from "@tanstack/react-query";
  
import {
generateHint,
} from "@/services/ai/hint.service";

interface GenerateHintPayload {
question: string;
alternatives: string[];
difficulty: string;
subject: string;
}

export function useGenerateHint() {

    return useMutation({
        mutationFn: (
        payload: GenerateHintPayload,
        ) =>
        generateHint(
            payload,
        ),
    });
}