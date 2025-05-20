import Mapping from './Mapping';
import ChartFilter from './ChartFilter';
import DataFilter from './DataFilter';
import useStepStore from '../store/useStepStore';

export default function Step() {
  const step = useStepStore((state) => state.step);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Mapping />;
      case 1:
        return <ChartFilter />;
      case 2:
        return <DataFilter />;
      default:
        return <div>완료</div>;
    }
  };

  return <div>{renderStep()}</div>;
}
