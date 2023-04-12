type ValueProps = {
  value: number;
};

const Value = (props: ValueProps): JSX.Element => {
  return (
    <li
      className="w-4 border-[1px] border-black rounded-sm bg-gray-200"
      style={{ height: props.value + 1 + "rem" }}
    ></li>
  );
};

export default Value;
