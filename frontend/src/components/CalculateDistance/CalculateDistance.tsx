import axios from "axios";
import { useState } from "react";
import {
  IDistanceQuery,
  mapDistanceQuery,
} from "../../interfaces/distance-query.interface";
import Button from "../Button/Button";
import DistanceResult from "../DistanceResult/DistanceResult";
import SearchAddress from "../SearchAdress/SearchAddress";

function CalculateDistance() {
  const [addressFrom, setAddressFrom] = useState<any>({});
  const [addressTo, setAddressTo] = useState<any>({});
  const [distanceQuery, setDistanceQuery] = useState<IDistanceQuery>();

  const handleSubmit = () => {
    if (!addressFrom || !addressTo) return;
    axios
      .post(`/api/distance`, {
        addressFrom: addressFrom.value,
        addressTo: addressTo.value,
      })
      .then((res) => {
        setDistanceQuery(mapDistanceQuery(res.data));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="grid grid-cols-2 gap-5">
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
      {distanceQuery && (
        <div className="col-span-2">
          <DistanceResult distanceQuery={distanceQuery} />
        </div>
      )}
    </div>
  );
}

export default CalculateDistance;
