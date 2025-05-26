import { useRef, useEffect } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Coords } from '../../types/CoordType';
import useMapStore from '../../store/useMapStore';

function PlaceSearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const placesLib = useMapsLibrary('places');
  const mapInstance = useMapStore((state) => state.mapInstance);
  const onPlaceSelected = (coords: Coords) => {
    if (mapInstance) {
      mapInstance.panTo(coords);
      mapInstance.setZoom(10);
    }
  };

  useEffect(() => {
    if (!placesLib || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      fields: ['geometry', 'name'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const { location } = place.geometry;
        onPlaceSelected({ lat: location.lat(), lng: location.lng() });
      }
    });
  }, [placesLib]);

  const handleManualSearch = () => {
    const query = inputRef.current?.value;
    if (!query || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === 'OK' && results?.[0].geometry?.location) {
        const { location } = results[0].geometry;
        onPlaceSelected({ lat: location.lat(), lng: location.lng() });
      }
    });
  };

  return (
    <div className="grid h-10 grid-cols-[3fr_1fr]">
      <input
        ref={inputRef}
        type="text"
        placeholder="지역 검색"
        className="rounded border px-2 py-1 text-xs shadow"
      />
      <button
        type="button"
        className="rounded bg-blue-500 px-3 py-1 text-xs text-white"
        onClick={handleManualSearch}
      >
        검색
      </button>
    </div>
  );
}

export default PlaceSearchInput;
