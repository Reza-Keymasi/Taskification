export interface ITask {
  title: string;
  description: string;
  status: "todo" | "inProgress" | "completed";
}
