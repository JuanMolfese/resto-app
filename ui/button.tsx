interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ButtonOk({ children, ...rest } : ButtonProps) {
  return (
    <button
      {...rest}
      className="flex h-10 items-center rounded-lg bg-blue-400 px-4 text-sm text-white font-medium transition-colors hover:bg-blue-500"
    >
      {children}
    </button>
  )
}