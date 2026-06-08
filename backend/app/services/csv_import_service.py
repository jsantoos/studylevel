"""
CSV import service.
"""

from sqlalchemy.orm import Session

from app.schemas.question import (
    QuestionCreate,
    QuestionOptionCreate,
)
from app.services.question_service import (
    QuestionService,
)
from app.utils.csv_parser import parse_csv


class CSVImportService:
    """
    CSV question import service.
    """

    def __init__(
        self,
        db: Session,
    ):
        self.question_service = QuestionService(db)

    def import_questions(
        self,
        content: bytes,
    ) -> dict:
        """
        Import questions from CSV.
        """

        rows = parse_csv(content)

        imported = 0
        failed = 0

        for row in rows:
            try:
                payload = QuestionCreate(
                    statement=row["statement"],
                    explanation=row.get("explanation"),
                    difficulty=int(
                        row.get("difficulty", 1)
                    ),
                    subject=row["subject"],
                    topic=row["topic"],
                    bank=row.get("bank"),
                    year=int(row["year"])
                    if row.get("year")
                    else None,
                    options=[
                        QuestionOptionCreate(
                            option_text=row["option_a"],
                            is_correct=(
                                row["correct_option"]
                                == "A"
                            ),
                            option_order=1,
                        ),
                        QuestionOptionCreate(
                            option_text=row["option_b"],
                            is_correct=(
                                row["correct_option"]
                                == "B"
                            ),
                            option_order=2,
                        ),
                        QuestionOptionCreate(
                            option_text=row["option_c"],
                            is_correct=(
                                row["correct_option"]
                                == "C"
                            ),
                            option_order=3,
                        ),
                        QuestionOptionCreate(
                            option_text=row["option_d"],
                            is_correct=(
                                row["correct_option"]
                                == "D"
                            ),
                            option_order=4,
                        ),
                    ],
                )

                self.question_service.create(
                    payload,
                )

                imported += 1

            except Exception:
                failed += 1

        return {
            "imported": imported,
            "failed": failed,
        }
