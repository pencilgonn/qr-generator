const CornersDotRoundedPattern: React.FC<React.ComponentProps<"svg">> = ({
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
      <path
        stroke="#DDE0E4"
        strokeWidth="5"
        d="M3.157 3.208h27v27h-27z"
      ></path>
      <rect
        width="11"
        height="11"
        x="11.158"
        y="11.209"
        fill="#000"
        rx="3"
      ></rect>
    </svg>
  );
};

export default CornersDotRoundedPattern;
