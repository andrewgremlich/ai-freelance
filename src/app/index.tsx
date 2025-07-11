import "summit-kit/styles";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { PageTurner, useAudio, useKeyPress } from "summit-kit/client";
import { v4 } from "uuid";
import { useShallow } from "zustand/shallow";
import { Fireworks } from "./components/Fireworks.tsx";
import { KeyboardGuide } from "./components/KeyboardGuide.tsx";
import { NavigationMap } from "./components/NavigationMap.tsx";
import { ProgressIndicator } from "./components/ProgressIndicator.tsx";
import { SlideExplorer } from "./components/SlideExplorer.tsx";
import { SpeakerNotes } from "./components/SpeakerNotes.tsx";
import { SpellCast } from "./components/SpellCast.tsx";
import { TogglePresentation } from "./components/TogglePresentation.tsx";
import usePresentationStore, { selectEffectsState } from "./hooks/store.tsx";
import { useNavigation } from "./hooks/useNavigation.tsx";
import { useWhooshes } from "./hooks/useWhooshes.tsx";
import { flattenedSlides } from "./slides/index.tsx";
import { ConnectToController } from "./components/ConnectToController.tsx";

function App() {
	const navigation = useNavigation();
	const effects = usePresentationStore(useShallow(selectEffectsState));
	const setCurrentSlideFromLocation = usePresentationStore(
		(state) => state.setCurrentSlideFromLocation,
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
	const { play, stop } = useAudio({
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

	// Update store when location changes
	useEffect(() => {
		setCurrentSlideFromLocation(location);
	}, [location, setCurrentSlideFromLocation]);

	const activateMagicFn = () => {
		if (!effects.spellEffectsEnabled) {
			activateMagic();
		}
		setWhooshVolume(volume === 0 ? 1 : 0);
		effects.toggleSpellEffectsEnabled();
	};

	// Toggle spell effects and volume with Control+Shift+M
	useKeyPress([
		{
			shortcutKey: "Control+Shift+M",
			action: activateMagicFn,
		},
		{
			shortcutKey: "Control+Shift+T",
			action: () => playTestSound(),
		},
	]);

	const goNext = async () => {
		if (navigation.hasNextSlide) {
			setStereo(1);
			effects.toggleSpellTrigger();
			setTimeout(() => effects.toggleSpellTrigger(), 100);
			whooshIncrement();

			navigation.goNext();
		}
	};

	const goPrev = async () => {
		if (navigation.hasPrevSlide) {
			setStereo(-1);
			effects.toggleSpellTrigger();
			setTimeout(() => effects.toggleSpellTrigger(), 100);
			whooshIncrement();

			navigation.goPrev();
		}
	};

	const goDown = async () => {
		if (navigation.slideHasChildren) {
			whooshIncrement();
			effects.toggleSpellTrigger();
			setTimeout(() => effects.toggleSpellTrigger(), 100);

			navigation.goDown();
		}
	};

	const goUp = async () => {
		if (navigation.isChildSlide) {
			whooshIncrement();
			effects.toggleSpellTrigger();
			setTimeout(() => effects.toggleSpellTrigger(), 100);

			navigation.goUp();
		}
	};

	useEffect(() => {
		if (location.pathname === "/finale" && effects.spellEffectsEnabled) {
			play();
		} else {
			stop();
		}
	}, [location.pathname, play, stop, effects.spellEffectsEnabled]);

	return (
		<>
			<div id="canvas-container">
				{location.pathname !== "/finale" && (
					<SpellCast
						axis={effects.transitionDirection.axis}
						forward={effects.transitionDirection.forward}
						trigger={effects.spellTrigger}
						enabled={effects.spellEffectsEnabled}
					/>
				)}

				{location.pathname === "/finale" && (
					<Fireworks enabled={effects.spellEffectsEnabled} />
				)}
			</div>
			<ProgressIndicator />
			<PageTurner
				onNext={navigation.hasNextSlide ? goNext : undefined}
				onPrev={navigation.hasPrevSlide ? goPrev : undefined}
				onDown={navigation.slideHasChildren ? goDown : undefined}
				onUp={navigation.isChildSlide ? goUp : undefined}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={location.pathname}
						initial={
							effects.transitionDirection.axis === "horizontal"
								? {
										x: effects.transitionDirection.forward ? 300 : -300,
										opacity: 0,
									}
								: {
										y: effects.transitionDirection.forward ? 300 : -300,
										opacity: 0,
									}
						}
						animate={{ x: 0, y: 0, opacity: 1 }}
						exit={
							effects.transitionDirection.axis === "horizontal"
								? {
										x: effects.transitionDirection.forward ? -300 : 300,
										opacity: 0,
									}
								: {
										y: effects.transitionDirection.forward ? -300 : 300,
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
			<ConnectToController
				onNext={goNext}
				onPrev={goPrev}
				onUp={goUp}
				onDown={goDown}
				activate={activateMagicFn}
				testSound={playTestSound}
			/>
			<TogglePresentation presentationPath="/" />
			<NavigationMap />
			<KeyboardGuide />
			<SlideExplorer />
			<SpeakerNotes />
		</>
	);
}

export default App;
