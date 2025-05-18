import { useState } from 'react';
import Mapping from './Mapping';
import ChartFilter from './ChartFilter';
import DataFilter from './DataFilter';

export default function Step() {
  const [step, setStep] = useState(0);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Mapping />;
      case 1:
        return <ChartFilter />;
      default:
        return <DataFilter />;
    }
  };

  return (
    <div>
      {renderStep()}
      <button onClick={() => setStep(step + 1)}>{step === 2 ? '완료' : 'Next'}</button>
    </div>
  );
}
