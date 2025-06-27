import { type TaskCounterType } from "../../types/taskCounter.type";

type Status = "todo" | "inProgress" | "completed";

const progressVariants: Record<Status, string> = {
  todo: "border-sky-500",
  inProgress: "border-orange-700",
  completed: "border-green-500",
};

export default function TasksCounter({ status, count }: TaskCounterType) {
  const progressClasess = progressVariants[status];

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`p-6 mb-4 border-solid border-4 rounded-full aspect-square ${progressClasess}`}
      >
        <div className="min-h-10 min-w-10 text-center justify-center text-3xl leading-12">
          {count}
        </div>
      </div>
      <div className="text-xl text-center">
        {status === "todo" && "Todo"}
        {status === "inProgress" && "In Progress"}
        {status === "completed" && "Completed"}
      </div>
    </div>
  );
}
