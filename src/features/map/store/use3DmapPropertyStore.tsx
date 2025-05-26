import { create } from 'zustand';

export interface LatLngAltitude {
  lat: number;
  lng: number;
  altitude: number;
}

export interface CameraViewProps {
  center: LatLngAltitude;
  range: number;
  heading: number;
  tilt: number;
  roll: number;
}

interface CameraViewState {
  cameraProps: CameraViewProps;
  setCameraProps: (newProps: CameraViewProps) => void;
}

const INITIAL_CAMERA_PROPS: CameraViewProps = {
  center: { lat: 37.72809, lng: -119.64473, altitude: 1300 },
  range: 5000,
  heading: 61,
  tilt: 69,
  roll: 0,
};

const use3DMapCameraStore = create<CameraViewState>((set) => ({
  cameraProps: INITIAL_CAMERA_PROPS,
  setCameraProps: (newProps) => set({ cameraProps: newProps }),
}));

export default use3DMapCameraStore;
