import { cn } from "../../lib/utils";

const IconWrapper = ({
  title,
  children,
  disabled = false,
  onClickHandler,
  className,
}) => {
  return (
    <button
      title={title}
      className={cn(
        `  w-14 h-14 flex justify-center items-center group ${
          disabled
            ? "text-gray-500"
            : "text-primary md:hover:border md:hover:bg-white/10  md:hover:border-white/20 md:hover:shadow-slate-900 md:hover:shadow-sm md:hover:backdrop-blur-xl md:hover:rounded-lg"
        }`,
        className
      )}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default IconWrapper;
