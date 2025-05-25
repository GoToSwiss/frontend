import AirSelection from './AirSelection';
import MeanAirInformation from './MeanAirInformation';
import useStationStore from '../../store/useStationStore';
import AirLineChart from './AirLineChart';
import useDateRangeStore from '../../store/useDateRangeStore';
import PredAirSelection from './PredAirSelection';
import PredAirLineChart from './PredAirLineChart';
import PredMeanAirInformation from './PredMeanAirInformation';

function RightPanelContent() {
  const { stationName } = useStationStore();
  const { dateRange } = useDateRangeStore();
  const [startDate, endDate] = dateRange;

  const isAll2023 = startDate.getFullYear() === 2023 && endDate.getFullYear() === 2023;

  return (
    <div className="w-100 absolute right-4 top-11 z-10 h-[90%] space-y-6 overflow-y-auto rounded-lg bg-white p-4 shadow-md">
      <div className="space-y-6">
        <h1 className="text-lg font-semibold">{stationName} 관측소</h1>

        {isAll2023 ? (
          <>
            <PredAirSelection />
            <PredAirLineChart />
            <PredMeanAirInformation />
          </>
        ) : (
          <>
            <AirSelection />
            <AirLineChart />
            <MeanAirInformation />
          </>
        )}
      </div>
    </div>
  );
}

export default RightPanelContent;
