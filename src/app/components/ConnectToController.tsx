import { useEffect } from "react";
import { Icon } from "summit-kit";

import classes from "./ConnectToController.module.css";
import { useJoycon } from "../hooks/useJoycon.tsx";
import type { CompleteJoyConDataPacket } from "joy-con-webhid";

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
	const { connectAndListen, isConnected, controller } = useJoycon();

	useEffect(() => {
		const handleData = (data: CompleteJoyConDataPacket) => {
			if (data.buttonStatus.right || data.buttonStatus.a) {
				onNext?.();
			} else if (data.buttonStatus.left || data.buttonStatus.y) {
				onPrev?.();
			} else if (data.buttonStatus.up || data.buttonStatus.x) {
				onUp?.();
			} else if (data.buttonStatus.down || data.buttonStatus.b) {
				onDown?.();
			} else if (data.buttonStatus.leftStick || data.buttonStatus.rightStick) {
				activate?.();
			}
		};

		if (controller) {
			handleData(controller);
		}
		return () => {
			// Cleanup if needed
		};
	}, [controller, onNext, onPrev, onUp, onDown, activate]);

	return (
		<div className={classes.placement}>
			{!isConnected && (
				<button onClick={connectAndListen} type="button">
					<Icon name="FiBluetooth" size={32} color="white" />
				</button>
			)}
			{/* <pre>{output}</pre> */}
		</div>
	);
};
