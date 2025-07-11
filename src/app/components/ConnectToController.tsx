import type { CompleteJoyConDataPacket } from "joy-con-webhid";
import { useEffect, useRef } from "react";
import { Icon } from "summit-kit";

import { useJoycon } from "../hooks/useJoycon.tsx";
import classes from "./ConnectToController.module.css";

type ConnectToControllerProps = {
	onNext?: () => void;
	onPrev?: () => void;
	onUp?: () => void;
	onDown?: () => void;
	activate?: () => void;
	testSound?: () => void;
};

export const ConnectToController = ({
	onNext,
	onPrev,
	onUp,
	onDown,
	activate,
	testSound,
}: ConnectToControllerProps) => {
	const { connectAndListen, isConnected, controller } = useJoycon();
	const prevButtonStatusRef = useRef<
		CompleteJoyConDataPacket["buttonStatus"] | null
	>(null);

	useEffect(() => {
		if (!controller) return;
		const prev = prevButtonStatusRef.current;
		const curr = controller.buttonStatus;

		const justPressed = (key: keyof typeof curr) => {
			return curr[key] && (!prev || !prev[key]);
		};

		if (justPressed("right") || justPressed("a")) {
			onNext?.();
		} else if (justPressed("left") || justPressed("y")) {
			onPrev?.();
		} else if (justPressed("up") || justPressed("x")) {
			onUp?.();
		} else if (justPressed("down") || justPressed("b")) {
			onDown?.();
		} else if (justPressed("zl") || justPressed("zr")) {
			activate?.();
		} else if (justPressed("minus") || justPressed("plus")) {
			testSound?.();
		}

		prevButtonStatusRef.current = curr;
	}, [controller, onNext, onPrev, onUp, onDown, activate, testSound]);

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
