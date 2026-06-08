"""
ENEM-style questions seed extension.
Can be appended to the QUESTIONS list.

Seed script for importing Pós IA questions.

Responsibilities
----------------
- Remove previous questions
- Insert new questions
- Insert question options
- Maintain relational integrity

Usage
-----
docker compose exec backend \
bash -c "PYTHONPATH=/app python scripts/seed_questions.py"
"""

from __future__ import annotations

import uuid

from sqlalchemy import delete
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.models.question import Question
from app.models.question_option import QuestionOption
from app.models.mock_exam_question import (
    MockExamQuestion,
)
from app.models.user_answer import (
    UserAnswer,
)


ENEM_QUESTIONS = [
    {
        "statement": "A expansão do agronegócio brasileiro tem contribuído para o aumento das exportações. Entretanto, em algumas regiões, esse processo também está associado a conflitos relacionados ao uso da terra. Esse cenário evidencia a disputa entre:",
        "explanation": "A expansão de atividades econômicas pode gerar conflitos entre diferentes formas de uso e ocupação do território.",
        "correct": "B",
        "difficulty": 2,
        "subject": "TESTE",
        "topic": "Questão Agrária",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            "Industrialização e urbanização.",
            "Interesses econômicos e acesso à terra.",
            "Globalização e tecnologia.",
            "Migração e turismo.",
            "Comércio e transporte."
        ]
    },
    {
        "statement": "A Revolução Industrial promoveu profundas transformações econômicas e sociais. Entre seus efeitos, destaca-se:",
        "explanation": "A Revolução Industrial consolidou a produção fabril e intensificou a urbanização.",
        "correct": "D",
        "difficulty": 1,
        "subject": "TESTE",
        "topic": "Revolução Industrial",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            "Redução do comércio.",
            "Fim do trabalho assalariado.",
            "Retorno ao feudalismo.",
            "Crescimento das cidades industriais.",
            "Desaparecimento das máquinas."
        ]
    },
    {
        "statement": "Em uma pesquisa, a média de idade de 10 participantes é 30 anos. Se a soma das idades é mantida e mais um participante entra no grupo, a média necessariamente:",
        "explanation": "Sem conhecer a idade do novo participante, não é possível determinar o comportamento da média.",
        "correct": "E",
        "difficulty": 3,
        "subject": "TESTE",
        "topic": "Estatística",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            "Aumenta.",
            "Diminui.",
            "Permanece igual.",
            "Dobra.",
            "Depende da idade do novo participante."
        ]
    },
    {
        "statement": "A variação linguística observada em diferentes regiões do Brasil demonstra que:",
        "explanation": "A língua apresenta variedades legítimas relacionadas a fatores sociais e regionais.",
        "correct": "A",
        "difficulty": 1,
        "subject": "TESTE",
        "topic": "Variação Linguística",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            "Existem diferentes usos legítimos da língua.",
            "Há apenas uma forma correta de falar.",
            "Regionalismos devem ser eliminados.",
            "A língua não muda com o tempo.",
            "A escrita substitui a fala."
        ]
    },
    {
        "statement": "O aumento da concentração de dióxido de carbono na atmosfera está associado principalmente a:",
        "explanation": "A queima de combustíveis fósseis é uma das principais fontes de emissão de CO₂.",
        "correct": "C",
        "difficulty": 1,
        "subject": "TESTE",
        "topic": "Mudanças Climáticas",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            "Fotossíntese.",
            "Evaporação.",
            "Queima de combustíveis fósseis.",
            "Formação de nuvens.",
            "Erosão."
        ]
    },
    {
        "statement": "A Constituição Federal de 1988 ficou conhecida como Constituição Cidadã porque:",
        "explanation": "Ela ampliou direitos civis, sociais e políticos da população brasileira.",
        "correct": "B",
        "difficulty": 2,
        "subject": "TESTE",
        "topic": "Redemocratização",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            "Reduziu direitos políticos.",
            "Ampliou direitos e garantias fundamentais.",
            "Instituiu a monarquia.",
            "Eliminou eleições.",
            "Criou o voto censitário."
        ]
    },
    {
        "statement": "Um mapa utiliza escala 1:100.000. Isso significa que 1 cm no mapa corresponde a:",
        "explanation": "Na escala 1:100.000, 1 cm representa 100.000 cm, ou 1 km.",
        "correct": "D",
        "difficulty": 2,
        "subject": "TESTE",
        "topic": "Cartografia",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            "10 m",
            "100 m",
            "500 m",
            "1 km",
            "10 km"
        ]
    },
    {
        "statement": "Em uma progressão aritmética de razão 5, cada termo é obtido por:",
        "explanation": "Em uma PA, soma-se a razão ao termo anterior.",
        "correct": "A",
        "difficulty": 2,
        "subject": "TESTE",
        "topic": "Progressões",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            "Adicionar 5 ao termo anterior.",
            "Multiplicar por 5.",
            "Dividir por 5.",
            "Elevar ao quadrado.",
            "Subtrair 10."
        ]
    },
    {
        "statement": "A vacinação em massa contribui para a saúde pública porque:",
        "explanation": "A imunização coletiva reduz a circulação de agentes infecciosos.",
        "correct": "C",
        "difficulty": 1,
        "subject": "TESTE",
        "topic": "Imunologia",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            "Elimina todas as doenças.",
            "Substitui tratamentos médicos.",
            "Reduz a transmissão de doenças.",
            "Dispensa saneamento.",
            "Impede mutações."
        ]
    },
    {
        "statement": "Em textos argumentativos, a função dos argumentos é:",
        "explanation": "Os argumentos sustentam e defendem a tese apresentada.",
        "correct": "B",
        "difficulty": 1,
        "subject": "TESTE",
        "topic": "Interpretação Textual",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            "Apresentar personagens.",
            "Sustentar a tese defendida.",
            "Criar suspense.",
            "Descrever cenários.",
            "Organizar referências."
        ]
    }
]

LETTER_MAP = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
    "E": 4,
}


def truncate_questions(
    db: Session,
) -> None:
    """
    Remove all related entities.
    """

    db.execute(
        delete(UserAnswer),
    )

    db.execute(
        delete(MockExamQuestion),
    )

    db.execute(
        delete(QuestionOption),
    )

    db.execute(
        delete(Question),
    )

    db.commit()


def create_questions(
    db: Session,
) -> None:
    """
    Insert questions and options.
    """

    for item in ENEM_QUESTIONS:

        question = Question(
            id=uuid.uuid4(),
            statement=item["statement"],
            explanation=(
                item["explanation"]
            ),
            difficulty=item["difficulty"],
            subject="Enem 2026",
            topic=item["topic"],
            bank="ENEM",
            year=2026,
        )

        db.add(question)

        db.flush()

        correct_index = LETTER_MAP[
            item["correct"]
        ]

        for index, option_text in enumerate(
            item["options"],
            start=0,
        ):

            option = QuestionOption(
                id=uuid.uuid4(),
                question_id=question.id,
                option_text=option_text,
                is_correct=(
                    index == correct_index
                ),
                option_order=index + 1,
            )

            db.add(option)

    db.commit()


def main() -> None:
    """
    Execute seed process.
    """

    db = SessionLocal()

    try:

        print(
            "Removing old questions...",
        )

        truncate_questions(db)

        print(
            "Creating new questions...",
        )

        create_questions(db)

        print(
            "Seed completed successfully.",
        )

    finally:

        db.close()


if __name__ == "__main__":

    main()