type SwitchProps = {
  isChecked: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
};

export default function Switch({ isChecked, label, onChange }: SwitchProps) {
  const switchClasses =
    " relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white peer-checked:bg-green after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all";

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        checked={isChecked}
        className="sr-only peer"
        onChange={(e) => onChange?.(e.target.checked)}
        type="checkbox"
        value=""
      />
      <div className={`${switchClasses}`}></div>
      <span className="ms-3 text-sm font-medium text-green">{label}</span>
    </label>
  );
}
