import { useEffect } from "react";
import { Icon } from "summit-kit";

import classes from "./ConnectToController.module.css";
import { useJoycon } from "../hooks/useJoycon.tsx";
import type { JoyConDataPacket } from "joy-con-webhid";

type ConnectToControllerProps = {
	onNext?: () => void;
	onPrev?: () => void;
	onUp?: () => void;
	onDown?: () => void;
	activate?: () => void;
};

export const ConnectToController = ({
	onNext,
	onPrev,
	onUp,
	onDown,
	activate,
}: ConnectToControllerProps) => {
	const { connect, isConnected, controller } = useJoycon();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleData = (data: JoyConDataPacket) => {
			console.log("Data received:", data);
			// onNext?.();
			// onPrev?.();
			// onUp?.();
			// onDown?.();
			// activate?.();
		};

		if (controller) {
			handleData(controller);
		}
		// Cleanup function to avoid memory leaks
		return () => {
			// If you need to clean up listeners or other resources, do it here
		};
	}, [controller]);

	return (
		<div className={classes.placement}>
			{!isConnected && (
				<button onClick={connect} type="button">
					<Icon name="FiBluetooth" size={32} color="white" />
				</button>
			)}

			{/* <pre>{output}</pre> */}
		</div>
	);
};
