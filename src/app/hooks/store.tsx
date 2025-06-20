import type { Location } from "react-router";
import { create } from "zustand";

import type { Direction, Slide } from "../types/slide.ts";
import slides from "../slides/index.tsx";

interface PresentationStore {
	spellTrigger: boolean;
	transitionDirection: Direction;
	spellEffectsEnabled: boolean;
	currentParentSlideIndex: number;
	currentChildIndex: number;
	slideHasChildren: boolean;
	isChildSlide: boolean;
	currentParentSlide: Slide;
	hasNextSlide: boolean;
	hasPrevSlide: boolean;
	toggleSpellEffectsEnabled: () => void;
	toggleSpellTrigger: () => void;
	setTransitionDirection: (direction: Direction) => void;
	findCurrentSlidesState: (location: Location) => void;
	doesSlideHasChildren: () => void;
}

const usePresentationStore = create<PresentationStore>((set) => ({
	spellTrigger: false,
	transitionDirection: { axis: "horizontal", forward: true },
	spellEffectsEnabled: false,
	currentParentSlideIndex: 0,
	currentChildIndex: 0,
	slideHasChildren: false,
	isChildSlide: false,
	currentParentSlide: slides[0],
	hasNextSlide: false,
	hasPrevSlide: false,
	toggleSpellEffectsEnabled: () =>
		set((state) => ({ spellEffectsEnabled: !state.spellEffectsEnabled })),
	toggleSpellTrigger: () =>
		set((state) => ({ spellTrigger: !state.spellTrigger })),
	setTransitionDirection: (direction) =>
		set({ transitionDirection: direction }),
	findCurrentSlidesState: (location) =>
		set(() => {
			const currentParentSlideIndex = slides.findIndex((s) =>
				location.pathname.includes(s.path),
			);
			const currentParentSlide = slides[currentParentSlideIndex];
			const currentPathParts = location.pathname.split("/");
			const isChildSlide = currentPathParts.length > 2;
			const currentChildIndex =
				isChildSlide && currentParentSlide?.children
					? currentParentSlide.children.findIndex(
							(child: Slide) =>
								child.path ===
								`/${currentPathParts[currentPathParts.length - 1]}`,
						)
					: -1;

			return {
				currentParentSlide,
				currentParentSlideIndex,
				isChildSlide,
				currentChildIndex,
				hasNextSlide: isChildSlide
					? currentChildIndex < (currentParentSlide?.children?.length ?? 0) - 1
					: !!slides[currentParentSlideIndex + 1],
				hasPrevSlide: isChildSlide
					? currentChildIndex > 0
					: !!slides[currentParentSlideIndex - 1],
			};
		}),
	doesSlideHasChildren: () =>
		set((state) => ({
			slideHasChildren:
				!!slides[state.currentParentSlideIndex] &&
				(slides[state.currentParentSlideIndex].children?.length ?? 0) > 0,
		})),
}));
export const state = usePresentationStore.getState();

export default usePresentationStore;
