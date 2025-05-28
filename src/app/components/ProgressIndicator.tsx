import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import slides from "../slides/index.tsx";

import type { Slide } from "../types/slide.ts";
import classes from "./ProgressIndicator.module.css";

/**
 * A component that shows a progress bar indicating where we are in the presentation
 */
export const ProgressIndicator = () => {
	const location = useLocation();
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const calculateProgress = () => {
			// Find the current parent slide index
			const currentParentSlideIndex = slides.findIndex((s) =>
				location.pathname.includes(s.path),
			);

			// If we're at the end slide, return 100%
			if (currentParentSlideIndex === slides.length - 1) {
				return 100;
			}

			// Calculate based on parent slide position
			const parentProgress =
				(currentParentSlideIndex / (slides.length - 1)) * 100;

			// Determine if we're on a child slide
			const pathParts = location.pathname.split("/");
			const isChildSlide = pathParts.length > 2;

			// If not on a child slide, return parent progress
			if (!isChildSlide || !slides[currentParentSlideIndex]?.children) {
				return parentProgress;
			}

			// Calculate extra progress for being on a child slide
			const childPath = `/${pathParts[pathParts.length - 1]}`;
			const childIndex = slides[currentParentSlideIndex].children.findIndex(
				(child: Slide) => child.path === childPath,
			);

			// The child slide progress is a fraction of the gap between this parent and the next
			const parentGap = 100 / (slides.length - 1);
			const childProgressIncrement =
				((childIndex + 1) /
					(slides[currentParentSlideIndex].children.length + 1)) *
				parentGap;

			return parentProgress + childProgressIncrement;
		};

		setProgress(calculateProgress());
	}, [location.pathname]);

	return (
		<div className={classes.container}>
			<div className={classes.progress} style={{ width: `${progress}%` }} />
		</div>
	);
};
