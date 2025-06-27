import {
  type ChangeEvent,
  type ComponentProps,
  type FocusEvent,
  type ReactNode,
  type Ref,
} from "react";
import { combineClasses } from "../../utils/combineClasses.utils";

type InputProps = {
  error?: string | null;
  fullWidth?: boolean;
  isDisabled?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  ref?: Ref<HTMLInputElement>;
  rightIconClassName?: string;
  leftIconClassName?: string;
  name?: string;
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentProps<"input">;

export default function Input({
  error,
  fullWidth = false,
  inputClassName = "",
  isDisabled = false,
  label,
  labelClassName = "",
  leftIcon,
  leftIconClassName = "",
  name,
  onBlur,
  onChange,
  ref,
  rightIcon,
  rightIconClassName = "",
  ...props
}: InputProps) {
  const modifiedLabel = label?.charAt(0).toUpperCase() + label?.slice(1);

  const stateClasses = combineClasses(
    isDisabled ? "bg-gray-400 opacity-70 cursor-not-allowed" : ""
  );

  const inputBaseClasses =
    "peer block h-12 bg-transparent rounded-lg border focus:outline-0 appearance-none";

  const inputStateClasess =
    error && !isDisabled
      ? "border-error"
      : "border-gray-800 focus:border-green";

  const labelBaseClasess =
    "flex items-center absolute top-3 text-sm transition-all duration-150 ease-in peer-focus:top-0.5 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0.5 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none";

  const labelStateClasses =
    error && !isDisabled ? "text-error" : "text-gray-800 peer-focus:text-green";

  const leftIconBaseClasess =
    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 pointer-events-none";
  const rightIconBaseClasess =
    "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 pointer-events-none";

  const inputClasses = combineClasses(
    inputBaseClasses,
    inputStateClasess,
    inputClassName,
    stateClasses,
    leftIcon ? "pl-10" : "pl-3",
    rightIcon ? "pr-10" : "pr-3",
    fullWidth ? "w-full" : ""
  );

  const labelClasess = combineClasses(
    labelBaseClasess,
    labelStateClasses,
    labelClassName,
    leftIcon ? "pl-10" : "pl-3",
    rightIcon ? "pr-10" : "pr-3"
  );

  const containerClasess = combineClasses(
    fullWidth ? "w-full" : "inline-block",
    stateClasses
  );

  const leftIconClasses = combineClasses(
    leftIconBaseClasess,
    leftIconClassName
  );
  const rightIconClasses = combineClasses(
    rightIconBaseClasess,
    rightIconClassName
  );

  return (
    <div className={`${containerClasess}`}>
      <div className="relative">
        {leftIcon && <div className={`${leftIconClasses}`}>{leftIcon}</div>}

        <input
          className={`${inputClasses}`}
          disabled={isDisabled}
          id={label}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder=" "
          ref={ref}
          {...props}
        />

        {rightIcon && <div className={`${rightIconClasses}`}>{rightIcon}</div>}

        <label className={`${labelClasess}`} htmlFor={label}>
          {modifiedLabel}
        </label>
      </div>
      <div className="absolute text-xs capitalize text-error pl-2">
        {!isDisabled && error ? error : null}
      </div>
    </div>
  );
}
