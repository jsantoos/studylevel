# app/schemas/sidebar.py

from pydantic import BaseModel


class SidebarStatsResponse(
    BaseModel,
):
    streak_days: int
    today_xp: int
