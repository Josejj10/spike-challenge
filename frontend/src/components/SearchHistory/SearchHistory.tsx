import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  IDistanceQuery,
  mapDistanceQuery,
} from "../../interfaces/distance-query.interface";
import Button from "../Button/Button";
import DistanceResult from "../DistanceResult/DistanceResult";

interface SearchHistoryProps {
  changeTab: () => void;
}

function SearchHistory({ changeTab }: SearchHistoryProps) {
  const [searchHistory, setSearchHistory] = useState<IDistanceQuery[]>([]);
  const [page, setPage] = useState(1);
  const [nextPageExists, setNextPageExists] = useState(true);

  useEffect(() => {
    if (!nextPageExists) return;
    axios
      .get(`/api/distance?page=${page}`)
      .then((res) => {
        setSearchHistory((prev) => [
          ...prev,
          ...res.data?.results.map((dq: any) => mapDistanceQuery(dq)),
        ]);
        setNextPageExists(res.data?.next ? true : false);
      })
      .catch((err) => console.log(err));
  }, [page, nextPageExists]);

  const getSearchHistory = () => {
    setPage(page + 1);
  };

  return (
    <div className="">
      {searchHistory.length > 0 && (
        <InfiniteScroll
          className="grid grid-cols-1 gap-5"
          dataLength={searchHistory.length}
          next={getSearchHistory}
          hasMore={nextPageExists}
          loader={<></>}
          endMessage={
            <p className="text-center">
              <b>End of search history.</b>
            </p>
          }
        >
          {searchHistory.map((distanceQuery: IDistanceQuery) => (
            <DistanceResult
              distanceQuery={distanceQuery}
              key={distanceQuery.id}
            />
          ))}
        </InfiniteScroll>
      )}
      {searchHistory.length === 0 && (
        <div className="flex flex-col max-w-xs items-center mx-auto justify-center">
          <p className="mb-3">No searches yet.</p>
          <Button text="Make a search!" onClick={changeTab} />
        </div>
      )}
    </div>
  );
}

export default SearchHistory;
