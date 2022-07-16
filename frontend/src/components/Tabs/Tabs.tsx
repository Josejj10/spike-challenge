import { TabEnums } from "../../enums/tabs.enum";
import Tab from "./Tab";

export interface TabsProps {
  options: { text: string; key: TabEnums }[];
  active: TabEnums;
  onSelect: (key: TabEnums) => void;
}

function Tabs({ options, active, onSelect }: TabsProps) {
  return (
    <div className="lg:pr-2 flex align-center justify-center gap-5 lg:flex-col">
      {options.map((tab) => (
        <Tab
          active={tab.key === active}
          key={tab.key}
          onClick={() => onSelect(tab.key)}
          text={tab.text}
        />
      ))}
    </div>
  );
}

export default Tabs;
