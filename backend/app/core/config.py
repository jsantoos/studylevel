"""
Application configuration module.
"""

from pydantic_settings import BaseSettings
from pydantic import ConfigDict


class Settings(BaseSettings):
    """
    Centralized application settings.
    """

    APP_NAME: str = "Study Platform API"
    APP_VERSION: str = "1.0.0"

    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # AI
    AI_PROVIDER: str = "openrouter"
    OPENROUTER_API_KEY: str = ""
    OPENROUTER_MODEL: str = (
        # "openai/gpt-oss-120b:free"
        "qwen3-30b-a3b:free"
    )

    OLLAMA_MODEL: str = "qwen3:8b"

    AI_TIMEOUT_SECONDS: int = 60
    AI_MAX_HINT_LENGTH: int = 320
    AI_MIN_HINT_LENGTH: int = 20
    AI_MAX_RETRIES: int = 3

    AI_MAX_HINTS_PER_MINUTE: int = 8
    AI_MAX_HINTS_PER_DAY: int = 128

    @property
    def database_url(self) -> str:
        """
        Build database connection URL.
        """

        return (
            f"postgresql://"
            f"{self.POSTGRES_USER}:"
            f"{self.POSTGRES_PASSWORD}@"
            f"{self.POSTGRES_HOST}:"
            f"{self.POSTGRES_PORT}/"
            f"{self.POSTGRES_DB}"
        )

    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


settings = Settings()