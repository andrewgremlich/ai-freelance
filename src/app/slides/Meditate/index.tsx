import { useAudio } from "summit-kit/client";

import classes from "./Meditate.module.css";

export const Meditate = () => {
	useAudio({
		src: "calming-rain.webm",
		volume: 0.5,
		autoplay: true,
		loop: true,
	});

	return (
		<div className={classes.meditateContainer}>
			<div className={classes.underlay} />
			<div className={classes.circle} />
		</div>
	);
};
