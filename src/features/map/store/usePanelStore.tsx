import { create } from 'zustand';

type PanelState = {
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  openLeftPanel: () => void;
  openRightPanel: () => void;
  closeLeftPanel: () => void;
  closeRightPanel: () => void;
  setLeftPanel: (open: boolean) => void;
  setRightPanel: (open: boolean) => void;
};

const usePanelStore = create<PanelState>((set) => ({
  leftPanelOpen: true,
  rightPanelOpen: false,
  openLeftPanel: () => set(() => ({ leftPanelOpen: true })),
  openRightPanel: () => set(() => ({ rightPanelOpen: true })),
  closeLeftPanel: () => set(() => ({ leftPanelOpen: false })),
  closeRightPanel: () => set(() => ({ rightPanelOpen: false })),
  setLeftPanel: (open) => set({ leftPanelOpen: open }),
  setRightPanel: (open) => set({ rightPanelOpen: open }),
}));

export default usePanelStore;
