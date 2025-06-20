import { useNavigation } from "../hooks/useNavigation.tsx";

/**
 * Example component showing how to use the navigation system
 * in other parts of your application
 */
export const SimpleNavigationExample = () => {
	const navigation = useNavigation();

	return (
		<div style={{ position: "fixed", bottom: 20, right: 20, background: "rgba(0,0,0,0.8)", padding: 10, borderRadius: 8 }}>
			<button
				type="button"
				onClick={navigation.goUp}
				disabled={!navigation.isChildSlide}
				style={{ marginRight: 5 }}
			>
				↑ Up
			</button>
			<br />
			<button
				type="button"
				onClick={navigation.goPrev}
				disabled={!navigation.hasPrevSlide}
				style={{ marginRight: 5 }}
			>
				← Prev
			</button>
			<button
				type="button"
				onClick={navigation.goDown}
				disabled={!navigation.slideHasChildren}
				style={{ marginRight: 5 }}
			>
				↓ Down
			</button>
			<button
				type="button"
				onClick={navigation.goNext}
				disabled={!navigation.hasNextSlide}
			>
				Next →
			</button>
		</div>
	);
};
