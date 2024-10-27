interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  callback: () => void;
  label: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  callback,
  label,
  ...rest
}) => {
  return (
    <button
      onClick={callback}
      className='flex gap-3 items-center justify-center mt-4 px-4 py-2 bg-blue-500 text-neutral-200 rounded hover:bg-primary-600 transition-colors duration-300'
      {...rest}
    >
      <span>{label}</span>
      {children}
    </button>
  );
};
