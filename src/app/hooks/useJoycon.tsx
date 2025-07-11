import {
	type CompleteJoyConDataPacket,
	connectedJoyCons,
	connectJoyCon,
} from "joy-con-webhid";
import { useCallback, useRef, useState } from "react";

export const useJoycon = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [controller, setController] = useState<CompleteJoyConDataPacket | null>(
		null,
	);
	const latestPacketRef = useRef<CompleteJoyConDataPacket | null>(null);
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

			joyCon.on("hidinput", (event) => {
				latestPacketRef.current = event.detail as CompleteJoyConDataPacket;
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
