import axios from "axios";
import "./SearchAddress.scss";
import AsyncSelect from "react-select/async";

export interface SearchAddressProps {
  title: string;
  address: any;
  setAddress: (address: any) => void;
}

function SearchAddress({ title, address, setAddress }: SearchAddressProps) {
  const getOptions = (query: string): Promise<any[]> => {
    return axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=geojson&limit=10`
      )
      .then((response: any) => {
        return response.data.features.map((address: any) => ({
          value: address,
          label: address.properties.display_name,
        }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
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
