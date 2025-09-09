interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const Logo = ({ width = 32, height = 32, className = "" }: LogoProps) => {
  // Use consistent IDs that don't change between server and client renders
  const gradientId1 = "sorateq-gradient-primary";
  const gradientId2 = "sorateq-gradient-secondary";
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 135 135" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M135 67.5V33.75C135 15.1104 119.89 0 101.25 0C82.6104 0 67.5 15.1104 67.5 33.75C67.5 52.3896 52.3896 67.5 33.75 67.5C15.1104 67.5 0 82.6104 0 101.25C0 119.89 15.1104 135 33.75 135H67.5C104.779 135 135 104.779 135 67.5Z" 
        fill={`url(#${gradientId1})`}
      />
      <ellipse 
        cx="32.4" 
        cy="32.4" 
        rx="27" 
        ry="27" 
        fill={`url(#${gradientId2})`}
      />
      <defs>
        <linearGradient 
          id={gradientId1} 
          x1="67.5" 
          y1="0" 
          x2="67.5" 
          y2="135" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6237FF"/>
          <stop offset="1" stopColor="#FFA052"/>
        </linearGradient>
        <linearGradient 
          id={gradientId2} 
          x1="32.4" 
          y1="5.39999" 
          x2="32.4" 
          y2="59.4" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E11156"/>
          <stop offset="1" stopColor="#FD8353"/>
        </linearGradient>
      </defs>
    </svg>
  );
};
