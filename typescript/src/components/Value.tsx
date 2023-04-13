type ValueProps = {
  value: number;
  numValues: number;
};

const Value = (props: ValueProps): JSX.Element => {
  return (
    <li
      className="w-4 border-[1px] border-black rounded-sm bg-gray-200"
      // style={{ height: ((props.value + 1) * 10) / props.numValues + "rem" }}
      style={{
        height: ((props.value + 1) * 100) / props.numValues + "%",
        width: 100 / props.numValues + "%",
      }}
    ></li>
  );
};

export default Value;
