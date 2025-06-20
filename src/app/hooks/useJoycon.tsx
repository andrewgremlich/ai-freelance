import {
	connectJoyCon,
	connectedJoyCons,
	type JoyConDataPacket,
} from "joy-con-webhid";
import { useState, useRef, useCallback } from "react";

export const useJoycon = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [controller, setController] = useState<JoyConDataPacket | null>(null);
	const latestPacketRef = useRef<JoyConDataPacket | null>(null);
	const attachedJoyCons = useRef(new WeakSet()).current;
	const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

	// Call this to prompt the user to connect a Joy-Con and start listening
	const connectAndListen = useCallback(async () => {
		await connectJoyCon();

		setIsConnected(true);

		for (const joyCon of connectedJoyCons.values()) {
			if (attachedJoyCons.has(joyCon)) continue;

			attachedJoyCons.add(joyCon);

			await joyCon.enableVibration();

			joyCon.on("hidinput", (event: { detail: JoyConDataPacket }) => {
				latestPacketRef.current = event.detail;
			});
		}

		const update = () => {
			intervalIdRef.current = setInterval(() => {
				if (latestPacketRef.current) {
					setController(latestPacketRef.current);
				}
			}, 1000);
		};

		if (!intervalIdRef.current) {
			update();
		}
	}, [attachedJoyCons]);

	return { connectAndListen, isConnected, controller };
};
