const CornersDotSClassyPattern: React.FC<React.ComponentProps<"svg">> = ({
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
        d="M3.126 3.001h27v27h-27z"
      ></path>
      <path
        fill="#000"
        d="M21.692 10.84h-8a3 3 0 0 0-3 3v8h8a3 3 0 0 0 3-3v-8Z"
      ></path>
    </svg>
  );
};

export default CornersDotSClassyPattern;
