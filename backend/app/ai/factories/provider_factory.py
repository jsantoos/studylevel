from app.core.config import settings

from app.ai.providers.base import (
    AIProvider,
)

from app.ai.providers.openrouter_provider import (
    OpenRouterProvider,
)

from app.ai.providers.ollama_provider import (
    OllamaProvider,
)


def get_provider() -> AIProvider:
    """
    Return configured AI provider.
    """

    provider = (
        settings.AI_PROVIDER
        .lower()
        .strip()
    )

    if provider == "openrouter":
        return OpenRouterProvider()

    if provider == "ollama":
        return OllamaProvider()

    raise ValueError(
        f"Unsupported AI provider: "
        f"{provider}"
    )
