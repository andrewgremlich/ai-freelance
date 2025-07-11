import { useRef } from "react";
import { Icon } from "summit-kit";
import { useKeyPress } from "summit-kit/client";

import classes from "./ToggleFullScreen.module.css";

interface TogglePresentationProps { 
	presentationPath?: string;
	onConnectionEstablished?: (connection: PresentationConnection) => void;
}

export const TogglePresentation = (props: TogglePresentationProps) => {
	const presentationConnectionRef = useRef<PresentationConnection | null>(null);

	useKeyPress([
		{
			shortcutKey: "Escape",
			action: async () => {
				if (presentationConnectionRef.current) {
					await presentationConnectionRef.current.terminate();
					console.log("Exiting full screen mode");
				}
			},
		},
	]);

	const startPresentation = async (url: string) => {
		const presentationUrl =
			window.location.origin + (url.startsWith("/") ? url : "/" + url);
		
		const win = window as Window & {
			PresentationRequest?: {
				new (urls: string[]): PresentationRequest;
			};
		};
		
		const PresentationRequestClass = win.PresentationRequest;
		if (!PresentationRequestClass) {
			console.warn("Presentation API not supported");
			return;
		}
		
		const request = new PresentationRequestClass([presentationUrl]);

		try {
			const connection = await request.start();
			presentationConnectionRef.current = connection;

			connection.onconnect = () => {
				console.log("Presentation connected");
				
				// Notify parent component about the connection
				if (props.onConnectionEstablished) {
					props.onConnectionEstablished(connection);
				}

				connection.onmessage = (message: MessageEvent) => {
					console.log(`Received message: ${message.data}`);
				};

				// Send initial connection confirmation
				connection.send(JSON.stringify({ 
					type: 'controller-ready',
					timestamp: Date.now() 
				}));
			};

			connection.onclose = () => {
				console.log("Presentation closed");
				presentationConnectionRef.current = null;
			};

			connection.onterminate = () => {
				console.log("Presentation terminated");
				presentationConnectionRef.current = null;
			};
		} catch (e) {
			console.warn("Unable to start presentation:", e);
		}
	};

	return (
		<div className={classes["toggle-full-screen"]}>
			<button
				type="button"
				onClick={async () => {
					await startPresentation(props.presentationPath || "/home");
				}}
				aria-label="Open Presentation on Second Screen"
				title="Open Presentation on Second Screen"
				style={{ marginLeft: 8 }}
			>
				<Icon name="FiMonitor" size={32} color="black" />
			</button>
		</div>
	);
};
