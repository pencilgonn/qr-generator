const CornersRoundedPattern: React.FC<React.ComponentProps<"svg">> = ({
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 35 35"
      fill="none"
      {...props}
    >
      <rect
        width="28.465"
        height="28.421"
        x="2.556"
        y="3.314"
        stroke="#000"
        strokeWidth="5"
        rx="4"
      ></rect>
      <path fill="#DDE0E4" d="M10.991 11.737h11.597v11.579H10.991z"></path>
    </svg>
  );
};

export default CornersRoundedPattern;
