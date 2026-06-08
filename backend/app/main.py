"""
Application entrypoint.
"""

from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.core.config import settings
from app.api.routes.questions import (
    router as questions_router,
)
from app.api.imports import router as imports_router
from app.api.mock_exams import (
    router as mock_exams_router,
)
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.mock_exam import (
    router as mock_exam_router,
)
from app.api.routes import (
    user_progress,
)
from app.api.routes.daily_missions import (
    router as daily_missions_router,
)
from app.api.routes.user_preferences import (
    router as user_preferences_router,
)
from app.api.routes.ai import (
    router as ai_router,
)
from app.core.logging import (
    configure_logging,
)
from app.api.routes.ai_metrics import (
    router as ai_metrics_router,
)
from app.api.routes.ranking import (
    router as ranking_router,
)
from app.api.routes.analytics import (
    router as analytics_router,
)
from app.api.routes.sidebar import (
    router as sidebar_router,
)


configure_logging()
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    # allow_origins=[
    #    "http://localhost:3000",
    # ],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(questions_router)
app.include_router(imports_router)
app.include_router(mock_exams_router)
app.include_router(
    mock_exam_router,
)
app.include_router(
    user_progress.router,
)
app.include_router(
    daily_missions_router,
)
app.include_router(
    user_preferences_router,
)
app.include_router(
    ai_router,
)
app.include_router(
    ai_metrics_router,
)
app.include_router(
    ranking_router,
)
app.include_router(
    analytics_router,
)
app.include_router(
    sidebar_router,
)


@app.get("/")
def healthcheck():
    """
    Application healthcheck endpoint.
    """

    return {"status": "ok"}