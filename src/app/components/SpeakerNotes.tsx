import { useLocation } from "react-router";
import { flattenedSlides } from "../slides/index.tsx";
import type { Slide } from "../types/slide.ts";
import classes from "./SpeakerNotes.module.css";

export const SpeakerNotes = () => {
	const location = useLocation();
	const current = flattenedSlides.find(
		(slide: Slide) => slide.path === location.pathname,
	);
	if (!current?.notes) return null;
	return (
		<aside className={classes.speakerNotes}>
			<h3>Speaker Notes</h3>
			<div>{current.notes}</div>
		</aside>
	);
};
