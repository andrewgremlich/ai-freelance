import QRCode from "react-qr-code";
import { H1, P } from "summit-kit";

import classes from "./Social.module.css";

export const Social = () => {
	return (
		<div>
			<div className={classes["social-header"]}>
				<H1>Social</H1>
				<P>Connect with me on social media!</P>
			</div>
			<ul className={classes["social-list"]}>
				<li>
					<a
						href="https://bsky.app/profile/agremlich.bsky.social"
						target="_blank"
						rel="noopener noreferrer"
					>
						<figure>
							<QRCode value="https://bsky.app/profile/agremlich.bsky.social" />
							<figcaption>Follow me on BlueSky</figcaption>
						</figure>
					</a>
				</li>
				<li>
					<a
						href="https://www.linkedin.com/in/agremlich/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<figure>
							<QRCode value="https://www.linkedin.com/in/agremlich/" />
							<figcaption>Follow me on LinkedIn</figcaption>
						</figure>
					</a>
				</li>
			</ul>
		</div>
	);
};
