export interface Reminder {
  id?: number;
  title: string;
  deadline: number | string;
  createdAt?: number | string;
  body: string;
  user_id?: number;
}
