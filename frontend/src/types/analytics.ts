export interface OverviewAnalytics {
    total_mock_exams: number;
  
    total_answers: number;
  
    correct_answers: number;
  
    accuracy: number;
  
    average_response_time:
      number | null;
}


export interface DailyMission {
  id: string;
  title: string;
  completed: boolean;
}