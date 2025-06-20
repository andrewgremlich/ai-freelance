import { useNavigate } from "react-router";
import { useShallow } from "zustand/shallow";
import usePresentationStore, { selectNavigationState } from "./store.tsx";

/**
 * Custom hook for navigation that combines Zustand store navigation actions
 * with React Router navigation. This provides a clean API for components
 * that need to navigate between slides.
 */
export const useNavigation = () => {
	const navigate = useNavigate();
	const navigation = usePresentationStore(useShallow(selectNavigationState));

	const handleNext = () => {
		if (navigation.hasNextSlide) {
			const newPath = navigation.goNext();
			if (newPath) {
				navigate(newPath);
			}
		}
	};

	const handlePrev = () => {
		if (navigation.hasPrevSlide) {
			const newPath = navigation.goPrev();
			if (newPath) {
				navigate(newPath);
			}
		}
	};

	const handleDown = () => {
		if (navigation.slideHasChildren) {
			const newPath = navigation.goDown();
			if (newPath) {
				navigate(newPath);
			}
		}
	};

	const handleUp = () => {
		if (navigation.isChildSlide) {
			const newPath = navigation.goUp();
			if (newPath) {
				navigate(newPath);
			}
		}
	};

	return {
		// Navigation capabilities
		hasNextSlide: navigation.hasNextSlide,
		hasPrevSlide: navigation.hasPrevSlide,
		slideHasChildren: navigation.slideHasChildren,
		isChildSlide: navigation.isChildSlide,
		
		// Navigation actions
		goNext: handleNext,
		goPrev: handlePrev,
		goDown: handleDown,
		goUp: handleUp,
	};
};

export default useNavigation;
