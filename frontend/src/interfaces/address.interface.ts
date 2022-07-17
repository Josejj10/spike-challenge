export interface IAddress {
  osmId: string;
  name: string;
  bbox: number[];
  longitude: number;
  latitude: number;
  geoType: string;
  osmType: string;
  placeId: number;
  placeRank: number;
  category: string;
  importance: number;
  type: string;
}

export const mapAddress = (data: any): IAddress => {
  return {
    osmId: data?.properties?.osm_id,
    name: data?.properties?.display_name,
    bbox: data?.bbox,
    longitude: data?.geometry?.coordinates[0],
    latitude: data?.geometry?.coordinates[1],
    geoType: data.geometry?.type,
    osmType: data?.properties?.osm_type,
    placeId: data?.properties?.place_id,
    placeRank: data?.properties?.place_rank,
    category: data?.properties?.category,
    importance: data?.properties?.importance,
    type: data?.properties?.type,
  };
};
