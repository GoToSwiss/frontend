import { useEffect, useRef } from 'react';

const cameraPropNames = ['center', 'range', 'heading', 'tilt', 'roll'] as const;

type Map3DCameraProps = {
  center: google.maps.LatLngAltitudeLiteral;
  range: number;
  heading: number;
  tilt: number;
  roll: number;
};

const DEFAULT_CAMERA_PROPS: Map3DCameraProps = {
  center: { lat: 0, lng: 0, altitude: 0 },
  range: 0,
  heading: 0,
  tilt: 0,
  roll: 0,
};

/**
 * Binds event-listeners for all camera-related events to the Map3dElement.
 * The values from the events are aggregated into a Map3DCameraProps object,
 * and changes are dispatched via the onCameraChange callback.
 */
function useMap3DCameraEvents(
  mapEl?: google.maps.maps3d.Map3DElement | null,
  onCameraChange?: (cameraProps: Map3DCameraProps) => void,
) {
  const cameraPropsRef = useRef<Map3DCameraProps>(DEFAULT_CAMERA_PROPS);
  const updateQueuedRef = useRef(false);

  useEffect(() => {
    if (!mapEl) return;

    const cleanupFns: (() => void)[] = [];

    cameraPropNames.forEach((p) => {
      const removeListener = addDomListener(mapEl, `gmp-${p}change`, () => {
        const newValue = mapEl[p];

        if (newValue == null) return;

        if (p === 'center') {
          cameraPropsRef.current.center = (newValue as google.maps.LatLngAltitude).toJSON();
        } else {
          cameraPropsRef.current[p] = newValue as number;
        }

        if (onCameraChange && !updateQueuedRef.current) {
          updateQueuedRef.current = true;

          queueMicrotask(() => {
            updateQueuedRef.current = false;
            onCameraChange(cameraPropsRef.current);
          });
        }
      });

      cleanupFns.push(removeListener);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [mapEl, onCameraChange]);
}

export default useMap3DCameraEvents;

/**
 * Adds an event-listener and returns a function to remove it again.
 */
function addDomListener(
  element: google.maps.maps3d.Map3DElement,
  type: string,
  listener: (this: google.maps.maps3d.Map3DElement, ev: unknown) => void,
): () => void {
  element.addEventListener(type, listener);
  return () => {
    element.removeEventListener(type, listener);
  };
}
