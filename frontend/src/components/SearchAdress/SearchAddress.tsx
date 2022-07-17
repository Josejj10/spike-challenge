import axios from "axios";
import AsyncSelect from "react-select/async";
import _ from "lodash";

export interface SearchAddressProps {
  title: string;
  address: any;
  setAddress: (address: any) => void;
}

function SearchAddress({ title, address, setAddress }: SearchAddressProps) {
  // Debounce query to avoid multiple calls and to comply with the usage policy
  const searchAddresses = (query: string, callback: any) => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=geojson&limit=10`
      )
      .then((response: any) => {
        callback(null, {
          options: response.data.features.map((address: any) => ({
            value: address,
            label: address.properties.display_name,
          })),
        });
      })
      .catch((err) => console.log(err));
  };

  const debouncedSearchAddress = _.debounce(searchAddresses, 200);

  const getOptions = (query: string, callback: any) => {
    if (_.isEmpty(query)) return callback(null, { options: [] });

    // call debounced query
    return debouncedSearchAddress(query, callback);
  };

  return (
    <div className="">
      <header className="">
        <div>
          <label htmlFor="char-input">{title}</label>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={getOptions}
            onChange={setAddress}
            value={address}
          />
        </div>
      </header>
    </div>
  );
}

export default SearchAddress;
