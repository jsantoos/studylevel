export interface UserProgress {
    xp: number;
    level: number;
    streak_days: number;
    total_questions: number;
    correct_questions: number;
    total_mock_exams: number;
    accuracy: number;
    average_response_time: number;
    ai_hints_used: number;
    ai_explanations_used: number;
}

export interface UserPreferences {
    study_goal_minutes: number;
    favorite_subjects: string[];
    preferred_difficulty: string;
    focus_mode_enabled: boolean;
    notifications_enabled: boolean;
    theme: string;
}

export interface DailyMission {
    id: string;
    progress: number;
    completed: boolean;
    mission: {
      id: string;
      title: string;
      mission_type: string;
      goal: number; 
      reward_xp: number;
    };
}


