# 🚀 StudyLevel AI

## Overview

StudyLevel AI is an intelligent learning platform designed to help students prepare for exams, certifications, and academic assessments through data-driven insights, gamification, and Artificial Intelligence.

The platform combines question practice, real-time analytics, performance tracking, ranking systems, and AI-powered assistance to create a modern and engaging study experience.

---

## ✨ Features

### 🧠 AI-Powered Learning

* Intelligent study hints
* AI-generated explanations
* Adaptive learning foundation
* Personalized recommendations (future roadmap)

### 📚 Question Practice

* Random question mode
* Immediate feedback
* Detailed explanations
* Response time tracking

### 📈 Analytics Dashboard

* Accuracy tracking
* Performance evolution
* Subject-level analysis
* Learning insights

### 🎮 Gamification

* XP system
* User levels
* Daily streaks
* Global ranking

### 🔐 Security

* JWT Authentication
* Protected API routes
* Input validation
* Prompt Injection awareness and safeguards
* Separation between AI and business logic layers

---

# 🏗 Architecture

```text
┌─────────────────┐
│     Next.js     │
│   React + TS    │
└────────┬────────┘
         │ REST API
         ▼
┌─────────────────┐
│     FastAPI     │
│ Business Logic  │
└────────┬────────┘
         │ ORM
         ▼
┌─────────────────┐
│   PostgreSQL    │
│     Database    │
└─────────────────┘
```

---

# ⚙️ Tech Stack

## Backend

* Python 3.12
* FastAPI
* SQLAlchemy
* Alembic
* PostgreSQL 16
* JWT Authentication
* Pydantic
* Uvicorn
* Docker
* Docker Compose

## Frontend

* Next.js 15
* React 19
* TypeScript
* TailwindCSS
* TanStack Query
* Axios
* Recharts
* Framer Motion
* Lucide Icons

---

# 📊 Main Modules

## Authentication

* User registration
* User login
* JWT token management

## Questions

* Question bank
* Multiple choice questions
* Randomized training sessions

## Progression

* XP accumulation
* Level calculation
* Daily streak tracking

## Ranking

* Global ranking
* XP leaderboard
* Performance comparison

## Analytics

* Accuracy metrics
* Historical performance
* Subject breakdown
* Learning insights

---

# 🐳 Running with Docker

## Prerequisites

Install:

* Docker
* Docker Compose

Verify installation:

```bash
docker --version
docker compose version
```

---

## Clone Repository

```bash
git clone https://github.com/your-user/studylevel-ai.git

cd studylevel-ai
```

---

## Start Containers

```bash
docker compose up --build -d
```

This command will start:

* Frontend (Next.js)
* Backend (FastAPI)
* PostgreSQL

---

## Verify Running Containers

```bash
docker ps
```

Expected containers:

```text
study_frontend
study_backend
study_postgres
```

---

# 🗄 Database Migrations

Run migrations after containers are started:

```bash
docker compose exec backend alembic upgrade head
```

---

# 🌐 Accessing the Application

## Frontend

```text
http://localhost:3000
```

---

## Backend API

```text
http://localhost:8000
```

---

## Interactive Swagger Documentation

```text
http://localhost:8000/docs
```

Features available in Swagger:

* Authentication
* Questions
* Analytics
* Ranking
* User Progress
* Mock Exams

---

## OpenAPI Specification

```text
http://localhost:8000/openapi.json
```

---

# 🔑 Authentication Flow

1. Register a user
2. Login using:

```http
POST /auth/login
```

3. Copy the JWT token
4. Click "Authorize" in Swagger
5. Use:

```text
Bearer <your_token>
```

6. Access protected endpoints

---

# 📂 Project Structure

```text
backend/
│
├── app/
│   ├── api/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   ├── schemas/
│   └── core/
│
├── alembic/
│
└── Dockerfile

frontend/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── providers/
│   └── services/
│
└── Dockerfile
```

---

# 🚧 Future Improvements

## AI

* Personalized study plans
* Adaptive recommendations
* Automatic question generation
* Learning path optimization

## Gamification

* Achievements
* Badges
* Daily missions
* Weekly challenges

## Analytics

* Predictive performance models
* Learning curve analysis
* Comparative benchmarking

---

# 👨‍💻 Author

Developed as a Full Stack Learning Analytics Platform focused on modern software architecture, Artificial Intelligence integration, educational analytics, and gamification.

---

# 📜 License

This project is available for educational and portfolio purposes.
