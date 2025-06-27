import TaskCard from "../components/Task/TaskCard";
import TasksCounter from "../components/Task/TasksCounter";

export default function TodoApp() {
  return (
    <section className="flex w-full p-4 gap-8">
      <section className="flex basis-2/3 justify-center">
        <div className="flex flex-col w-4/5 p-4">
          {" "}
          <h1 className="font-bold text-2xl mb-8">Tasks List</h1>
          <div className="flex justify-around mb-12">
            <TasksCounter count={10} status="todo" />
            <TasksCounter count={1} status="inProgress" />
            <TasksCounter count={8} status="completed" />
          </div>
          <TaskCard />
        </div>
      </section>
      <section className="flex basis-1/3">Section 2</section>
    </section>
  );
}
