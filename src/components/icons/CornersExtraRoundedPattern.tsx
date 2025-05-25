const CornersExtraRoundedPattern: React.FC<React.ComponentProps<"svg">> = ({
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
        x="3.306"
        y="3.314"
        stroke="#000"
        strokeWidth="5"
        rx="10"
      ></rect>
      <path fill="#DDE0E4" d="M11.742 11.737h11.597v11.579H11.742z"></path>
    </svg>
  );
};

export default CornersExtraRoundedPattern;
