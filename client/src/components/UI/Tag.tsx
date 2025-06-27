type TagVariants = "outline" | "red" | "green" | "blue";

type TagProps = {
  label: string;
  variant?: TagVariants;
};

const tagVariants: Record<TagVariants, string> = {
  outline: "bg-transparent border border-gray-300 text-gray-600",
  red: "bg-rose-600 text-white",
  green: "bg-lime-500 text-white",
  blue: "bg-sky-300 text-white",
};

export default function Tag({ label, variant = "blue" }: TagProps) {
  const tagClasess = tagVariants[variant];

  return (
    <div
      className={`rounded-lg px-3 py-1 text-center leading-4 font-medium text-sm ${tagClasess}`}
    >
      {label}
    </div>
  );
}
