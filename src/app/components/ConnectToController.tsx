import { useEffect } from "react";
import { Icon } from "summit-kit";
import { useSerial } from "../hooks/useSerial.tsx";

import classes from "./ConnectToController.module.css";

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
	const { connect, disconnect, isConnected, output } = useSerial();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleData = (data: string) => {
			if (data.includes("RIGHT")) {
				onNext?.();
			} else if (data.includes("LEFT")) {
				onPrev?.();
			} else if (data.includes("UP")) {
				onUp?.();
			} else if (data.includes("DOWN")) {
				onDown?.();
			} else if (data.includes("BUTTON")) {
				activate?.();
			}
		};

		if (output) {
			handleData(output);
		}
		// Cleanup function to avoid memory leaks
		return () => {
			// If you need to clean up listeners or other resources, do it here
		};
	}, [output]);

	return (
		<div className={classes.placement}>
			{!isConnected ? (
				<button onClick={connect} type="button">
					<Icon name="FiBluetooth" size={32} color="white" />
				</button>
			) : (
				<button onClick={disconnect} type="button">
					<Icon name="FiX" size={32} color="white" />
				</button>
			)}

			{/* <pre>{output}</pre> */}
		</div>
	);
};
