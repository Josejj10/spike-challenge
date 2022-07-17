import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  IDistanceQuery,
  mapDistanceQuery,
} from "../../interfaces/distance-query.interface";
import Button from "../Button/Button";
import DistanceResult from "../DistanceResult/DistanceResult";

function SearchHistory() {
  const [searchHistory, setSearchHistory] = useState<IDistanceQuery[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/distance?page=${page}`)
      .then((res) => {
        setSearchHistory(
          res.data?.results.map((dq: any) => mapDistanceQuery(dq)) || []
        );
      })
      .catch((err) => console.log(err));
  }, [page]);

  const getSearchHistory = () => {
    setPage(page + 1);
  };

  return (
    <div className="grid grid-cols-1 gap-5">
      {searchHistory.length > 0 && (
        <InfiniteScroll
          dataLength={searchHistory.length} //This is important field to render the next data
          next={getSearchHistory}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {searchHistory.map((distanceQuery: IDistanceQuery) => (
            <DistanceResult distanceQuery={distanceQuery} />
          ))}
        </InfiniteScroll>
      )}
      {searchHistory.length === 0 && (
        <div className="flex flex-col max-w-xs items-center mx-auto justify-center">
          <p className="mb-3">No searches yet.</p>
          <Button text="Make a search!" />
        </div>
      )}
    </div>
  );
}

export default SearchHistory;
