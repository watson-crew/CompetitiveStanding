type ButtonProps = {
  text: string,
  onClick: () => any
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return <button 
    type="button" 
    className="bg-slate-400 hover:bg-slate-200 h-16 px-4 rounded-md" onClick={onClick}
      >{ text }
    </button>;
};
