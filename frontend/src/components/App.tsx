import { useState } from "react";
import axios from "axios";
import SearchAddress from "./SearchAdress/SearchAddress";

function App() {
  const [addressFrom, setAddressFrom] = useState<any>({
    properties: { display_name: "" },
  });
  const [addressTo, setAddressTo] = useState<any>({});
  const [output, setOutput] = useState<string>("");

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
    <main className="mx-auto p-5 md:container md:p-10">
      <header className="mb-3 lg:mb-5">
        <h1 className="text-3xl lg:text-5xl text-center text-red-600 font-bold mb-3 lg:mb-5">
          Distance between two addresses
        </h1>
        <h3 className="text-lg lg:text-xl text-center mb-3 lg:mb-5">
          ⚡ Spike Challenge made by Jose Javier ⚡
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
          calculate the distance in KM between two given addresses and provide a
          search query history.
        </p>
      </header>
      <div className="App-body">
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
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <h3>{output}</h3>
    </main>
  );
}

export default App;
