import { useMemo, useState } from "react";
import { TabEnums } from "../enums/tabs.enum";
import Link from "./Link/Link";
import CalculateDistance from "./CalculateDistance/CalculateDistance";
import Tabs from "./Tabs/Tabs";
import SearchHistory from "./SearchHistory/SearchHistory";

const tabOptions = [
  { text: "Calculate Distance", key: TabEnums.CALC },
  { text: "Search History", key: TabEnums.HISTORY },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabEnums>(TabEnums.CALC);

  const changeActiveTab = (key: TabEnums) => {
    setActiveTab(key);
  };

  const isCalcActive = useMemo(() => activeTab === TabEnums.CALC, [activeTab]);
  const isHistoryActive = useMemo(
    () => activeTab === TabEnums.HISTORY,
    [activeTab]
  );

  return (
    <main className="mx-auto p-5 md:container md:p-10 flex flex-col items-center">
      <header className="pb-2 lg:pb-3 mb-1 lg:mb-2">
        <h1 className="text-3xl lg:text-5xl text-center text-red-600 font-bold mb-3 lg:mb-5">
          Distance between two addresses
        </h1>
        <h3 className="text-lg font-semibold lg:text-xl text-center mb-3 lg:mb-5">
          ⚡ Spike Challenge done by Jose Javier ⚡
        </h3>
        <p className="text-md lg:text-lg text-center">
          Using{" "}
          <Link
            url="https://nominatim.org/release-docs/develop/api/Overview/"
            text="Nominatim API"
          />{" "}
          calculate the distance in km. between two given addresses and provide
          a search history.
        </p>
      </header>
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:px-3 lg:py-10 w-full md:max-w-4xl">
        <div className="lg:col-span-2 flex flex-col align-center border-b-2 lg:border-b-0 lg:border-r-2 border-slate-300 max-h-max">
          <Tabs
            options={tabOptions}
            active={activeTab}
            onSelect={changeActiveTab}
          />
        </div>
        <div className="lg:col-span-10">
          {isCalcActive && <CalculateDistance />}
          {isHistoryActive && <SearchHistory />}
        </div>
      </section>
    </main>
  );
}

export default App;
