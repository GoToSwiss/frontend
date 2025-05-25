import React from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

import './view-center-marker.css';

type ViewCenterMarkerProps = { position: google.maps.LatLngAltitudeLiteral };
function ViewCenterMarker({ position }: ViewCenterMarkerProps) {
  return (
    <AdvancedMarker position={position} className="view-center-marker">
      <div className="circle" />
    </AdvancedMarker>
  );
}

export default ViewCenterMarker;
