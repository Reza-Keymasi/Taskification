import Tag from "../UI/Tag";
import type { ITask } from "../../types/task.interface";

export default function TaskCard({
  description,
  dueDate,
  priority,
  status,
  title,
}: ITask) {
  return (
    <article className="flex flex-col p-3 gap-3 bg-light-green rounded-lg shadow shadow-green">
      <div className="flex justify-between">
        <p className="font-semibold text-xl">{title}</p>
        <div className="flex gap-4">
          <Tag variant="outline" label={dueDate} />
          <Tag variant="red" label={priority} />
        </div>
      </div>

      <p>{description}</p>

      <div className="flex justify-between">
        <p>Progress Switch</p>
        <p>Task Status</p>
      </div>
    </article>
  );
}
