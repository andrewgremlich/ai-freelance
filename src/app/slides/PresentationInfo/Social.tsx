import { RiBlueskyLine } from "react-icons/ri";
import QRCode from "react-qr-code";
import { H1, Icon, P } from "summit-kit";

import classes from "./Social.module.css";

export const Social = () => {
	return (
		<div>
			<div className={classes["social-header"]}>
				<H1>Social</H1>
				<P>Follow me on social media!</P>
			</div>
			<ul className={classes["social-list"]}>
				<li>
					<a
						href="https://bsky.app/profile/gremlich.dev"
						target="_blank"
						rel="noopener noreferrer"
					>
						<figure>
							<QRCode value="https://bsky.app/profile/gremlich.dev" />
							<figcaption className={classes.figcaption}>
								Follow me on BlueSky <RiBlueskyLine size="30px" />
							</figcaption>
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
							<figcaption className={classes.figcaption}>
								Follow me on LinkedIn <Icon name="FiLinkedin" />
							</figcaption>
						</figure>
					</a>
				</li>
			</ul>
		</div>
	);
};
