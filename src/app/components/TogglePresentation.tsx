import { useRef } from "react";
import { Icon } from "summit-kit";
import { useKeyPress } from "summit-kit/client";

import classes from "./ToggleFullScreen.module.css";

export const TogglePresentation = (props: { presentationPath?: string }) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const presentationRef = useRef<any>(null);

	useKeyPress([
		{
			shortcutKey: "Escape",
			action: async () => {
				if (presentationRef.current?.connection) {
					await presentationRef.current.connection.close();
					console.log("Exiting full screen mode");
				}
			},
		},
	]);

	const startPresentation = async (url: string) => {
		if ("PresentationRequest" in window) {
			// @ts-ignore
			const request = new window.PresentationRequest(url);
			presentationRef.current = request;
			try {
				const connection = await request.start();
				presentationRef.current.connection = connection;
				connection.onconnect = () => {
					console.log("Presentation connected");
				};
				connection.onclose = () => {
					console.log("Presentation closed");
				};
			} catch (e) {
				console.warn("Unable to start presentation:", e);
			}
		} else {
			alert("Presentation API is not supported in this browser.");
		}
	};

	return (
		<div className={classes["toggle-full-screen"]}>
			<button
				type="button"
				onClick={async () => {
					await startPresentation(props.presentationPath || "/");
				}}
				aria-label="Open Presentation on Second Screen"
				title="Open Presentation on Second Screen"
				style={{ marginLeft: 8 }}
			>
				<Icon name="FiMonitor" size={32} color="white" />
			</button>
		</div>
	);
};
