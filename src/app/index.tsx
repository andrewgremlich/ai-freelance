import "summit-kit/styles";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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
import type { Direction, Slide } from "./types/slide.ts";
// import { ConnectToController } from "./components/ConnectToController.tsx";

function App() {
	const { whooshIncrement, whooshSrc } = useWhooshes({ amount: 2 });
	const [spellTrigger, setSpellTrigger] = useState(false);
	const [spellEffectsEnabled, setSpellEffectsEnabled] = useState(false);
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
	const { setStereo, setVolume, volume } = useAudio({
		src: whooshSrc,
		volume: 0,
		stereo: 0,
		autoplay: true,
	});
	const location = useLocation();
	const navigate = useNavigate();
	const [transitionDirection, setTransitionDirection] = useState<Direction>({
		axis: "horizontal",
		forward: true,
	});

	// Toggle spell effects and volume with Control+Shift+M
	useKeyPress([
		{
			shortcutKey: "Control+Shift+M",
			action: () => {
				if (!spellEffectsEnabled) {
					activateMagic();
				}
				setVolume(volume === 0 ? 1 : 0);
				setSpellEffectsEnabled((prev) => !prev);
			},
		},
		{
			shortcutKey: "Control+Shift+T",
			action: () => playTestSound(),
		},
	]);

	const currentParentSlideIndex = slides.findIndex((s) =>
		location.pathname.includes(s.path),
	);

	// Check if current slide has children for deep-dive capability
	const hasChildren =
		slides[currentParentSlideIndex]?.children &&
		slides[currentParentSlideIndex].children.length > 0;

	// Check if we're on a child slide
	const currentPathParts = location.pathname.split("/");
	const isChildSlide = currentPathParts.length > 2; // /parent/child vs /parent

	// Find current child index if we're on a child slide
	const currentParentSlide = slides[currentParentSlideIndex];
	let currentChildIndex = -1;

	if (isChildSlide && currentParentSlide?.children) {
		// Get last path segment (child path)
		const childPath = `/${currentPathParts[currentPathParts.length - 1]}`;
		currentChildIndex = currentParentSlide.children.findIndex(
			(child: Slide) => child.path === childPath,
		);
	}

	// Navigation availability checks
	const hasNextSlide = isChildSlide
		? currentChildIndex < (currentParentSlide?.children?.length ?? 0) - 1
		: !!slides[currentParentSlideIndex + 1];

	const hasPrevSlide = isChildSlide
		? currentChildIndex > 0
		: !!slides[currentParentSlideIndex - 1];

	const goNext = async () => {
		if (hasNextSlide) {
			setStereo(1);
			setSpellTrigger(true);
			setTimeout(() => setSpellTrigger(false), 100); // Reset trigger after short delay
			whooshIncrement();

			setTransitionDirection({
				axis: "horizontal",
				forward: true,
			});

			// If we're on a child slide, navigate to the next child
			if (isChildSlide && currentParentSlide?.children) {
				const nextChildIndex = currentChildIndex + 1;
				if (nextChildIndex < currentParentSlide.children.length) {
					const nextChildPath =
						currentParentSlide.children[nextChildIndex].path;
					navigate(`${currentParentSlide.path}${nextChildPath}`);
				}
			} else {
				// Regular navigation to next parent slide
				navigate(slides[currentParentSlideIndex + 1].path);
			}
		}
	};

	const goPrev = async () => {
		if (hasPrevSlide) {
			setStereo(-1);
			setSpellTrigger(true);
			setTimeout(() => setSpellTrigger(false), 100); // Reset trigger after short delay
			whooshIncrement();

			setTransitionDirection({
				axis: "horizontal",
				forward: false,
			});

			// If we're on a child slide, navigate to the previous child
			if (isChildSlide && currentParentSlide?.children) {
				const prevChildIndex = currentChildIndex - 1;
				if (prevChildIndex >= 0) {
					const prevChildPath =
						currentParentSlide.children[prevChildIndex].path;
					navigate(`${currentParentSlide.path}${prevChildPath}`);
				}
			} else {
				// Regular navigation to previous parent slide
				navigate(slides[currentParentSlideIndex - 1].path);
			}
		}
	};

	const goDown = async () => {
		if (
			currentParentSlide?.children &&
			currentParentSlide.children.length > 0
		) {
			whooshIncrement();
			setSpellTrigger(true);
			setTimeout(() => setSpellTrigger(false), 100); // Reset trigger after short delay

			setTransitionDirection({
				axis: "vertical",
				forward: true,
			});
			navigate(
				`${currentParentSlide.path}${currentParentSlide.children[0].path}`,
			);
		}
	};

	const goUp = async () => {
		// If we're in a child slide, navigate up to parent
		if (isChildSlide) {
			whooshIncrement();
			setSpellTrigger(true);
			setTimeout(() => setSpellTrigger(false), 100); // Reset trigger after short delay

			setTransitionDirection({
				axis: "vertical",
				forward: false,
			});
			// Extract the parent path (everything before the last segment)
			const parentPath = currentPathParts.slice(0, -1).join("/");
			navigate(parentPath);
		}
	};

	useEffect(() => {
		if (location.pathname === "/finale" && spellEffectsEnabled) {
			// seek(47); // Seek to 0:47 for the finale
			play();
		} else {
			stop();
		}
	}, [location.pathname, play, stop, spellEffectsEnabled]);

	return (
		<>
			<div id="canvas-container">
				{location.pathname !== "/finale" && (
					<SpellCast
						axis={transitionDirection.axis}
						forward={transitionDirection.forward}
						trigger={spellTrigger}
						enabled={spellEffectsEnabled} // Pass enabled prop
					/>
				)}

				{location.pathname === "/finale" && (
					<Fireworks enabled={spellEffectsEnabled} />
				)}
			</div>
			<ProgressIndicator />
			<PageTurner
				onNext={hasNextSlide ? goNext : undefined}
				onPrev={hasPrevSlide ? goPrev : undefined}
				onDown={hasChildren ? goDown : undefined}
				onUp={isChildSlide ? goUp : undefined}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={location.pathname}
						initial={
							transitionDirection.axis === "horizontal"
								? { x: transitionDirection.forward ? 300 : -300, opacity: 0 }
								: { y: transitionDirection.forward ? 300 : -300, opacity: 0 }
						}
						animate={{ x: 0, y: 0, opacity: 1 }}
						exit={
							transitionDirection.axis === "horizontal"
								? { x: transitionDirection.forward ? -300 : 300, opacity: 0 }
								: { y: transitionDirection.forward ? -300 : 300, opacity: 0 }
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
