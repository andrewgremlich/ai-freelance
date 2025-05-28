import type { JSX } from "react";

export type Direction = {
	axis: "horizontal" | "vertical";
	forward: boolean; // true = right/down, false = left/up
};

export type Slide = {
	path: string;
	element: JSX.Element;
	notes?: string;
	children?: Slide[];
};
