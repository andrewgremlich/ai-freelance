import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/index.tsx";
import { ErrorBoundary } from "./app/components/ErrorBoundary.tsx";
import { P } from "summit-kit";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

root.render(
	<StrictMode>
		<ErrorBoundary fallback={<P>Something went wrong.</P>}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ErrorBoundary>
	</StrictMode>,
);
