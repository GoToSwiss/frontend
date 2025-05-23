import AirSelection from './AirSelection';
import MeanAirInformation from './MeanAirInformation';
import useStationStore from '../store/useStationStore';
import AirLineChart from './AirLineChart';

function RightPanelContent() {
  const { stationName } = useStationStore();
  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">{stationName} 관측소</h1>
      <AirSelection />
      <AirLineChart />
      <MeanAirInformation />
    </div>
  );
}

export default RightPanelContent;
