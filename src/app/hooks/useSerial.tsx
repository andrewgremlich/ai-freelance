import { useEffect, useRef, useState } from "react";

export function useSerial({
	baudRate = 9600,
}: {
	baudRate?: number;
} = {}) {
	const [port, setPort] = useState<SerialPort | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [output, setOutput] = useState("");
	const readerRef = useRef<ReadableStreamDefaultReader<string> | null>(null);
	const textDecoderRef = useRef<TextDecoderStream | null>(null);
	const pipePromiseRef = useRef<Promise<void> | null>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	// Connect to serial port
	const connect = async () => {
		try {
			const selectedPort = await navigator.serial.requestPort();
			await selectedPort.open({ baudRate });
			setPort(selectedPort);
			setIsConnected(true);

			const textDecoder = new TextDecoderStream();
			textDecoderRef.current = textDecoder;
			const abortController = new AbortController();
			abortControllerRef.current = abortController;
			const pipePromise = selectedPort.readable?.pipeTo(textDecoder.writable, { signal: abortController.signal });
			pipePromiseRef.current = pipePromise ?? null;
			const portReader = textDecoder.readable.getReader();
			readerRef.current = portReader;

			// Read loop
			while (true) {
				const { value, done } = await portReader.read();
				if (done) break;

				if (value) {
					setOutput(value);
				}
			}
		} catch (error) {
			setIsConnected(false);
			setPort(null);
			readerRef.current = null;
			textDecoderRef.current = null;
			pipePromiseRef.current = null;
			abortControllerRef.current = null;
			// Optionally handle error
		}
	};

	// Disconnect from serial port
	const disconnect = async () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			abortControllerRef.current = null;
		}

		if (readerRef.current) {
			try {
				await readerRef.current.cancel();
				readerRef.current.releaseLock();
			} catch (e) {
				console.log("Error cancelling reader:", e);
			}
			readerRef.current = null;
		}

		if (pipePromiseRef.current) {
			try {
				await pipePromiseRef.current;
			} catch (e) {
				// Ignore pipe errors on abort
			}
			pipePromiseRef.current = null;
		}

		if (textDecoderRef.current) {
			textDecoderRef.current = null;
		}

		if (port) {
			try {
				await port.close();
			} catch (e) {
				// Ignore if already closed or cannot close
			}
		}

		setPort(null);
		setIsConnected(false);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		return () => {
			disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		connect,
		disconnect,
		isConnected,
		output,
		port,
	};
}
