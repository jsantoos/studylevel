"""
Analytics routes.
"""

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy import case
from sqlalchemy import func

from app.core.database import (
    get_db,
)

from app.dependencies.auth import (
    get_current_user,
)

from app.models.question import (
    Question,
)

from app.models.user_answer import (
    UserAnswer,
)

from app.schemas.analytics import (
    AnalyticsOverviewResponse,
    ProgressAnalyticsResponse,
    SubjectAnalyticsResponse,
)

from app.services.progression_service import (
    ProgressionService,
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get(
    "/overview",
    response_model=AnalyticsOverviewResponse,
)
def get_overview(
    current_user=Depends(
        get_current_user,
    ),
    db=Depends(
        get_db,
    ),
):
    """
    Retrieve analytics overview.
    """

    service = ProgressionService(
        db,
    )

    progress = (
        service.get_or_create_progress(
            current_user.id,
        )
    )

    accuracy = 0

    if progress.total_questions > 0:

        accuracy = round(
            (
                progress.correct_questions
                / progress.total_questions
            )
            * 100,
            2,
        )

    average_response_time = (
        db.query(
            func.avg(
                UserAnswer.response_time,
            ),
        )
        .filter(
            UserAnswer.user_id
            == current_user.id,
        )
        .scalar()
    )

    return {
        "xp": progress.xp,
        "level": progress.level,
        "accuracy": accuracy,
        "total_questions": (
            progress.total_questions
        ),
        "correct_questions": (
            progress.correct_questions
        ),
        "streak_days": (
            progress.streak_days
        ),
        "average_response_time": int(
            average_response_time or 0,
        ),
    }


@router.get(
    "/subjects",
    response_model=list[
        SubjectAnalyticsResponse
    ],
)
def get_subjects(
    current_user=Depends(
        get_current_user,
    ),
    db=Depends(
        get_db,
    ),
):
    """
    Retrieve performance grouped by subject.
    """

    rows = (
        db.query(
            Question.subject,

            func.count(
                UserAnswer.id,
            ).label(
                "total",
            ),

            func.sum(
                case(
                    (
                        UserAnswer.is_correct,
                        1,
                    ),
                    else_=0,
                ),
            ).label(
                "correct",
            ),
        )
        .join(
            Question,
            Question.id
            == UserAnswer.question_id,
        )
        .filter(
            UserAnswer.user_id
            == current_user.id,
        )
        .group_by(
            Question.subject,
        )
        .order_by(
            Question.subject,
        )
        .all()
    )

    result = []

    for row in rows:

        accuracy = 0

        if row.total > 0:

            accuracy = round(
                (
                    row.correct
                    / row.total
                )
                * 100,
                2,
            )

        result.append(
            {
                "subject":
                    row.subject,

                "accuracy":
                    accuracy,

                "total_questions":
                    row.total,
            }
        )

    return result


@router.get(
    "/progress",
    response_model=list[
        ProgressAnalyticsResponse
    ],
)
def get_progress(
    current_user=Depends(
        get_current_user,
    ),
    db=Depends(
        get_db,
    ),
):
    """
    Retrieve daily progress evolution.
    """

    rows = (
        db.query(
            func.date(
                UserAnswer.created_at,
            ).label(
                "date",
            ),

            func.count(
                UserAnswer.id,
            ).label(
                "total",
            ),

            func.sum(
                case(
                    (
                        UserAnswer.is_correct,
                        1,
                    ),
                    else_=0,
                ),
            ).label(
                "correct",
            ),
        )
        .filter(
            UserAnswer.user_id
            == current_user.id,
        )
        .group_by(
            func.date(
                UserAnswer.created_at,
            ),
        )
        .order_by(
            func.date(
                UserAnswer.created_at,
            ),
        )
        .all()
    )

    result = []

    for row in rows:

        accuracy = 0

        if row.total > 0:

            accuracy = round(
                (
                    row.correct
                    / row.total
                )
                * 100,
                2,
            )

        result.append(
            {
                "date":
                    str(
                        row.date,
                    ),

                "accuracy":
                    accuracy,

                "total_questions":
                    row.total,
            }
        )

    return result
