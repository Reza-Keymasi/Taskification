import Tag from "../UI/Tag";

type TaskCardProps = {
  description?: string;
  dueDate: string;
  isInProgress: boolean;
  priority: "low" | "normal" | "high";
  status: "todo" | "inProgress" | "completed";
  title: string;
};

export default function TaskCard({
  description,
  dueDate,
  isInProgress,
  priority,
  status,
  title,
}: TaskCardProps) {
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
