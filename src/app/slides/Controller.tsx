import { useCallback, useRef, useState } from "react";
import { ConnectToController } from "../components/ConnectToController.tsx";
import { TogglePresentation } from "../components/TogglePresentation.tsx";

export const PresentationController = () => {
	const [connectionStatus, setConnectionStatus] =
		useState<string>("disconnected");
	const connectionRef = useRef<PresentationConnection | null>(null);

	const setupConnection = useCallback((connection: PresentationConnection) => {
		connectionRef.current = connection;
		setConnectionStatus("connected");

		connection.onmessage = (event: MessageEvent) => {
			try {
				const message = JSON.parse(event.data);
				console.log("Controller received:", message);
			} catch (error) {
				console.error("Error parsing message:", error);
			}
		};

		connection.onclose = () => {
			console.log("Connection closed");
			connectionRef.current = null;
			setConnectionStatus("disconnected");
		};

		connection.onterminate = () => {
			console.log("Connection terminated");
			connectionRef.current = null;
			setConnectionStatus("disconnected");
		};
	}, []);

	// This component acts as a controller, not a receiver
	const handleConnectionEstablished = useCallback(
		(connection: PresentationConnection) => {
			console.log("Presentation connection established in controller");
			setupConnection(connection);
		},
		[setupConnection],
	);

	const sendCommand = useCallback((action: string) => {
		if (connectionRef.current && connectionRef.current.state === "connected") {
			try {
				connectionRef.current.send(
					JSON.stringify({
						action,
						timestamp: Date.now(),
					}),
				);
				console.log("Sent command:", action);
			} catch (error) {
				console.error("Error sending command:", error);
			}
		} else {
			console.warn("No connection available to send command");
		}
	}, []);

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<TogglePresentation
				presentationPath="/home"
				onConnectionEstablished={handleConnectionEstablished}
			/>
			<ConnectToController
				onNext={() => sendCommand("next")}
				onPrev={() => sendCommand("prev")}
				onUp={() => sendCommand("up")}
				onDown={() => sendCommand("down")}
				activate={() => sendCommand("activate")}
				testSound={() => sendCommand("testSound")}
			/>

			<h1>Presentation Controller</h1>
			<p>
				Status:{" "}
				<span
					style={{
						color: connectionStatus === "connected" ? "green" : "red",
						fontWeight: "bold",
					}}
				>
					{connectionStatus}
				</span>
			</p>

			<div style={{ marginTop: "20px" }}>
				<h2>Navigation Controls</h2>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(3, 100px)",
						gap: "10px",
						justifyContent: "center",
						marginTop: "20px",
					}}
				>
					<div />
					<button
						type="button"
						onClick={() => sendCommand("up")}
						style={{ padding: "10px", fontSize: "16px" }}
						disabled={connectionStatus !== "connected"}
					>
						↑ Up
					</button>
					<div />

					<button
						type="button"
						onClick={() => sendCommand("prev")}
						style={{ padding: "10px", fontSize: "16px" }}
						disabled={connectionStatus !== "connected"}
					>
						← Prev
					</button>
					<button
						type="button"
						onClick={() => sendCommand("activate")}
						style={{
							padding: "10px",
							fontSize: "16px",
							backgroundColor: "#4CAF50",
							color: "white",
						}}
						disabled={connectionStatus !== "connected"}
					>
						✨ Magic
					</button>
					<button
						type="button"
						onClick={() => sendCommand("next")}
						style={{ padding: "10px", fontSize: "16px" }}
						disabled={connectionStatus !== "connected"}
					>
						Next →
					</button>

					<div />
					<button
						type="button"
						onClick={() => sendCommand("down")}
						style={{ padding: "10px", fontSize: "16px" }}
						disabled={connectionStatus !== "connected"}
					>
						↓ Down
					</button>
					<div />
				</div>

				<div style={{ marginTop: "20px", textAlign: "center" }}>
					<button
						type="button"
						onClick={() => sendCommand("testSound")}
						style={{
							padding: "10px 20px",
							fontSize: "16px",
							backgroundColor: "#2196F3",
							color: "white",
						}}
						disabled={connectionStatus !== "connected"}
					>
						🔊 Test Sound
					</button>
				</div>
			</div>
		</div>
	);
};
