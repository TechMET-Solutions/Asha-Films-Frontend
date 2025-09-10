
function Button({ title, className = '', onClick, ...rest }) {
  return (
    <button
      onClick={onClick}
      className={`w-24 h-10 px-3 py-1 text-[15px] text-primary border-2 border-primary font-bold hover:text-tertiary hover:border-tertiary hover:bg-gradient-to-b hover:from- hover:via-secondary hover:to-primary cursor-pointer ${className}`}
      {...rest}
    >
      {title}
    </button>
  );
}

export default Button;