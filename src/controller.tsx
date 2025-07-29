import "summit-kit/styles";

import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { P } from "summit-kit";
import { ErrorBoundary } from "./app/components/ErrorBoundary.tsx";
import { PresentationController } from "./app/slides/Controller.tsx";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

root.render(
	<StrictMode>
		<ErrorBoundary fallback={<P>Something went wrong.</P>}>
			<PresentationController />
		</ErrorBoundary>
	</StrictMode>,
);
