export const DownArrowIcon: React.FC<{
  className?: string;
  animated?: boolean;
}> = ({ className, animated }) => {
  return (
    <svg
      className={`${animated && 'animate-floating'} ${className}`}
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='17'
      fill='none'
    >
      <path
        stroke='url(#faq-load)'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8 3.152V13.82m0 0 4-4m-4 4-4-4'
      />
      <defs>
        <linearGradient
          id='faq-load'
          x1='11.85'
          x2='3.509'
          y1='3.152'
          y2='3.551'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#2DD282' />
          <stop offset='1' stopColor='#90F4E8' />
        </linearGradient>
      </defs>
    </svg>
  );
};
