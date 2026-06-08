"""
Sidebar routes.
"""

from datetime import date

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy import func

from app.core.database import (
    get_db,
)

from app.dependencies.auth import (
    get_current_user,
)

from app.models.user_answer import (
    UserAnswer,
)

from app.schemas.sidebar import (
    SidebarStatsResponse,
)

from app.services.progression_service import (
    ProgressionService,
)

router = APIRouter(
    prefix="/users/me/sidebar",
    tags=["Sidebar"],
)


@router.get(
    "",
    response_model=SidebarStatsResponse,
)
def get_sidebar_stats(
    current_user=Depends(
        get_current_user,
    ),
    db=Depends(
        get_db,
    ),
):
    """
    Retrieve sidebar statistics.
    """

    service = ProgressionService(
        db,
    )

    progress = (
        service.get_or_create_progress(
            current_user.id,
        )
    )

    today = date.today()

    answers = (
        db.query(
            UserAnswer,
        )
        .filter(
            UserAnswer.user_id
            == current_user.id,
            func.date(
                UserAnswer.created_at,
            )
            == today,
        )
        .all()
    )

    today_xp = 0

    for answer in answers:

        if answer.is_correct:

            today_xp += (
                ProgressionService.QUESTION_CORRECT_XP
            )

        else:

            today_xp += (
                ProgressionService.QUESTION_WRONG_XP
            )

    return SidebarStatsResponse(
        streak_days=(
            progress.streak_days
        ),
        today_xp=today_xp,
    )
