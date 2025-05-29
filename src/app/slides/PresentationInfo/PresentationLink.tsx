import QRCode from "react-qr-code";
import { H1, P } from "summit-kit";

import classes from "./Social.module.css";

export const PresentationLink = () => {
	return (
		<div>
			<div className={classes["social-header"]}>
				<H1>Presentation Link</H1>
				<P>Find the presentation link here</P>
			</div>
			<ul className={classes["social-list"]}>
				<li>
					<a
						href="https://ai-freelance-dev.gremlich.dev/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<figure>
							<QRCode value="https://ai-freelance-dev.gremlich.dev/" />
							<figcaption>View Presentation</figcaption>
						</figure>
					</a>
				</li>
			</ul>
		</div>
	);
};
