export interface Reminder {
  id?: number;
  title: string;
  deadline: number | Date;
  insertedDate?: number | Date;
  body: string;
  user_id?: number;
}
