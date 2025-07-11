import type { Location } from "react-router";
import { create } from "zustand";
import slides from "../slides/index.tsx";
import type { Direction, Slide } from "../types/slide.ts";

interface PresentationStore {
	// Core state
	spellTrigger: boolean;
	transitionDirection: Direction;
	spellEffectsEnabled: boolean;
	currentParentSlideIndex: number;
	currentChildIndex: number;

	// Basic Actions
	toggleSpellEffectsEnabled: () => void;
	toggleSpellTrigger: () => void;
	setTransitionDirection: (direction: Direction) => void;
	setCurrentSlideFromLocation: (location: Location) => void;
	navigateToSlide: (parentIndex: number, childIndex?: number) => void;

	// Navigation Actions
	goNext: () => string | null; // Returns new path or null if can't navigate
	goPrev: () => string | null;
	goDown: () => string | null;
	goUp: () => string | null;

	// Computed getters (derived state)
	getCurrentParentSlide: () => Slide;
	getIsChildSlide: () => boolean;
	getSlideHasChildren: () => boolean;
	getHasNextSlide: () => boolean;
	getHasPrevSlide: () => boolean;
	getCurrentPath: () => string;
}

const usePresentationStore = create<PresentationStore>((set, get) => ({
	// Core state
	spellTrigger: false,
	transitionDirection: { axis: "horizontal", forward: true },
	spellEffectsEnabled: false,
	currentParentSlideIndex: 0,
	currentChildIndex: -1, // -1 indicates we're on parent slide

	// Actions
	toggleSpellEffectsEnabled: () =>
		set((state) => ({ spellEffectsEnabled: !state.spellEffectsEnabled })),
	toggleSpellTrigger: () =>
		set((state) => ({ spellTrigger: !state.spellTrigger })),
	setTransitionDirection: (direction) =>
		set({ transitionDirection: direction }),

	setCurrentSlideFromLocation: (location: Location) => {
		const currentParentSlideIndex = slides.findIndex((s) =>
			location.pathname.includes(s.path),
		);

		if (currentParentSlideIndex === -1) return; // Path not found

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

		set({
			currentParentSlideIndex,
			currentChildIndex,
		});
	},

	navigateToSlide: (parentIndex: number, childIndex = -1) => {
		set({
			currentParentSlideIndex: parentIndex,
			currentChildIndex: childIndex,
		});
	},

	// Navigation Actions
	goNext: () => {
		const state = get();
		const isChildSlide = state.currentChildIndex >= 0;
		const currentParentSlide = slides[state.currentParentSlideIndex];

		// Check if we can navigate next
		if (isChildSlide && currentParentSlide?.children) {
			const nextChildIndex = state.currentChildIndex + 1;
			if (nextChildIndex < currentParentSlide.children.length) {
				set({
					currentChildIndex: nextChildIndex,
					transitionDirection: { axis: "horizontal", forward: true },
				});
				const childSlide = currentParentSlide.children[nextChildIndex];
				return `${currentParentSlide.path}${childSlide.path}`;
			}
		} else if (state.currentParentSlideIndex < slides.length - 1) {
			const nextParentIndex = state.currentParentSlideIndex + 1;
			set({
				currentParentSlideIndex: nextParentIndex,
				currentChildIndex: -1,
				transitionDirection: { axis: "horizontal", forward: true },
			});
			return slides[nextParentIndex].path;
		}

		return null; // Can't navigate
	},

	goPrev: () => {
		const state = get();
		const isChildSlide = state.currentChildIndex >= 0;
		const currentParentSlide = slides[state.currentParentSlideIndex];

		// Check if we can navigate previous
		if (isChildSlide) {
			const prevChildIndex = state.currentChildIndex - 1;
			if (prevChildIndex >= 0 && currentParentSlide?.children) {
				set({
					currentChildIndex: prevChildIndex,
					transitionDirection: { axis: "horizontal", forward: false },
				});
				const childSlide = currentParentSlide.children[prevChildIndex];
				return `${currentParentSlide.path}${childSlide.path}`;
			}
		} else if (state.currentParentSlideIndex > 0) {
			const prevParentIndex = state.currentParentSlideIndex - 1;
			set({
				currentParentSlideIndex: prevParentIndex,
				currentChildIndex: -1,
				transitionDirection: { axis: "horizontal", forward: false },
			});
			return slides[prevParentIndex].path;
		}

		return null; // Can't navigate
	},

	goDown: () => {
		const state = get();
		const currentParentSlide = slides[state.currentParentSlideIndex];

		// Check if current slide has children and we're not already in a child
		if (
			currentParentSlide?.children &&
			currentParentSlide.children.length > 0 &&
			state.currentChildIndex === -1
		) {
			set({
				currentChildIndex: 0,
				transitionDirection: { axis: "vertical", forward: true },
			});
			const firstChild = currentParentSlide.children[0];
			return `${currentParentSlide.path}${firstChild.path}`;
		}

		return null; // Can't navigate down
	},

	goUp: () => {
		const state = get();
		const currentParentSlide = slides[state.currentParentSlideIndex];

		// Check if we're in a child slide
		if (state.currentChildIndex >= 0) {
			set({
				currentChildIndex: -1,
				transitionDirection: { axis: "vertical", forward: false },
			});
			return currentParentSlide?.path || "/";
		}

		return null; // Can't navigate up
	},

	// Computed getters (derived state)
	getCurrentParentSlide: () => {
		const state = get();
		return slides[state.currentParentSlideIndex] || slides[0];
	},

	getIsChildSlide: () => {
		const state = get();
		return state.currentChildIndex >= 0;
	},

	getSlideHasChildren: () => {
		const state = get();
		const currentSlide = slides[state.currentParentSlideIndex];
		return !!(currentSlide?.children && currentSlide.children.length > 0);
	},

	getHasNextSlide: () => {
		const state = get();
		const isChildSlide = state.currentChildIndex >= 0;
		const currentParentSlide = slides[state.currentParentSlideIndex];

		if (isChildSlide && currentParentSlide?.children) {
			return state.currentChildIndex < currentParentSlide.children.length - 1;
		}
		return state.currentParentSlideIndex < slides.length - 1;
	},

	getHasPrevSlide: () => {
		const state = get();
		const isChildSlide = state.currentChildIndex >= 0;

		if (isChildSlide) {
			return state.currentChildIndex > 0;
		}
		return state.currentParentSlideIndex > 0;
	},

	getCurrentPath: () => {
		const state = get();
		const currentParentSlide = slides[state.currentParentSlideIndex];

		if (state.currentChildIndex >= 0 && currentParentSlide?.children) {
			const childSlide = currentParentSlide.children[state.currentChildIndex];
			return `${currentParentSlide.path}${childSlide.path}`;
		}

		return currentParentSlide?.path || "/";
	},
}));
// Selector functions for better performance and reusability
export const selectPresentationState = (state: PresentationStore) => ({
	spellTrigger: state.spellTrigger,
	transitionDirection: state.transitionDirection,
	spellEffectsEnabled: state.spellEffectsEnabled,
	currentParentSlideIndex: state.currentParentSlideIndex,
	currentChildIndex: state.currentChildIndex,

	// Computed values
	currentParentSlide: state.getCurrentParentSlide(),
	isChildSlide: state.getIsChildSlide(),
	slideHasChildren: state.getSlideHasChildren(),
	hasNextSlide: state.getHasNextSlide(),
	hasPrevSlide: state.getHasPrevSlide(),
	currentPath: state.getCurrentPath(),

	// Actions
	toggleSpellEffectsEnabled: state.toggleSpellEffectsEnabled,
	toggleSpellTrigger: state.toggleSpellTrigger,
	setTransitionDirection: state.setTransitionDirection,
	setCurrentSlideFromLocation: state.setCurrentSlideFromLocation,
	navigateToSlide: state.navigateToSlide,

	// Navigation actions
	goNext: state.goNext,
	goPrev: state.goPrev,
	goDown: state.goDown,
	goUp: state.goUp,
});

// Individual selectors for specific needs
export const selectNavigationState = (state: PresentationStore) => ({
	hasNextSlide: state.getHasNextSlide(),
	hasPrevSlide: state.getHasPrevSlide(),
	slideHasChildren: state.getSlideHasChildren(),
	isChildSlide: state.getIsChildSlide(),
	// Navigation actions
	goNext: state.goNext,
	goPrev: state.goPrev,
	goDown: state.goDown,
	goUp: state.goUp,
});

export const selectEffectsState = (state: PresentationStore) => ({
	spellTrigger: state.spellTrigger,
	spellEffectsEnabled: state.spellEffectsEnabled,
	transitionDirection: state.transitionDirection,
	toggleSpellEffectsEnabled: state.toggleSpellEffectsEnabled,
	toggleSpellTrigger: state.toggleSpellTrigger,
	setTransitionDirection: state.setTransitionDirection,
});

export default usePresentationStore;
