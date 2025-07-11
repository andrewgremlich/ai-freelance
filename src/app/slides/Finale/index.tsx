import { H1 } from "summit-kit";

import classes from "./Finale.module.css";

export const TheFinale = () => {
	return (
		<div className={classes["finale-container"]}>
			<H1 classes={[classes["finale-title"]]}>The Finale</H1>
		</div>
	);
};
