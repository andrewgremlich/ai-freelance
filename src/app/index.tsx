import "summit-kit/styles";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router";
import { PageTurner, useAudio, useKeyPress } from "summit-kit/client";
import { v4 } from "uuid";

import { Fireworks } from "./components/Fireworks.tsx";
import { KeyboardGuide } from "./components/KeyboardGuide.tsx";
import { NavigationMap } from "./components/NavigationMap.tsx";
import { ProgressIndicator } from "./components/ProgressIndicator.tsx";
import { SlideExplorer } from "./components/SlideExplorer.tsx";
import { SpeakerNotes } from "./components/SpeakerNotes.tsx";
import { SpellCast } from "./components/SpellCast.tsx";
import { TogglePresentation } from "./components/TogglePresentation.tsx";
import { useWhooshes } from "./hooks/useWhooshes.tsx";
import slides, { flattenedSlides } from "./slides/index.tsx";
import usePresentationStore from "./hooks/store.tsx";
import { useShallow } from "zustand/shallow";
// import { ConnectToController } from "./components/ConnectToController.tsx";

function App() {
	console.log("APP RENDERING");

	const store = usePresentationStore(
		useShallow((state) => ({
			spellTrigger: state.spellTrigger,
			transitionDirection: state.transitionDirection,
			spellEffectsEnabled: state.spellEffectsEnabled,
			currentParentSlideIndex: state.currentParentSlideIndex,
			slideHasChildren: state.slideHasChildren,
			isChildSlide: state.isChildSlide,
			currentParentSlide: state.currentParentSlide,
			currentChildIndex: state.currentChildIndex,
			hasNextSlide: state.hasNextSlide,
			hasPrevSlide: state.hasPrevSlide,
			toggleSpellEffectsEnabled: state.toggleSpellEffectsEnabled,
			setTransitionDirection: state.setTransitionDirection,
			toggleSpellTrigger: state.toggleSpellTrigger,
			findCurrentSlidesState: state.findCurrentSlidesState,
			doesSlideHasChildren: state.doesSlideHasChildren,
		})),
	);
	const { whooshIncrement, whooshSrc } = useWhooshes({ amount: 2 });
	const { play: playTestSound } = useAudio({
		src: "test_tap_mic.webm",
		volume: 1,
	});
	const { play: activateMagic } = useAudio({
		src: "magic-activate.webm",
		volume: 1,
	});
	const { play, stop, seek } = useAudio({
		src: "beat_outro.webm", // seek to 0:47 // use for intro too?
		volume: 1,
		fadeInDuration: 30,
	});
	const {
		setStereo,
		setVolume: setWhooshVolume,
		volume,
	} = useAudio({
		src: whooshSrc,
		volume: 0,
		stereo: 0,
		autoplay: true,
	});
	const location = useLocation();
	const navigate = useNavigate();

	store.findCurrentSlidesState(location);
	store.doesSlideHasChildren();

	// Toggle spell effects and volume with Control+Shift+M
	useKeyPress([
		{
			shortcutKey: "Control+Shift+M",
			action: () => {
				if (!store.spellEffectsEnabled) {
					activateMagic();
				}
				setWhooshVolume(volume === 0 ? 1 : 0);
				store.toggleSpellEffectsEnabled();
			},
		},
		{
			shortcutKey: "Control+Shift+T",
			action: () => playTestSound(),
		},
	]);

	const currentPathParts = location.pathname.split("/");

	const goNext = async () => {
		if (store.hasNextSlide) {
			setStereo(1);
			store.toggleSpellTrigger();
			setTimeout(() => store.toggleSpellTrigger(), 100); // Reset trigger after short delay
			whooshIncrement();

			store.setTransitionDirection({
				axis: "horizontal",
				forward: true,
			});

			// If we're on a child slide, navigate to the next child
			if (store.isChildSlide && store.currentParentSlide?.children) {
				const nextChildIndex = store.currentChildIndex + 1;
				if (nextChildIndex < store.currentParentSlide.children.length) {
					const nextChildPath =
						store.currentParentSlide.children[nextChildIndex].path;
					navigate(`${store.currentParentSlide.path}${nextChildPath}`);
				}
			} else {
				// Regular navigation to next parent slide
				navigate(slides[store.currentParentSlideIndex + 1].path);
			}
		}
	};

	const goPrev = async () => {
		if (store.hasPrevSlide) {
			setStereo(-1);
			store.toggleSpellTrigger();
			setTimeout(() => store.toggleSpellTrigger(), 100); // Reset trigger after short delay
			whooshIncrement();

			store.setTransitionDirection({
				axis: "horizontal",
				forward: false,
			});

			// If we're on a child slide, navigate to the previous child
			if (store.isChildSlide && store.currentParentSlide?.children) {
				const prevChildIndex = store.currentChildIndex - 1;
				if (prevChildIndex >= 0) {
					const prevChildPath =
						store.currentParentSlide.children[prevChildIndex].path;
					navigate(`${store.currentParentSlide.path}${prevChildPath}`);
				}
			} else {
				// Regular navigation to previous parent slide
				navigate(slides[store.currentParentSlideIndex - 1].path);
			}
		}
	};

	const goDown = async () => {
		if (
			store.currentParentSlide?.children &&
			store.currentParentSlide.children.length > 0
		) {
			whooshIncrement();
			store.toggleSpellTrigger();
			setTimeout(() => store.toggleSpellTrigger(), 100); // Reset trigger after short delay

			store.setTransitionDirection({
				axis: "vertical",
				forward: true,
			});
			navigate(
				`${store.currentParentSlide.path}${store.currentParentSlide.children[0].path}`,
			);
		}
	};

	const goUp = async () => {
		// If we're in a child slide, navigate up to parent
		if (store.isChildSlide) {
			whooshIncrement();
			store.toggleSpellTrigger();
			setTimeout(() => store.toggleSpellTrigger(), 100); // Reset trigger after short delay

			store.setTransitionDirection({
				axis: "vertical",
				forward: false,
			});
			// Extract the parent path (everything before the last segment)
			const parentPath = currentPathParts.slice(0, -1).join("/");
			navigate(parentPath);
		}
	};

	useEffect(() => {
		if (location.pathname === "/finale" && store.spellEffectsEnabled) {
			// seek(47); // Seek to 0:47 for the finale
			play();
		} else {
			stop();
		}
	}, [location.pathname, play, stop, store.spellEffectsEnabled]);

	return (
		<>
			{/** biome-ignore lint/nursery/useUniqueElementIds: this is for styling */}
			<div id="canvas-container">
				{location.pathname !== "/finale" && (
					<SpellCast
						axis={store.transitionDirection.axis}
						forward={store.transitionDirection.forward}
						trigger={store.spellTrigger}
						enabled={store.spellEffectsEnabled} // Pass enabled prop
					/>
				)}

				{location.pathname === "/finale" && (
					<Fireworks enabled={store.spellEffectsEnabled} />
				)}
			</div>
			<ProgressIndicator />
			<PageTurner
				onNext={store.hasNextSlide ? goNext : undefined}
				onPrev={store.hasPrevSlide ? goPrev : undefined}
				onDown={store.slideHasChildren ? goDown : undefined}
				onUp={store.isChildSlide ? goUp : undefined}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={location.pathname}
						initial={
							store.transitionDirection.axis === "horizontal"
								? {
										x: store.transitionDirection.forward ? 300 : -300,
										opacity: 0,
									}
								: {
										y: store.transitionDirection.forward ? 300 : -300,
										opacity: 0,
									}
						}
						animate={{ x: 0, y: 0, opacity: 1 }}
						exit={
							store.transitionDirection.axis === "horizontal"
								? {
										x: store.transitionDirection.forward ? -300 : 300,
										opacity: 0,
									}
								: {
										y: store.transitionDirection.forward ? -300 : 300,
										opacity: 0,
									}
						}
						transition={{ duration: 0.2 }}
					>
						<Routes location={location}>
							<Route path="/" element={<Navigate to="/home" replace />} />
							{flattenedSlides.map((slide) => (
								<Route key={v4()} path={slide.path} element={slide.element} />
							))}
						</Routes>
					</motion.div>
				</AnimatePresence>
			</PageTurner>
			{/* <ConnectToController
				onNext={hasNextSlide ? goNext : undefined}
				onPrev={hasPrevSlide ? goPrev : undefined}
				onDown={hasChildren ? goDown : undefined}
				onUp={isChildSlide ? goUp : undefined}
				activate={() => {
					setVolume(volume === 0 ? 1 : 0);
					setSpellEffectsEnabled((prev) => !prev);
				}}
			/> */}
			<TogglePresentation presentationPath="/" />
			<NavigationMap />
			<KeyboardGuide />
			<SlideExplorer />
			<SpeakerNotes />
		</>
	);
}

export default App;
