export interface Question {
  id: string;
  text: string;
}

export interface Factor {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}
