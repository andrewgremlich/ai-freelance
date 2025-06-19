import { connectedJoyCons, type JoyConDataPacket } from "joy-con-webhid";
import { useState, useRef, useCallback } from "react";

export const useJoycon = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [controller, setController] = useState<JoyConDataPacket | null>(null);
	const lastUpdateRef = useRef(0);
	const latestPacketRef = useRef<JoyConDataPacket | null>(null);
	const attachedJoyCons = useRef(new WeakSet()).current;

	const THROTTLE_MS = 33; // ~30fps

	const connect = useCallback(async () => {
		for (const joyCon of connectedJoyCons.values()) {
			if (attachedJoyCons.has(joyCon)) continue;

			attachedJoyCons.add(joyCon);

			setIsConnected(true);

			await joyCon.enableVibration();

			joyCon.on("hidinput", (event: { detail: JoyConDataPacket }) => {
				const now = Date.now();
				latestPacketRef.current = event.detail;
				if (now - lastUpdateRef.current > THROTTLE_MS) {
					setController(event.detail);
					lastUpdateRef.current = now;
				}
			});
		}
	}, [attachedJoyCons]);

	return { connect, isConnected, controller };
};
