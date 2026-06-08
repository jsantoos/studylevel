"""
Explanation context builder.
"""


class ExplanationContextBuilder:
    """
    Builds explanation context.
    """

    @staticmethod
    def build(
        question: str,
        selected_answer: str,
        correct_answer: str,
        subject: str,
        difficulty: str,
    ) -> dict:

        return {
            "question": question,
            "selected_answer": selected_answer,
            "correct_answer": correct_answer,
            "subject": subject,
            "difficulty": difficulty,
        }
