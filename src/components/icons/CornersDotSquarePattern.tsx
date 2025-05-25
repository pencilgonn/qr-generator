const CornersDotSquarePattern: React.FC<React.ComponentProps<"svg">> = ({
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 33 33"
      fill="none"
      {...props}
    >
      <rect
        x="3"
        y="3"
        width="27"
        height="27"
        stroke="#DDDDDD"
        strokeWidth="5"
      ></rect>
      <rect x="11" y="11" width="11" height="11" fill="black"></rect>
    </svg>
  );
};

export default CornersDotSquarePattern;
