type ValueProps = {
  value: number;
};

const Value = (props: ValueProps): JSX.Element => {
  return <div>{props.value}</div>;
};

export default Value;
