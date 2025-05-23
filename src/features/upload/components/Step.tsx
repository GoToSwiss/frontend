import ChartFilter from './filter/ChartFilter';
import DataFilter from './filter/DataFilter';
import useStepStore from '../store/useStepStore';

const stepComponent: Record<number, React.FC> = {
  0: ChartFilter,
  1: DataFilter,
};

export default function Step() {
  const step = useStepStore((state) => state.step);

  const SelectedStepComponent = stepComponent[step];
  if (!SelectedStepComponent) return null;

  return <SelectedStepComponent />;
}
