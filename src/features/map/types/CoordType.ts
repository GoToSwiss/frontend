import { Feature, FeatureCollection, Point } from 'geojson';

export type Coords = { lat: number; lng: number };

export type MarkerData = { id: number; lat: number; lng: number; stationName: string };

export type MarkerFeatureProps = {
  stationName: string;
};

export type MarkerGeojson = FeatureCollection<Point, MarkerFeatureProps>;
export type MarkerFeature = Feature<Point, MarkerFeatureProps>;
