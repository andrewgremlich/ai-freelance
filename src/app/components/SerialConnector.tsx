import React, { useState } from "react";

import classes from "./SerialConnector.module.css";

const SerialConnector = () => {
	const [port, setPort] = useState<SerialPort | null>(null);
	const [reader, setReader] =
		useState<ReadableStreamDefaultReader<string> | null>(null);
	const [output, setOutput] = useState("");

	const connectSerial = async () => {
		try {
			const selectedPort = await navigator.serial.requestPort();
			await selectedPort.open({ baudRate: 9600 });
			setPort(selectedPort);

			const textDecoder = new TextDecoderStream();

			selectedPort.readable?.pipeTo(textDecoder.writable);

			const portReader = textDecoder.readable.getReader();
			setReader(portReader);

			while (true) {
				const { value, done } = await portReader.read();
				if (done) {
					break;
				}
				if (value) {
					setOutput((prevOutput) => prevOutput + value);
				}
			}
		} catch (error) {
			console.error("Error connecting to serial port:", error);
		}
	};

	const disconnectSerial = async () => {
		if (reader) {
			await reader.cancel();
			await reader.releaseLock();
		}
		if (port) {
			await port.close();
		}
		setPort(null);
		setReader(null);
	};

	return (
		<div className={classes.floating}>
			<button type="button" onClick={connectSerial} disabled={port !== null}>
				Connect to Arduino
			</button>
			<button type="button" onClick={disconnectSerial} disabled={port === null}>
				Disconnect
			</button>
			<pre>{output}</pre>
		</div>
	);
};

export default SerialConnector;
