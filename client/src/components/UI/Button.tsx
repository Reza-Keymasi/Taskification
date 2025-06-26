import {
  type ReactNode,
  type ComponentProps,
  type Ref,
  type MouseEvent,
} from "react";
import { Loader2 } from "lucide-react";

type Sizes = "xs" | "sm" | "md" | "lg" | "xl";
type Variants =
  | "primary"
  | "secondary"
  | "outline"
  | "destructive"
  | "success"
  | "ghost";

type Shapes = "default" | "circle";

type ButtonVariants = {
  size: Record<Sizes, string>;
  variant: Record<Variants, string>;
  shape: Record<Shapes, string>;
};

type ButtonProps = {
  size?: keyof ButtonVariants["size"];
  variant?: keyof ButtonVariants["variant"];
  shape?: keyof ButtonVariants["shape"];

  children?: ReactNode;
  icon?: ReactNode;
  iconOnly?: boolean;

  isLoading?: boolean;
  isDisabled?: boolean;

  className?: string;

  ref?: Ref<HTMLButtonElement>;

  onClick?: () => void;
} & Omit<ComponentProps<"button">, "size">;

const buttonVariants: ButtonVariants = {
  size: {
    xs: "px-2 py-1 text-xs font-medium",
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2 text-base font-medium",
    lg: "px-6 py-3 text-lg font-medium",
    xl: "px-8 py-4 text-xl font-semibold",
  },
  variant: {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 shadow-sm",
    secondary:
      "bg-[#2C5364] text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-500 shadow-sm",
    outline:
      "border-2 border-sky-500 text-sky-700 hover:bg-sky-50 active:bg-sky-100",
    ghost: "bg-sky-50 text-indigo-400 hover:bg-sky-100 active:bg-sky-200",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 shadow-sm",
    success:
      "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500 shadow-sm",
  },
  shape: {
    default: "rounded-md",
    circle: "rounded-full aspect-square",
  },
};

const combineClasses = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export default function Button({
  children,
  className = "",
  icon,
  iconOnly = false,
  isDisabled = false,
  isLoading = false,
  onClick,
  ref,
  shape = "default",
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md gap-2 transition-all duration-200 appereance-none focus:outline-none font-medium";

  const sizeClasses = buttonVariants.size[size];
  const variantClasses = buttonVariants.variant[variant];
  const shapeClasses = buttonVariants.shape[shape];

  const stateClasses = combineClasses(
    isDisabled && "opacity-50 cursor-not-allowed"
  );

  const buttonClasses = combineClasses(
    baseClasses,
    sizeClasses,
    variantClasses,
    shapeClasses,
    className,
    stateClasses
  );

  const iconSize = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
  }[size];

  const content = (
    <>
      {isLoading ? (
        <Loader2 size={iconSize} className="animate-spin" />
      ) : iconOnly ? (
        <span className="flex items-center">{icon}</span>
      ) : null}

      {!iconOnly && <span>{isLoading ? "Loading..." : children}</span>}
    </>
  );

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (isDisabled) return;

    onClick?.(e);
  }

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled || isLoading}
      onClick={handleClick}
      ref={ref}
      type="button"
      {...props}
    >
      {content}
    </button>
  );
}
