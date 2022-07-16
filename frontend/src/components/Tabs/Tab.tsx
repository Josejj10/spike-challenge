export interface TabProps {
  text: string;
  active: boolean;
  onClick: () => void;
}

function Tab({ active, text, onClick }: TabProps) {
  const activeClass = "";

  return (
    <div
      className={`${
        active ? activeClass + "text-red-600 font-bold" : ""
      } cursor-pointer lg:pr-2`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default Tab;
