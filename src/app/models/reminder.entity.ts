export interface Reminder {
  id?: number;
  title: string;
  deadline: number;
  insertedDate?: number;
  body: string;
  user_id?: number;
}
