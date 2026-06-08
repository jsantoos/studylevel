from pydantic import BaseModel


class HintRequest(BaseModel):
    question: str
    alternatives: list[str]
    difficulty: str
    subject: str


class HintResponse(BaseModel):
    hint: str
