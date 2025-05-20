import ChartFilter from './filter/ChartFilter';
import DataFilter from './filter/DataFilter';
import useStepStore from '../store/useStepStore';
import useFileStore from '../store/useFileStore';

export default function Step() {
  const step = useStepStore((state) => state.step);
  const uploadedData = useFileStore((state) => state.uploadedData);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <ChartFilter />;
      case 1:
        return <DataFilter />;
      default:
        return <div />;
    }
  };

  return <div>{uploadedData.length === 0 ? <div /> : <div>{renderStep()}</div>}</div>;
}
