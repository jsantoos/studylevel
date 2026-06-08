"""
Seed script for importing 100 ENEM-style questions.

Important
---------
These are original questions inspired by ENEM competencies.
They are not verbatim copies of official ENEM questions.

Responsibilities
----------------
- Remove only previous ENEM questions
- Insert 100 ENEM-style questions
- Insert 5 options per question
- Preserve relational integrity

Usage
-----
docker compose exec backend \
bash -c "PYTHONPATH=/app python scripts/seed_enem_questions.py"
"""

from __future__ import annotations

import uuid

from sqlalchemy import delete
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.models.mock_exam_question import (
    MockExamQuestion,
)
from app.models.question import Question
from app.models.question_option import QuestionOption
from app.models.user_answer import (
    UserAnswer,
)


LETTER_MAP = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
    "E": 4,
}


ENEM_QUESTIONS = [
    {
        "statement": (
            'Uma loja anunciou desconto de 25% em um produto de R$ 200. O valor pago pelo consumidor será:'
        ),
        "explanation": (
            'O desconto de 25% sobre 200 é 50. Portanto, o preço final é 150 reais.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Matemática",
        "topic": "Porcentagem",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'R$ 125',
            'R$ 150',
            'R$ 175',
            'R$ 180',
            'R$ 225',
        ],
    },

    {
        "statement": (
            'Em uma turma, as notas foram 6, 7, 7, 8 e 10. A mediana dessas notas é:'
        ),
        "explanation": (
            'Ordenando os dados, o valor central é 7.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Matemática",
        "topic": "Estatística",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            '6',
            '7',
            '7,5',
            '8',
            '10',
        ],
    },

    {
        "statement": (
            'Em um mapa de escala 1:50.000, a distância de 4 cm representa na realidade:'
        ),
        "explanation": (
            '4 cm no mapa representam 200.000 cm, ou seja, 2 km.'
        ),
        "correct": "D",
        "difficulty": 2,
        "subject": "Matemática",
        "topic": "Escala",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            '200 m',
            '500 m',
            '1 km',
            '2 km',
            '20 km',
        ],
    },

    {
        "statement": (
            'Uma corrida de aplicativo cobra R$ 6 fixos mais R$ 2 por quilômetro. Para 8 km, o valor da corrida é:'
        ),
        "explanation": (
            'O valor é 6 + 2 vezes 8, totalizando 22 reais.'
        ),
        "correct": "D",
        "difficulty": 2,
        "subject": "Matemática",
        "topic": "Função Afim",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'R$ 14',
            'R$ 16',
            'R$ 20',
            'R$ 22',
            'R$ 28',
        ],
    },

    {
        "statement": (
            'Uma urna possui 3 bolas azuis e 2 vermelhas. Ao retirar uma bola ao acaso, a probabilidade de ela ser vermelha é:'
        ),
        "explanation": (
            'Há 2 bolas vermelhas em um total de 5 bolas.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Matemática",
        "topic": "Probabilidade",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            '1/5',
            '2/5',
            '3/5',
            '1/2',
            '2/3',
        ],
    },

    {
        "statement": (
            'Uma sequência apresenta os termos 4, 9, 14 e 19. A razão dessa progressão aritmética é:'
        ),
        "explanation": (
            'A diferença entre termos consecutivos é 5.'
        ),
        "correct": "C",
        "difficulty": 2,
        "subject": "Matemática",
        "topic": "Progressões",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            '3',
            '4',
            '5',
            '9',
            '14',
        ],
    },

    {
        "statement": (
            'Um terreno retangular mede 12 m por 8 m. Sua área é:'
        ),
        "explanation": (
            'A área do retângulo é base vezes altura: 12 vezes 8 = 96.'
        ),
        "correct": "D",
        "difficulty": 1,
        "subject": "Matemática",
        "topic": "Geometria Plana",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            '20 m²',
            '40 m²',
            '80 m²',
            '96 m²',
            '120 m²',
        ],
    },

    {
        "statement": (
            'Uma aplicação cresce segundo uma taxa fixa mensal. Esse tipo de crescimento é melhor representado por uma função:'
        ),
        "explanation": (
            'Juros compostos geram crescimento proporcional ao valor acumulado, caracterizando comportamento exponencial.'
        ),
        "correct": "D",
        "difficulty": 3,
        "subject": "Matemática",
        "topic": "Juros Compostos",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Linear',
            'Constante',
            'Quadrática',
            'Exponencial',
            'Afim',
        ],
    },

    {
        "statement": (
            'Se 4 kg de alimento custam R$ 28, então 1 kg custa:'
        ),
        "explanation": (
            'Basta dividir 28 por 4, obtendo 7 reais por quilograma.'
        ),
        "correct": "D",
        "difficulty": 1,
        "subject": "Matemática",
        "topic": "Razão e Proporção",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'R$ 4',
            'R$ 5',
            'R$ 6',
            'R$ 7',
            'R$ 8',
        ],
    },

    {
        "statement": (
            'Uma caixa em forma de paralelepípedo mede 2 m, 3 m e 4 m. Seu volume é:'
        ),
        "explanation": (
            'O volume é o produto das três dimensões: 2 vezes 3 vezes 4 = 24.'
        ),
        "correct": "D",
        "difficulty": 2,
        "subject": "Matemática",
        "topic": "Volume",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            '9 m³',
            '12 m³',
            '18 m³',
            '24 m³',
            '48 m³',
        ],
    },

    {
        "statement": (
            'O uso de expressões regionais como aipim, macaxeira e mandioca evidencia:'
        ),
        "explanation": (
            'Essas palavras mostram diferentes usos regionais legítimos da língua.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Linguagens",
        "topic": "Variação Linguística",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Erro gramatical',
            'Variação regional da língua',
            'Linguagem técnica',
            'Estrangeirismo',
            'Norma padrão única',
        ],
    },

    {
        "statement": (
            'Em um texto argumentativo, os argumentos têm a função de:'
        ),
        "explanation": (
            'Argumentos servem para defender e sustentar uma tese.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Linguagens",
        "topic": "Interpretação Textual",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Narrar fatos fictícios',
            'Sustentar a tese',
            'Apresentar personagens',
            'Criar rimas',
            'Descrever paisagens',
        ],
    },

    {
        "statement": (
            'Quando uma campanha publicitária busca convencer o leitor a adotar uma atitude, predomina a função:'
        ),
        "explanation": (
            'A função conativa busca influenciar o comportamento do interlocutor.'
        ),
        "correct": "C",
        "difficulty": 2,
        "subject": "Linguagens",
        "topic": "Funções da Linguagem",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Poética',
            'Metalinguística',
            'Conativa',
            'Fática',
            'Referencial',
        ],
    },

    {
        "statement": (
            'Uma notícia jornalística tem como objetivo principal:'
        ),
        "explanation": (
            'A notícia informa fatos de interesse público.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Linguagens",
        "topic": "Gêneros Textuais",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Defender tese acadêmica',
            'Informar sobre um acontecimento',
            'Produzir ficção',
            'Ensinar receita',
            'Criar poema',
        ],
    },

    {
        "statement": (
            "A frase 'o tempo voa' utiliza uma figura de linguagem conhecida como:"
        ),
        "explanation": (
            'A expressão atribui ao tempo uma ação figurada, caracterizando metáfora.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Linguagens",
        "topic": "Figuras de Linguagem",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Hipérbole',
            'Metáfora',
            'Antítese',
            'Eufemismo',
            'Pleonasmo',
        ],
    },

    {
        "statement": (
            'O uso adequado de pronomes, conjunções e retomadas contribui para a:'
        ),
        "explanation": (
            'Esses recursos conectam partes do texto e garantem coesão.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Linguagens",
        "topic": "Coesão Textual",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Ambiguidade',
            'Coesão textual',
            'Oralidade obrigatória',
            'Descontinuidade',
            'Ironia',
        ],
    },

    {
        "statement": (
            'O Modernismo brasileiro valorizou, entre outros aspectos:'
        ),
        "explanation": (
            'O Modernismo buscou renovar a linguagem artística e valorizar temas nacionais.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Linguagens",
        "topic": "Literatura",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'A imitação clássica rígida',
            'A renovação estética e temas nacionais',
            'O fim da oralidade',
            'A exclusão da cultura popular',
            'A rejeição da identidade brasileira',
        ],
    },

    {
        "statement": (
            'Uma charge que exagera características de personagens públicos normalmente busca:'
        ),
        "explanation": (
            'Charges utilizam humor e exagero para realizar crítica social ou política.'
        ),
        "correct": "B",
        "difficulty": 3,
        "subject": "Linguagens",
        "topic": "Leitura Crítica",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Eliminar humor',
            'Produzir crítica social ou política',
            'Apenas informar dados neutros',
            'Criar texto jurídico',
            'Impedir interpretação',
        ],
    },

    {
        "statement": (
            'A norma padrão da língua portuguesa é geralmente associada a contextos:'
        ),
        "explanation": (
            'A norma padrão é mais exigida em situações formais de comunicação.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Linguagens",
        "topic": "Norma Padrão",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Exclusivamente familiares',
            'Formais',
            'Regionais informais',
            'Gírias juvenis',
            'Conversas espontâneas',
        ],
    },

    {
        "statement": (
            'Um infográfico combina texto, imagens e dados para:'
        ),
        "explanation": (
            'Infográficos organizam diferentes linguagens para facilitar a compreensão.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Linguagens",
        "topic": "Texto Multimodal",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Ocultar dados',
            'Facilitar a compreensão de informações',
            'Eliminar interpretação',
            'Substituir todos os textos',
            'Criar apenas humor',
        ],
    },

    {
        "statement": (
            'O crescimento acelerado das cidades brasileiras no século XX esteve relacionado principalmente à:'
        ),
        "explanation": (
            'A industrialização atraiu trabalhadores para áreas urbanas.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Geografia",
        "topic": "Urbanização",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Volta ao campo',
            'Industrialização e migração campo-cidade',
            'Redução dos transportes',
            'Fim da indústria',
            'Descentralização total',
        ],
    },

    {
        "statement": (
            'Conflitos no campo envolvendo grandes propriedades e comunidades tradicionais revelam disputas por:'
        ),
        "explanation": (
            'Esses conflitos envolvem uso da terra, recursos e modos de vida.'
        ),
        "correct": "B",
        "difficulty": 3,
        "subject": "Geografia",
        "topic": "Questão Agrária",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Turismo',
            'Terra e recursos naturais',
            'Clima urbano',
            'Transporte aéreo',
            'Comércio digital',
        ],
    },

    {
        "statement": (
            'As curvas de nível em um mapa servem para representar:'
        ),
        "explanation": (
            'Curvas de nível indicam variações de altitude no terreno.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Geografia",
        "topic": "Cartografia",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Temperatura',
            'Altitude do relevo',
            'População absoluta',
            'Vegetação apenas',
            'Fronteiras políticas',
        ],
    },

    {
        "statement": (
            'A formação de ilhas de calor nas cidades está relacionada principalmente a:'
        ),
        "explanation": (
            'Asfalto, concreto e pouca vegetação elevam a retenção de calor.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Geografia",
        "topic": "Climatologia",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Aumento de florestas',
            'Impermeabilização do solo e pouca vegetação',
            'Redução de construções',
            'Diminuição de veículos',
            'Apenas chuvas fortes',
        ],
    },

    {
        "statement": (
            'A globalização econômica caracteriza-se pela:'
        ),
        "explanation": (
            'A globalização intensifica fluxos econômicos, financeiros e informacionais.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Geografia",
        "topic": "Globalização",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Isolamento das economias',
            'Integração de mercados e fluxos internacionais',
            'Fim da tecnologia',
            'Redução total do comércio',
            'Extinção das empresas',
        ],
    },

    {
        "statement": (
            'A transição demográfica ocorre quando uma população passa por mudanças nas taxas de:'
        ),
        "explanation": (
            'A transição demográfica envolve alterações em natalidade e mortalidade.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Geografia",
        "topic": "Demografia",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Latitude e longitude',
            'Natalidade e mortalidade',
            'Importação e exportação',
            'Vegetação e relevo',
            'Clima e solo',
        ],
    },

    {
        "statement": (
            'A Amazônia é reconhecida por apresentar:'
        ),
        "explanation": (
            'A Amazônia abriga grande diversidade de espécies e ecossistemas.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Geografia",
        "topic": "Biomas",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Baixa umidade',
            'Grande biodiversidade',
            'Clima polar',
            'Ausência de rios',
            'Vegetação desértica',
        ],
    },

    {
        "statement": (
            'O assoreamento de rios ocorre quando há:'
        ),
        "explanation": (
            'O assoreamento resulta do depósito de sedimentos no leito dos rios.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Geografia",
        "topic": "Hidrografia",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Aumento da profundidade',
            'Acúmulo de sedimentos no leito',
            'Redução de margens',
            'Formação de geleiras',
            'Desaparecimento da bacia',
        ],
    },

    {
        "statement": (
            'Uma vantagem das fontes renováveis de energia é:'
        ),
        "explanation": (
            'Fontes renováveis reduzem a dependência de combustíveis fósseis.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Geografia",
        "topic": "Energia",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Esgotamento rápido',
            'Menor dependência de combustíveis fósseis',
            'Maior emissão obrigatória',
            'Uso exclusivo de carvão',
            'Fim da eletricidade',
        ],
    },

    {
        "statement": (
            'A disputa por recursos naturais em áreas estratégicas pode gerar:'
        ),
        "explanation": (
            'Recursos estratégicos podem intensificar disputas entre Estados e grupos.'
        ),
        "correct": "B",
        "difficulty": 3,
        "subject": "Geografia",
        "topic": "Geopolítica",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Fim das fronteiras',
            'Tensões geopolíticas',
            'Ausência de comércio',
            'Neutralidade obrigatória',
            'Isolamento cultural',
        ],
    },

    {
        "statement": (
            'A economia açucareira colonial brasileira esteve baseada em latifúndio, monocultura e:'
        ),
        "explanation": (
            'A produção açucareira colonial utilizou amplamente o trabalho escravizado.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "História",
        "topic": "Brasil Colonial",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Trabalho assalariado urbano',
            'Trabalho escravizado',
            'Cooperativas industriais',
            'Pequena propriedade familiar',
            'Sindicatos operários',
        ],
    },

    {
        "statement": (
            'A Independência do Brasil manteve várias estruturas sociais do período colonial, como:'
        ),
        "explanation": (
            'A independência política não rompeu imediatamente com a escravidão nem com a concentração de terras.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "História",
        "topic": "Independência do Brasil",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'A reforma agrária ampla',
            'A concentração fundiária e a escravidão',
            'A industrialização total',
            'O voto universal',
            'A igualdade racial imediata',
        ],
    },

    {
        "statement": (
            'A Lei Áurea aboliu juridicamente a escravidão no Brasil, mas não garantiu:'
        ),
        "explanation": (
            'A abolição não foi acompanhada de políticas efetivas de inclusão social.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "História",
        "topic": "Abolição",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Fim do Império imediatamente',
            'Inserção social plena dos libertos',
            'Colonização portuguesa',
            'Retorno ao feudalismo',
            'Fim da agricultura',
        ],
    },

    {
        "statement": (
            'A política do café com leite foi marcada pela predominância política de elites ligadas a:'
        ),
        "explanation": (
            'O termo refere-se à influência das elites paulistas e mineiras.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "História",
        "topic": "República Velha",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Amazonas e Pará',
            'São Paulo e Minas Gerais',
            'Bahia e Pernambuco',
            'Rio Grande do Sul e Santa Catarina',
            'Ceará e Maranhão',
        ],
    },

    {
        "statement": (
            'A Era Vargas é associada à ampliação da legislação:'
        ),
        "explanation": (
            'O período consolidou direitos trabalhistas e o papel do Estado na economia.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "História",
        "topic": "Era Vargas",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Feudal',
            'Trabalhista',
            'Monárquica',
            'Colonial',
            'Eclesiástica',
        ],
    },

    {
        "statement": (
            'Durante a ditadura militar brasileira, houve restrição de direitos políticos e:'
        ),
        "explanation": (
            'O regime restringiu liberdades, censurou meios de comunicação e perseguiu opositores.'
        ),
        "correct": "B",
        "difficulty": 3,
        "subject": "História",
        "topic": "Ditadura Militar",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Ampliação irrestrita de liberdades',
            'Censura à imprensa e perseguição a opositores',
            'Fim do autoritarismo',
            'Voto direto para presidente em todo o período',
            'Ausência de repressão',
        ],
    },

    {
        "statement": (
            'A Constituição de 1988 ficou conhecida como Constituição Cidadã por:'
        ),
        "explanation": (
            'A Constituição de 1988 ampliou garantias e direitos fundamentais.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "História",
        "topic": "Redemocratização",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Reduzir direitos sociais',
            'Ampliar direitos civis, sociais e políticos',
            'Extinguir eleições',
            'Restaurar a monarquia',
            'Criar o voto censitário',
        ],
    },

    {
        "statement": (
            'A Revolução Industrial alterou as relações de trabalho ao expandir:'
        ),
        "explanation": (
            'A industrialização consolidou o trabalho nas fábricas.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "História",
        "topic": "Revolução Industrial",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'O artesanato doméstico exclusivo',
            'O trabalho fabril',
            'O feudalismo',
            'A servidão medieval',
            'A economia de caça',
        ],
    },

    {
        "statement": (
            'A Guerra Fria foi caracterizada pela rivalidade entre:'
        ),
        "explanation": (
            'O período foi marcado pela disputa política, militar e ideológica entre EUA e URSS.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "História",
        "topic": "Guerra Fria",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Portugal e Espanha',
            'Estados Unidos e União Soviética',
            'Brasil e Argentina',
            'França e Itália',
            'China e Japão apenas',
        ],
    },

    {
        "statement": (
            'Movimentos sociais historicamente contribuem para:'
        ),
        "explanation": (
            'Movimentos sociais mobilizam grupos em torno de demandas por direitos e mudanças.'
        ),
        "correct": "B",
        "difficulty": 3,
        "subject": "História",
        "topic": "Movimentos Sociais",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Eliminar participação popular',
            'A reivindicação de direitos e transformação social',
            'Impedir mudanças',
            'Reduzir cidadania',
            'Acabar com debates públicos',
        ],
    },

    {
        "statement": (
            'A relação entre abelhas e plantas durante a polinização é um exemplo de:'
        ),
        "explanation": (
            'Ambas as espécies se beneficiam: a planta é polinizada e a abelha obtém alimento.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Ciências da Natureza",
        "topic": "Ecologia",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Predatismo',
            'Mutualismo',
            'Parasitismo',
            'Comensalismo obrigatório',
            'Competição',
        ],
    },

    {
        "statement": (
            'A intensificação do efeito estufa está relacionada principalmente ao aumento de:'
        ),
        "explanation": (
            'CO₂ e metano são gases associados à intensificação do efeito estufa.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Ciências da Natureza",
        "topic": "Mudanças Climáticas",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Oxigênio puro',
            'Gases como CO₂ e CH₄',
            'Hélio',
            'Neônio',
            'Vapor metálico',
        ],
    },

    {
        "statement": (
            'A chuva ácida está associada à emissão atmosférica de óxidos de:'
        ),
        "explanation": (
            'Óxidos de enxofre e nitrogênio reagem na atmosfera e formam ácidos.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Ciências da Natureza",
        "topic": "Química Ambiental",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Sódio e cálcio',
            'Enxofre e nitrogênio',
            'Hélio e argônio',
            'Ouro e prata',
            'Cloro e potássio apenas',
        ],
    },

    {
        "statement": (
            'As vacinas atuam principalmente estimulando:'
        ),
        "explanation": (
            'Vacinas estimulam o sistema imune a reconhecer agentes infecciosos.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Ciências da Natureza",
        "topic": "Imunologia",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'A digestão',
            'A resposta imunológica do organismo',
            'A respiração celular apenas',
            'O crescimento ósseo',
            'A produção de glicose',
        ],
    },

    {
        "statement": (
            'O DNA é uma molécula responsável por:'
        ),
        "explanation": (
            'O DNA contém instruções genéticas dos seres vivos.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Ciências da Natureza",
        "topic": "Genética",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Produzir luz',
            'Armazenar informações genéticas',
            'Eliminar proteínas',
            'Formar lipídios apenas',
            'Regular temperatura',
        ],
    },

    {
        "statement": (
            'Um carro percorre 120 km em 2 horas. Sua velocidade média é:'
        ),
        "explanation": (
            'Velocidade média é distância dividida pelo tempo: 120/2 = 60 km/h.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Ciências da Natureza",
        "topic": "Cinemática",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            '30 km/h',
            '60 km/h',
            '80 km/h',
            '100 km/h',
            '120 km/h',
        ],
    },

    {
        "statement": (
            'Segundo a Lei de Ohm, a relação entre tensão, resistência e corrente é:'
        ),
        "explanation": (
            'A Lei de Ohm estabelece que a tensão é o produto da resistência pela corrente.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Ciências da Natureza",
        "topic": "Eletricidade",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'V = R · I',
            'R = V · I',
            'I = V · R',
            'P = m · g',
            'E = m · c',
        ],
    },

    {
        "statement": (
            'A transferência de calor por contato direto é chamada de:'
        ),
        "explanation": (
            'Condução ocorre por contato direto entre corpos ou partículas.'
        ),
        "correct": "C",
        "difficulty": 2,
        "subject": "Ciências da Natureza",
        "topic": "Termologia",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Convecção',
            'Radiação',
            'Condução',
            'Fusão',
            'Sublimação',
        ],
    },

    {
        "statement": (
            'Em uma reação química balanceada, a conservação da massa ocorre porque:'
        ),
        "explanation": (
            'O balanceamento conserva a quantidade de átomos de cada elemento.'
        ),
        "correct": "C",
        "difficulty": 3,
        "subject": "Ciências da Natureza",
        "topic": "Reações Químicas",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'A cor não muda',
            'A temperatura zera',
            'O número de átomos se mantém',
            'O volume sempre dobra',
            'A pressão desaparece',
        ],
    },

    {
        "statement": (
            'A organela responsável pela respiração celular é:'
        ),
        "explanation": (
            'A mitocôndria participa da produção de energia por respiração celular.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Ciências da Natureza",
        "topic": "Citologia",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Ribossomo',
            'Mitocôndria',
            'Lisossomo',
            'Complexo golgiense',
            'Cloroplasto em animais',
        ],
    },

    {
        "statement": (
            'Na redação do ENEM, demonstrar domínio da norma-padrão significa:'
        ),
        "explanation": (
            'A competência 1 avalia o domínio da modalidade escrita formal da língua portuguesa.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Redação",
        "topic": "Competência 1",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Usar apenas gírias',
            'Usar a língua escrita formal com clareza',
            'Escrever sem pontuação',
            'Ignorar concordância',
            'Copiar o texto motivador',
        ],
    },

    {
        "statement": (
            'Compreender a proposta de redação exige:'
        ),
        "explanation": (
            'A competência 2 avalia compreensão do tema e repertório sociocultural pertinente.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Redação",
        "topic": "Competência 2",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Fugir do tema',
            'Relacionar o tema a repertórios e argumentos pertinentes',
            'Escrever em forma de poema',
            'Ignorar os textos motivadores',
            'Usar apenas opinião pessoal',
        ],
    },

    {
        "statement": (
            'Selecionar e organizar argumentos de forma coerente está relacionado à competência:'
        ),
        "explanation": (
            'A competência 3 avalia seleção, organização e interpretação de informações e argumentos.'
        ),
        "correct": "C",
        "difficulty": 2,
        "subject": "Redação",
        "topic": "Competência 3",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            '1',
            '2',
            '3',
            '4',
            '5',
        ],
    },

    {
        "statement": (
            'O uso de conectivos como portanto, além disso e contudo contribui para:'
        ),
        "explanation": (
            'Conectivos articulam ideias e contribuem para a coesão.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Redação",
        "topic": "Competência 4",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Fuga temática',
            'Coesão textual',
            'Cópia integral',
            'Redução da argumentação',
            'Ausência de progressão',
        ],
    },

    {
        "statement": (
            'Uma proposta de intervenção completa deve apresentar:'
        ),
        "explanation": (
            'A proposta de intervenção exige elementos que indiquem quem fará, o que será feito, como e com qual objetivo.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Redação",
        "topic": "Competência 5",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Apenas opinião',
            'Agente, ação, meio, finalidade e detalhamento',
            'Somente estatísticas',
            'Apenas conclusão',
            'Tema sem solução',
        ],
    },

    {
        "statement": (
            'A tese em uma redação dissertativo-argumentativa corresponde:'
        ),
        "explanation": (
            'A tese apresenta a posição que será defendida ao longo do texto.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Redação",
        "topic": "Tese",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Ao título',
            'Ao ponto de vista defendido',
            'À citação final',
            'À proposta apenas',
            'Ao repertório',
        ],
    },

    {
        "statement": (
            'Um repertório é produtivo quando:'
        ),
        "explanation": (
            'O repertório deve ser pertinente e articulado à argumentação.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Redação",
        "topic": "Repertório Sociocultural",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'É citado sem explicação',
            'Relaciona-se claramente ao argumento',
            'Substitui a tese',
            'É usado como enfeite',
            'Não tem ligação com o tema',
        ],
    },

    {
        "statement": (
            'Na redação do ENEM, a conclusão deve:'
        ),
        "explanation": (
            'A conclusão retoma a discussão e apresenta proposta de intervenção.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Redação",
        "topic": "Conclusão",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Criar novo tema',
            'Retomar a discussão e apresentar intervenção',
            'Ignorar a tese',
            'Copiar a introdução',
            'Apresentar apenas pergunta',
        ],
    },

    {
        "statement": (
            'Um texto coerente é aquele que:'
        ),
        "explanation": (
            'Coerência envolve sentido global e progressão lógica das ideias.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Redação",
        "topic": "Coerência",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Contradiz a tese sempre',
            'Apresenta ideias compatíveis e progressão lógica',
            'Não usa argumentos',
            'Mistura temas sem relação',
            'Elimina parágrafos',
        ],
    },

    {
        "statement": (
            'A introdução da redação deve preferencialmente:'
        ),
        "explanation": (
            'A introdução contextualiza o tema e apresenta a tese.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Redação",
        "topic": "Introdução",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Resolver o problema inteiro',
            'Apresentar o tema e a tese',
            'Trazer apenas dados soltos',
            'Encerrar o texto',
            'Ignorar o recorte temático',
        ],
    },

    {
        "statement": (
            'A reflexão ética busca analisar:'
        ),
        "explanation": (
            'A ética investiga valores e princípios que orientam a conduta humana.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Filosofia",
        "topic": "Ética",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'A composição química',
            'Os princípios que orientam as ações humanas',
            'A rotação terrestre',
            'A regra de três',
            'A estrutura celular',
        ],
    },

    {
        "statement": (
            'O exercício da cidadania envolve:'
        ),
        "explanation": (
            'Cidadania envolve participação social e reconhecimento de direitos e deveres.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Filosofia",
        "topic": "Cidadania",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Apenas consumo',
            'Direitos, deveres e participação social',
            'Isolamento político',
            'Ausência de leis',
            'Negação de direitos',
        ],
    },

    {
        "statement": (
            'Em uma democracia, a participação popular é importante porque:'
        ),
        "explanation": (
            'A participação fortalece a legitimidade das decisões políticas.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Filosofia",
        "topic": "Democracia",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Impede eleições',
            'Legitima decisões coletivas',
            'Elimina debates',
            'Centraliza poder absoluto',
            'Dispensa instituições',
        ],
    },

    {
        "statement": (
            'Para a filosofia, questionar crenças e justificativas está ligado ao problema do:'
        ),
        "explanation": (
            'A teoria do conhecimento investiga crenças, justificações e verdade.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Filosofia",
        "topic": "Conhecimento",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Relevo',
            'Conhecimento',
            'Clima',
            'Metabolismo',
            'Consumo elétrico',
        ],
    },

    {
        "statement": (
            'O debate filosófico sobre liberdade envolve a relação entre escolha individual e:'
        ),
        "explanation": (
            'A liberdade é frequentemente discutida junto à responsabilidade pelas escolhas.'
        ),
        "correct": "B",
        "difficulty": 3,
        "subject": "Filosofia",
        "topic": "Liberdade",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Fotossíntese',
            'Responsabilidade',
            'Escala cartográfica',
            'Massa molecular',
            'Tabela periódica',
        ],
    },

    {
        "statement": (
            'A cultura pode ser entendida como:'
        ),
        "explanation": (
            'Cultura envolve práticas, valores, símbolos e significados compartilhados.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Sociologia",
        "topic": "Cultura",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Apenas arte erudita',
            'Conjunto de práticas, valores e significados sociais',
            'Fenômeno exclusivamente biológico',
            'Ausência de regras',
            'Produto individual isolado',
        ],
    },

    {
        "statement": (
            'A desigualdade social manifesta-se quando há:'
        ),
        "explanation": (
            'Desigualdade envolve diferenças no acesso a renda, direitos e oportunidades.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Sociologia",
        "topic": "Desigualdade Social",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Igualdade plena',
            'Distribuição desigual de recursos e oportunidades',
            'Ausência de grupos sociais',
            'Fim da economia',
            'Eliminação da renda',
        ],
    },

    {
        "statement": (
            'A precarização do trabalho está associada a:'
        ),
        "explanation": (
            'A precarização envolve vínculos instáveis, informalidade e perda de garantias.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Sociologia",
        "topic": "Trabalho",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Ampliação universal de direitos',
            'Instabilidade e redução de direitos',
            'Fim da informalidade',
            'Garantia permanente de emprego',
            'Ausência de exploração',
        ],
    },

    {
        "statement": (
            'As redes sociais influenciam a vida pública porque:'
        ),
        "explanation": (
            'As redes influenciam debates, opiniões e formas de mobilização social.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Sociologia",
        "topic": "Mídia e Sociedade",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Impedem comunicação',
            'Moldam circulação de informações e opiniões',
            'Eliminam debates',
            'Substituem todas as instituições',
            'Acabam com conflitos',
        ],
    },

    {
        "statement": (
            'A atuação de movimentos sociais revela:'
        ),
        "explanation": (
            'Movimentos sociais expressam demandas por direitos, reconhecimento e justiça.'
        ),
        "correct": "B",
        "difficulty": 3,
        "subject": "Sociologia",
        "topic": "Movimentos Sociais",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Ausência de conflitos',
            'Disputas por reconhecimento e direitos',
            'Fim da cidadania',
            'Neutralidade social absoluta',
            'Inexistência de desigualdades',
        ],
    },

    {
        "statement": (
            'Ao analisar um gráfico de barras sobre consumo de água, conclui-se que o maior consumo ocorreu no mês de agosto. Essa conclusão depende principalmente da:'
        ),
        "explanation": (
            'A maior barra indica o maior valor representado no gráfico.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Matemática",
        "topic": "Análise de Gráficos",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Leitura da maior barra do gráfico',
            'Soma dos eixos sem legenda',
            'Cor do título',
            'Ordem alfabética dos meses',
            'Ausência de escala',
        ],
    },

    {
        "statement": (
            'Se 3 máquinas produzem 90 peças em uma hora, mantendo o mesmo ritmo, 1 máquina produz:'
        ),
        "explanation": (
            'Dividindo 90 por 3, uma máquina produz 30 peças.'
        ),
        "correct": "B",
        "difficulty": 1,
        "subject": "Matemática",
        "topic": "Regra de Três",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            '15 peças',
            '30 peças',
            '60 peças',
            '90 peças',
            '270 peças',
        ],
    },

    {
        "statement": (
            'Um número somado a 15 resulta em 42. Esse número é:'
        ),
        "explanation": (
            'A equação é x + 15 = 42, logo x = 27.'
        ),
        "correct": "C",
        "difficulty": 2,
        "subject": "Matemática",
        "topic": "Equações",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            '17',
            '22',
            '27',
            '30',
            '57',
        ],
    },

    {
        "statement": (
            'Quando um texto retoma outro texto de modo explícito ou implícito, ocorre:'
        ),
        "explanation": (
            'Intertextualidade ocorre quando um texto dialoga com outro.'
        ),
        "correct": "B",
        "difficulty": 3,
        "subject": "Linguagens",
        "topic": "Intertextualidade",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Coesão nominal',
            'Intertextualidade',
            'Concordância verbal',
            'Ambiguidade fonética',
            'Norma informal',
        ],
    },

    {
        "statement": (
            'Em anúncios publicitários, o uso de verbos no imperativo geralmente busca:'
        ),
        "explanation": (
            'O imperativo é usado para orientar ou persuadir o interlocutor.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Linguagens",
        "topic": "Publicidade",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Informar neutralmente',
            'Convencer o leitor a agir',
            'Narrar fatos históricos',
            'Apresentar hipótese científica',
            'Eliminar subjetividade',
        ],
    },

    {
        "statement": (
            'A ampliação do transporte público coletivo nas cidades tende a contribuir para:'
        ),
        "explanation": (
            'Transporte coletivo eficiente pode reduzir dependência de automóveis.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Geografia",
        "topic": "Mobilidade Urbana",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Aumento do congestionamento individual',
            'Redução do uso de automóveis particulares',
            'Fim da mobilidade urbana',
            'Privatização de calçadas',
            'Redução do acesso da população',
        ],
    },

    {
        "statement": (
            'A coleta seletiva de resíduos contribui principalmente para:'
        ),
        "explanation": (
            'A coleta seletiva facilita reciclagem e reduz impactos ambientais.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Geografia",
        "topic": "Sustentabilidade",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Aumento de lixões',
            'Reciclagem e redução de impactos ambientais',
            'Contaminação obrigatória',
            'Descarte irregular',
            'Fim do consumo',
        ],
    },

    {
        "statement": (
            'O Iluminismo valorizava especialmente:'
        ),
        "explanation": (
            'O Iluminismo defendia razão, liberdade e crítica ao absolutismo.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "História",
        "topic": "Iluminismo",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'A autoridade absoluta sem crítica',
            'A razão e a liberdade',
            'A servidão medieval',
            'O fim da ciência',
            'A censura permanente',
        ],
    },

    {
        "statement": (
            'O lema liberdade, igualdade e fraternidade está associado à:'
        ),
        "explanation": (
            'Esse lema sintetiza ideais da Revolução Francesa.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "História",
        "topic": "Revolução Francesa",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Revolução Francesa',
            'Guerra Fria',
            'Expansão marítima portuguesa',
            'Ditadura militar brasileira',
            'Revolução Verde',
        ],
    },

    {
        "statement": (
            'Em uma cadeia alimentar, os produtores são organismos capazes de:'
        ),
        "explanation": (
            'Produtores formam matéria orgânica a partir de fontes de energia.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Ciências da Natureza",
        "topic": "Cadeias Alimentares",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Produzir matéria orgânica por fotossíntese ou quimiossíntese',
            'Consumir apenas carnívoros',
            'Decompor plástico exclusivamente',
            'Eliminar energia do sistema',
            'Impedir fluxo energético',
        ],
    },

    {
        "statement": (
            'A ausência de saneamento básico favorece a disseminação de doenças relacionadas à:'
        ),
        "explanation": (
            'Falta de saneamento aumenta riscos de contaminação e doenças.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Ciências da Natureza",
        "topic": "Saneamento",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Contaminação da água e do solo',
            'Redução da gravidade',
            'Aumento da fotossíntese',
            'Formação de rochas',
            'Proteção imunológica',
        ],
    },

    {
        "statement": (
            'A energia solar é considerada renovável porque:'
        ),
        "explanation": (
            'A radiação solar é uma fonte naturalmente disponível e renovável.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Ciências da Natureza",
        "topic": "Energia",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Depende de recurso naturalmente reabastecido',
            'Usa combustível fóssil',
            'Esgota-se em poucos dias',
            'Não depende do Sol',
            'Produz urânio',
        ],
    },

    {
        "statement": (
            'Uma redação que discute assunto diferente do tema proposto pode ser penalizada por:'
        ),
        "explanation": (
            'Fugir do tema compromete a adequação à proposta.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Redação",
        "topic": "Fuga ao Tema",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Fuga ao tema',
            'Uso de repertório',
            'Coesão adequada',
            'Proposta detalhada',
            'Domínio da norma',
        ],
    },

    {
        "statement": (
            'Na proposta de intervenção, o agente corresponde:'
        ),
        "explanation": (
            'O agente é quem realiza a ação proposta.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Redação",
        "topic": "Agente de Intervenção",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'A quem executará a ação',
            'Ao título do texto',
            'À tese principal',
            'Ao erro gramatical',
            'À conclusão sem ação',
        ],
    },

    {
        "statement": (
            'Teorias contratualistas buscam explicar:'
        ),
        "explanation": (
            'Contratualistas discutem a formação do Estado e a legitimidade do poder.'
        ),
        "correct": "A",
        "difficulty": 3,
        "subject": "Filosofia",
        "topic": "Contrato Social",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'A origem e legitimidade do poder político',
            'A fotossíntese',
            'A formação de rochas',
            'O cálculo de juros',
            'A estrutura atômica',
        ],
    },

    {
        "statement": (
            'A defesa dos direitos humanos pressupõe:'
        ),
        "explanation": (
            'Direitos humanos se fundamentam na dignidade e igualdade.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Filosofia",
        "topic": "Direitos Humanos",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Dignidade e igualdade de direitos',
            'Privilégio exclusivo de grupos',
            'Ausência de proteção jurídica',
            'Fim da cidadania',
            'Negação da liberdade',
        ],
    },

    {
        "statement": (
            'O processo pelo qual indivíduos aprendem normas e valores de uma sociedade chama-se:'
        ),
        "explanation": (
            'Socialização é o aprendizado de normas, valores e práticas sociais.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Sociologia",
        "topic": "Socialização",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Socialização',
            'Fotossíntese',
            'Erosão',
            'Industrialização apenas',
            'Cartografia',
        ],
    },

    {
        "statement": (
            'A cidadania digital envolve:'
        ),
        "explanation": (
            'Cidadania digital envolve direitos, deveres e uso crítico da tecnologia.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Sociologia",
        "topic": "Cidadania Digital",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Uso responsável e crítico das tecnologias',
            'Proibição total da internet',
            'Ausência de direitos online',
            'Eliminação da privacidade',
            'Desinformação obrigatória',
        ],
    },

    {
        "statement": (
            'Com 3 camisetas e 2 calças diferentes, uma pessoa pode montar quantos conjuntos distintos?'
        ),
        "explanation": (
            'Multiplicam-se as opções: 3 vezes 2 = 6.'
        ),
        "correct": "B",
        "difficulty": 3,
        "subject": "Matemática",
        "topic": "Análise Combinatória",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            '5',
            '6',
            '8',
            '9',
            '12',
        ],
    },

    {
        "statement": (
            'A ironia ocorre quando há diferença entre o que se diz e:'
        ),
        "explanation": (
            'A ironia depende do contraste entre enunciado e intenção.'
        ),
        "correct": "A",
        "difficulty": 3,
        "subject": "Linguagens",
        "topic": "Ironia",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'O sentido pretendido',
            'A ortografia',
            'A pontuação obrigatória',
            'A separação silábica',
            'O número de parágrafos',
        ],
    },

    {
        "statement": (
            'A desconcentração industrial no Brasil está relacionada à:'
        ),
        "explanation": (
            'A desconcentração envolve deslocamento de atividades para outras áreas.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Geografia",
        "topic": "Industrialização",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Expansão de atividades industriais para novas regiões',
            'Concentração exclusiva em uma cidade',
            'Fim das fábricas',
            'Retorno ao extrativismo colonial',
            'Ausência de transporte',
        ],
    },

    {
        "statement": (
            'O movimento operário surgiu associado principalmente à luta por:'
        ),
        "explanation": (
            'Trabalhadores reivindicaram direitos e melhores condições laborais.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "História",
        "topic": "Movimento Operário",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            'Melhores condições de trabalho',
            'Fim da urbanização',
            'Manutenção da servidão',
            'Ampliação do absolutismo',
            'Proibição de sindicatos',
        ],
    },

    {
        "statement": (
            'A densidade de um material é calculada pela razão entre:'
        ),
        "explanation": (
            'Densidade é massa dividida pelo volume.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Ciências da Natureza",
        "topic": "Densidade",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'Massa e volume',
            'Altura e tempo',
            'Velocidade e força',
            'Temperatura e pressão',
            'Corrente e tensão',
        ],
    },

    {
        "statement": (
            'Um bom parágrafo argumentativo deve apresentar:'
        ),
        "explanation": (
            'O parágrafo deve desenvolver uma ideia de forma coerente.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Redação",
        "topic": "Parágrafo Argumentativo",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Ideia central e desenvolvimento coerente',
            'Apenas uma citação solta',
            'Somente conclusão',
            'Lista sem conexão',
            'Desvio do tema',
        ],
    },

    {
        "statement": (
            'No debate filosófico e social, alienação pode indicar:'
        ),
        "explanation": (
            'Alienação pode indicar afastamento crítico em relação às condições vividas.'
        ),
        "correct": "A",
        "difficulty": 3,
        "subject": "Filosofia",
        "topic": "Alienação",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Perda de consciência crítica sobre uma realidade',
            'Aumento da autonomia total',
            'Conhecimento pleno imediato',
            'Participação política máxima',
            'Clareza absoluta',
        ],
    },

    {
        "statement": (
            'Família, escola e Estado são exemplos de:'
        ),
        "explanation": (
            'Instituições sociais organizam práticas, normas e relações sociais.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Sociologia",
        "topic": "Instituições Sociais",
        "bank": "ENEM",
        "year": 2021,
        "options": [
            'Instituições sociais',
            'Reações químicas',
            'Biomas',
            'Equações',
            'Escalas',
        ],
    },

    {
        "statement": (
            'Um produto aumentou de R$ 80 para R$ 100. O aumento percentual foi de:'
        ),
        "explanation": (
            'O aumento foi de 20 sobre 80, o que corresponde a 25%.'
        ),
        "correct": "B",
        "difficulty": 2,
        "subject": "Matemática",
        "topic": "Porcentagem",
        "bank": "ENEM",
        "year": 2022,
        "options": [
            '20%',
            '25%',
            '30%',
            '40%',
            '50%',
        ],
    },

    {
        "statement": (
            'Um resumo deve apresentar:'
        ),
        "explanation": (
            'O resumo sintetiza as ideias principais do texto.'
        ),
        "correct": "A",
        "difficulty": 1,
        "subject": "Linguagens",
        "topic": "Resumo",
        "bank": "ENEM",
        "year": 2023,
        "options": [
            'As ideias essenciais do texto original',
            'Opiniões sem relação',
            'Cópia integral',
            'Apenas exemplos',
            'Novo tema',
        ],
    },

    {
        "statement": (
            'Migração pendular é o deslocamento caracterizado por:'
        ),
        "explanation": (
            'Migração pendular ocorre com deslocamentos cotidianos ou frequentes.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "Geografia",
        "topic": "Migração",
        "bank": "ENEM",
        "year": 2024,
        "options": [
            'Ida e volta frequente entre locais de moradia e trabalho ou estudo',
            'Mudança definitiva de país',
            'Deslocamento sem retorno por guerra',
            'Viagem turística anual',
            'Êxodo rural permanente',
        ],
    },

    {
        "statement": (
            'A preservação do patrimônio cultural contribui para:'
        ),
        "explanation": (
            'O patrimônio cultural preserva memórias, identidades e referências coletivas.'
        ),
        "correct": "A",
        "difficulty": 2,
        "subject": "História",
        "topic": "Patrimônio Cultural",
        "bank": "ENEM",
        "year": 2025,
        "options": [
            'Manter memórias e identidades coletivas',
            'Apagar tradições',
            'Eliminar diversidade',
            'Impedir pesquisa histórica',
            'Desvalorizar comunidades',
        ],
    },

]


def delete_previous_enem_questions(
    db: Session,
) -> None:
    """
    Remove previous ENEM questions
    and dependent records.
    """

    question_ids = [
        row[0]
        for row in db.query(
            Question.id,
        )
        .filter(
            Question.bank == "ENEM",
        )
        .all()
    ]

    if not question_ids:
        return

    db.execute(
        delete(UserAnswer).where(
            UserAnswer.question_id.in_(
                question_ids,
            ),
        ),
    )

    db.execute(
        delete(MockExamQuestion).where(
            MockExamQuestion.question_id.in_(
                question_ids,
            ),
        ),
    )

    db.execute(
        delete(QuestionOption).where(
            QuestionOption.question_id.in_(
                question_ids,
            ),
        ),
    )

    db.execute(
        delete(Question).where(
            Question.id.in_(
                question_ids,
            ),
        ),
    )

    db.commit()


def create_enem_questions(
    db: Session,
) -> None:
    """
    Insert ENEM questions and options.
    """

    for item in ENEM_QUESTIONS:

        question = Question(
            id=uuid.uuid4(),
            statement=item["statement"],
            explanation=item["explanation"],
            difficulty=item["difficulty"],
            subject=item["subject"],
            topic=item["topic"],
            bank=item["bank"],
            year=item["year"],
        )

        db.add(
            question,
        )

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

            db.add(
                option,
            )

    db.commit()


def main() -> None:
    """
    Execute ENEM seed process.
    """

    db = SessionLocal()

    try:

        print(
            "Removing previous ENEM questions...",
        )

        delete_previous_enem_questions(
            db,
        )

        print(
            "Creating 100 ENEM questions...",
        )

        create_enem_questions(
            db,
        )

        print(
            "ENEM seed completed successfully.",
        )

    finally:

        db.close()


if __name__ == "__main__":

    main()
