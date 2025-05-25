import React, { useCallback, useEffect } from 'react';
import Supercluster, { ClusterProperties } from 'supercluster';
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import FeaturesClusterMarker from './FeaturesClusterMarker';
import FeatureMarker from './FeatureMarker';
import useSupercluster from '../hooks/use-supercluster';
import useStationStore from '../store/useStationStore';
import { MarkerFeature } from '../types/CoordType';
import usePanelStore from '../store/panel/usePanelStore';
import useInfoWindowStore from '../store/useInfoWindowStore';
import focusOnLocation from '../utils/focusOnLocation';
import use3DmapPropertyStore from '../store/use3DmapPropertyStore';

type ClusteredMarkersProps = {
  geojson: FeatureCollection<Point>;
  setNumClusters: (n: number) => void;
};

const superclusterOptions: Supercluster.Options<GeoJsonProperties, ClusterProperties> = {
  extent: 256,
  radius: 80,
  maxZoom: 12,
};

function ClusteredMarkers({ geojson, setNumClusters }: ClusteredMarkersProps) {
  const setInfowindowData = useInfoWindowStore((state) => state.setInfowindowData);
  const { clusters, getLeaves } = useSupercluster(geojson, superclusterOptions);
  const setStationName = useStationStore((state) => state.setStationName);
  const openRightPanel = usePanelStore((state) => state.openRightPanel);
  const setCameraProps = use3DmapPropertyStore((state) => state.setCameraProps);

  useEffect(() => {
    setNumClusters(clusters.length);
  }, [setNumClusters, clusters.length]);

  const handleClusterClick = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement, clusterId: number) => {
      const leaves = getLeaves(clusterId);
      focusOnLocation(leaves[0].geometry.coordinates[1], leaves[0].geometry.coordinates[0], 8);
      setInfowindowData({ anchor: marker, features: leaves as MarkerFeature[] });
      setCameraProps({
        center: {
          lat: leaves[0].geometry.coordinates[1],
          lng: leaves[0].geometry.coordinates[0],
          altitude: 1300,
        },
        range: 5000,
        heading: 80,
        tilt: 69,
        roll: 0,
      });
    },

    [getLeaves, setInfowindowData],
  );

  const handleMarkerPinClick = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement, featureId: string) => {
      const feature = clusters.find((feat) => feat.id === featureId) as Feature<Point>;

      focusOnLocation(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
      setCameraProps({
        center: {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
          altitude: 1300,
        },
        range: 5000,
        heading: 80,
        tilt: 69,
        roll: 0,
      });
      setInfowindowData({ anchor: marker, features: [feature as MarkerFeature] });
      setStationName(feature.properties?.stationName);
      openRightPanel();
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
