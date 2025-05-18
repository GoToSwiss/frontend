import React, { useCallback, useEffect } from 'react';
import Supercluster, { ClusterProperties } from 'supercluster';
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import FeaturesClusterMarker from './FeaturesClusterMarker';
import FeatureMarker from './FeatureMarker';
import useSupercluster from '../hooks/use-supercluster';
import useStationStore from '../store/useStationStore';
import { MarkerFeature } from '../types/CoordType';

type ClusteredMarkersProps = {
  geojson: FeatureCollection<Point>;
  setNumClusters: (n: number) => void;
  setInfowindowData: (
    data: {
      anchor: google.maps.marker.AdvancedMarkerElement;
      features: MarkerFeature[];
    } | null,
  ) => void;
};

const superclusterOptions: Supercluster.Options<GeoJsonProperties, ClusterProperties> = {
  extent: 256,
  radius: 80,
  maxZoom: 12,
};

function ClusteredMarkers({ geojson, setNumClusters, setInfowindowData }: ClusteredMarkersProps) {
  const { clusters, getLeaves } = useSupercluster(geojson, superclusterOptions);
  const setStationName = useStationStore((state) => state.setStationName);

  useEffect(() => {
    setNumClusters(clusters.length);
  }, [setNumClusters, clusters.length]);

  const handleClusterClick = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement, clusterId: number) => {
      const leaves = getLeaves(clusterId);
      setInfowindowData({ anchor: marker, features: leaves as MarkerFeature[] });
    },
    [getLeaves, setInfowindowData],
  );

  const handleMarkerPinClick = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement, featureId: string) => {
      const feature = clusters.find((feat) => feat.id === featureId) as Feature<Point>;
      console.log('feature', feature);
      setInfowindowData({ anchor: marker, features: [feature as MarkerFeature] });
      setStationName(feature.properties?.stationName);
    },
    [clusters, setInfowindowData],
  );

  return (
    <>
      {clusters.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates;

        const clusterProperties = feature.properties as ClusterProperties;
        const isCluster: boolean = clusterProperties.cluster;

        return isCluster ? (
          <FeaturesClusterMarker
            key={feature.id}
            clusterId={clusterProperties.cluster_id}
            position={{ lat, lng }}
            size={clusterProperties.point_count}
            sizeAsText={String(clusterProperties.point_count_abbreviated)}
            onMarkerClick={handleClusterClick}
          />
        ) : (
          <FeatureMarker
            key={feature.id}
            featureId={feature.id as string}
            position={{ lat, lng }}
            onMarkerClick={handleMarkerPinClick}
          />
        );
      })}
    </>
  );
}

export default ClusteredMarkers;
