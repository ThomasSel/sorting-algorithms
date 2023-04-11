type ValueProps = {
  value: number;
};

const Value = (props: ValueProps): JSX.Element => {
  return <div className="bg-green-200">{props.value}</div>;
};

export default Value;
