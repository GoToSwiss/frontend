import { create } from 'zustand';

interface StepStore {
  step: number;
  setStep: (step: number) => void;
}

const useStepStore = create<StepStore>((set) => ({
  step: -1,
  setStep: (step: number) => set({ step }),
}));

export default useStepStore;
