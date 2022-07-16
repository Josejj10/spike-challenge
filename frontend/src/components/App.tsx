import React, { useState } from "react";
import axios from "axios";
import "./App.scss";
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
    <div className="App">
      <p>Distance between addresses:</p>
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
    </div>
  );
}

export default App;
