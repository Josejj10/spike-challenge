import axios from "axios";
import { useMemo, useState } from "react";
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
  const [touched, setTouched] = useState(false);

  const hasSubmitErrors = useMemo(() => {
    if (!touched) return false;
    return !addressFrom.value || !addressTo.value;
  }, [addressFrom, addressTo, touched]);

  const handleSubmit = () => {
    if (!touched) setTouched(true);
    if (!addressFrom.value || !addressTo.value) return;
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
      <p className="col-span-2">
        To calculate a distance, just search for your two addresses and submit:
      </p>
      <div className="col-span-2 lg:col-span-1">
        <SearchAddress
          address={addressFrom}
          setAddress={setAddressFrom}
          title={`Starting Address:`}
        />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <SearchAddress
          address={addressTo}
          setAddress={setAddressTo}
          title={`End Address:`}
        />
      </div>
      <div className="flex flex-col justify-center items-center col-span-2">
        <Button text="Submit" onClick={handleSubmit} />
        {hasSubmitErrors && (
          <div className="text-red-700">
            Both addresses should be selected to submit.
          </div>
        )}
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
