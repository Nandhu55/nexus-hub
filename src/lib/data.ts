export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  year: string;
  description: string;
  cover_image: string;
  pdf_url: string;
  data_ai_hint: string;
  rating?: number;
};

export type User = {
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    signed_up_at: string;
    avatar_url?: string;
    course?: string;
    year?: string;
    is_admin?: boolean;
}

export type QuestionPaper = {
  id: string;
  subject: string;
  category: string;
  year: string;
  semester?: string;
  university: string;
  type: 'Mid-1' | 'Mid-2' | 'Semester End' | 'Quiz';
  download_url: string;
};

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  read: boolean;
  timestamp: string;
  type: 'welcome' | 'new_book' | 'security' | 'general';
}


export const courses = ['Computer Science', 'Electronics', 'Mechanical', 'Civil Engineering'];
export const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
export const semesters = ['1st Sem', '2nd Sem', '3rd Sem', '4th Sem', '5th Sem', '6th Sem', '7th Sem', '8th Sem'];
