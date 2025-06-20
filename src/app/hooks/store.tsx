import { create } from "zustand";
import type { Direction } from "../types/slide.ts";

interface PresentationStore {
	spellTrigger: boolean;
	transitionDirection: Direction;
	spellEffectsEnabled: boolean;
	toggleSpellEffectsEnabled: () => void;
	toggleSpellTrigger: () => void;
	setTransitionDirection: (direction: Direction) => void;
}

const usePresentationStore = create<PresentationStore>((set) => ({
	spellTrigger: false,
	transitionDirection: { axis: "horizontal", forward: true },
	spellEffectsEnabled: false,
	toggleSpellEffectsEnabled: () =>
		set((state) => ({ spellEffectsEnabled: !state.spellEffectsEnabled })),
	toggleSpellTrigger: () =>
		set((state) => ({ spellTrigger: !state.spellTrigger })),
	setTransitionDirection: (direction) =>
		set(() => ({ transitionDirection: direction })),
}));

export default usePresentationStore;
