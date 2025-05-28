import React, { useCallback } from 'react';

import { Map3D, Map3DCameraProps } from './map-3d';

import './style.css';
import use3DmapPropertyStore from '../../store/panel/use3DmapPropertyStore';

function MapMode3D() {
  const cameraProps = use3DmapPropertyStore((state) => state.cameraProps);
  const setCameraProps = use3DmapPropertyStore((state) => state.setCameraProps);

  const handleCameraChange = useCallback(
    (props: Map3DCameraProps) => {
      setCameraProps({ ...cameraProps, ...props });
    },
    [cameraProps],
  );

  return <Map3D {...cameraProps} onCameraChange={handleCameraChange} />;
}
export default MapMode3D;
