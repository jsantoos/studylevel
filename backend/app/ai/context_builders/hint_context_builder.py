"""
Hint Context Builder.

Transforms question data into a structured
context used by AI services.
"""


class HintContextBuilder:
    """
    Builds AI hint context.
    """

    @staticmethod
    def build(
        question: str,
        alternatives: list[str],
        difficulty: str,
        subject: str,
    ) -> dict:
        """
        Build structured context.

        Parameters
        ----------
        question : str
            Question statement.

        alternatives : list[str]
            Available alternatives.

        difficulty : str
            Difficulty level.

        subject : str
            Subject area.

        Returns
        -------
        dict
            Structured AI context.
        """

        return {
            "question": question,
            "alternatives": alternatives,
            "difficulty": difficulty,
            "subject": subject,
        }
