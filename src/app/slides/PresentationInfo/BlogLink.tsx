import QRCode from "react-qr-code";
import { H1, P } from "summit-kit";

export const BlogLink = () => {
	return (
		<div>
			<H1>Blog link!</H1>
			<P>Check out my blog for the references!.</P>

			<a
				href="https://www.gremlich.me/software-engineering/2025/ai-powered-freelance/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<figure>
					<QRCode value="https://www.gremlich.me/software-engineering/2025/ai-powered-freelance/" />
					<figcaption>Link to my post!</figcaption>
				</figure>
			</a>
		</div>
	);
};
