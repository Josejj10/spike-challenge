import { useState } from "react";
import axios from "axios";
import SearchAddress from "./SearchAdress/SearchAddress";
import Button from "./Button/Button";
import Tabs from "./Tabs/Tabs";
import { TabEnums } from "../enums/tabs.enum";
import { useMemo } from "react";

const tabOptions = [
  { text: "Calculate Distance", key: TabEnums.CALC },
  { text: "Search History", key: TabEnums.HISTORY },
];

function App() {
  const [addressFrom, setAddressFrom] = useState<any>({
    properties: { display_name: "" },
  });
  const [addressTo, setAddressTo] = useState<any>({});
  const [output, setOutput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabEnums>(TabEnums.CALC);

  // ============
  // Tabs
  // ============
  const changeActiveTab = (key: TabEnums) => {
    setActiveTab(key);
  };

  const isCalcActive = useMemo(() => activeTab === TabEnums.CALC, [activeTab]);
  const isHistoryActive = useMemo(
    () => activeTab === TabEnums.HISTORY,
    [activeTab]
  );

  // ===================
  // Calculate Distance
  // todo: move
  // ===================

  const handleSubmit = () => {
    axios
      .post(`/api/distance`, {
        addressFrom: addressFrom.value,
        addressTo: addressTo.value,
      })
      .then((res) => {
        setOutput(res.data[0].display_name);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="mx-auto p-5 md:container md:p-10 flex flex-col items-center">
      <header className="pb-2 lg:pb-3 mb-1 lg:mb-2 border-b-slate-300 border-b">
        <h1 className="text-3xl lg:text-5xl text-center text-red-600 font-bold mb-3 lg:mb-5">
          Distance between two addresses
        </h1>
        <h3 className="text-lg font-semibold lg:text-xl text-center mb-3 lg:mb-5">
          ⚡ Spike Challenge done by Jose Javier ⚡
        </h3>
        <p className="text-md lg:text-lg text-center">
          Using{" "}
          <a
            className="text-blue-500"
            href="https://nominatim.org/release-docs/develop/api/Overview/"
            target="_blank"
            rel="noreferrer"
          >
            Nominatim API
          </a>{" "}
          calculate the distance in km. between two given addresses and provide
          a search history.
        </p>
      </header>
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:px-3 lg:py-10 w-full md:max-w-4xl">
        <div className="lg:col-span-2 flex flex-col align-center border-b-2 lg:border-b-0 lg:border-r-2  border-slate-300">
          <Tabs
            options={tabOptions}
            active={activeTab}
            onSelect={changeActiveTab}
          />
        </div>
        {isCalcActive && (
          <div className="lg:col-span-10 grid grid-cols-2 grid-rows-2 gap-5">
            <SearchAddress
              address={addressFrom}
              setAddress={setAddressFrom}
              title={`Desde:`}
            />
            <SearchAddress
              address={addressTo}
              setAddress={setAddressTo}
              title={`Hasta:`}
            />
            <div className="flex justify-center col-span-2">
              <Button text="Submit" onClick={handleSubmit} />
            </div>
          </div>
        )}
        {isHistoryActive && <>TODO: Search History</>}
      </section>
      <h3>{output}</h3>
    </main>
  );
}

export default App;
