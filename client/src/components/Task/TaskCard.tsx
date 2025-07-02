import Tag from "../UI/Tag";

export default function Task() {
  return (
    <article className="flex flex-col p-3 gap-3 bg-light-green rounded-lg shadow shadow-green">
      <div className="flex justify-between">
        <p className="font-semibold text-xl">Title</p>
        <div className="flex gap-4">
          <Tag variant="outline" label="Due Date" />
          <Tag variant="red" label="high" />
        </div>
      </div>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem cum ut
        ducimus obcaecati in similique. Harum nulla impedit est, esse, ratione
        doloribus, repellat molestiae culpa ut dicta ullam? Ipsam, ut!
      </p>

      <div className="flex justify-between">
        <p>Progress Switch</p>
        <p>Task Status</p>
      </div>
    </article>
  );
}
