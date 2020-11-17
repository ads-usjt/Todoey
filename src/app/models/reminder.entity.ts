export interface Reminder {
  id?: number;
  title: string;
  deadline: number | Date;
  createdAt?: number | Date;
  body: string;
  user_id?: number;
}
