import Card from "./Card";

const InputWithLabel = ({
  label = "sample text",
  disabled = true,
  type = "text",
  value,
  placeholder = "",
  onChangeHandler,
  required = false,
}) => {
  const id = label.replace(/ /g, "-");
  return (
    <div className="flex-col w-full justify-center items-center space-y-3 text-gray-300">
      <label htmlFor={id} className="text-gray-500 block sm:text-lg text-base ">
        {label}
      </label>
      <Card
        borderRadius="rounded-md"
        className={` ${disabled ? "border-white/10" : " border-white/30"}`}
      >
        <input
          placeholder={placeholder}
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChangeHandler}
          disabled={disabled}
          required={required}
          className={`bg-transparent w-full h-[50px] text-lg sm:text-xl text-left px-2 sm:px-5 cursor-text disabled:cursor-default outline-0 caret-primary`}
        />
      </Card>
    </div>
  );
};
export default InputWithLabel;
