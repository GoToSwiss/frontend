import { Status, Wrapper } from '@googlemaps/react-wrapper';
import Map from '@/pages/Map';

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <Map />;
    default:
      return <>에러발생</>;
  }
};

function GoogleMapContainer() {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_MAP_API as string}
      render={render}
      libraries={['marker']}
    />
  );
}

export default GoogleMapContainer;
