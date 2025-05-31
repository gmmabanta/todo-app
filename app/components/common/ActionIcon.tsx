import Loader from "./Loader";

interface ActionIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function ActionIcon({
  isLoading,
  children,
  ...rest
}: ActionIconProps) {
  return (
    <button
      {...rest}
      disabled={isLoading}
      className={
        isLoading
          ? "cursor-wait " + (rest?.className ?? "")
          : "cursor-pointer " + (rest?.className ?? "")
      }
    >
      {isLoading ? <Loader type="component" /> : children}
    </button>
  );
}
