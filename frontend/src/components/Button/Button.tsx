export interface ButtonProps {
  text: string;
  onClick?: () => void;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      className="
          px-5 py-2 rounded-sm font-semibold transition-colors
          text-lg text-red-500 hover:text-white
        bg-red-50 hover:bg-red-600 active:bg-red-700 
          outline outline-1 outline-red-500 focus:outline-none 
          focus:ring focus:ring-offset-2 focus:ring-red-300"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
