import { useMemo } from "react";
import { IDistanceQuery } from "../../interfaces/distance-query.interface";
import LinkUrl from "../Link/Link";

export interface DistanceResultProps {
  distanceQuery: IDistanceQuery;
}

function DistanceResult({ distanceQuery }: DistanceResultProps) {
  const googleMapsUrl = useMemo(
    () =>
      `https://www.google.com/maps/dir/${distanceQuery?.addressFrom?.latitude},${distanceQuery?.addressFrom?.longitude}/${distanceQuery?.addressTo?.latitude},${distanceQuery?.addressTo?.longitude}`,
    [distanceQuery]
  );

  return (
    <section className="rounded-lg bg-white p-5 shadow-md">
      <div className="grid grid-cols-8">
        <aside className="col-span-3 flex flex-col items-center justify-center">
          <div>
            <h3 className="text-lg">Distance:</h3>
            <p className="text-lg">
              <span className="text-2xl font-bold text-red-500">
                {distanceQuery.distance.toFixed(2)}
              </span>{" "}
              km.
            </p>
          </div>
        </aside>
        <section className="col-span-5">
          <>
            <span className="font-bold">From: </span>
            <p className="overflow">{distanceQuery.addressFrom.name}</p>
          </>
          <div className="mt-2">
            <span className="font-bold">To: </span>
            <p className="overflow">{distanceQuery.addressTo.name}</p>
          </div>
        </section>
      </div>
      <footer className="mt-5 flex justify-between gap-5 items-baseline text-sm">
        <span>Request made at: {distanceQuery.time}</span>
        <LinkUrl url={googleMapsUrl} text="View in Google Maps." />
      </footer>
    </section>
  );
}

export default DistanceResult;
