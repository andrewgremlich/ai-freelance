import { useEffect, useState } from "react";

export const useWhooshes = ({ amount }: { amount: number }) => {
	const [whooshNumber, setWhooshNumber] = useState(0);
	const [src, setSrc] = useState(`/whoosh_${whooshNumber}.webm`);

	useEffect(() => {
		setSrc(`/whoosh_${whooshNumber}.webm`);
	}, [whooshNumber]);

	const whooshIncrement = () => {
		setWhooshNumber((prev) => {
			const next = (prev + 1) % (amount + 1);
			return next;
		});
	};

	return {
		whooshIncrement,
		whooshSrc: src,
	};
};
