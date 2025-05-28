import { H1, P } from "summit-kit/react";

export * from "./finding";
export * from "./research";

export const TheProject = () => {
	return (
		<>
			<H1>The Project</H1>
			<P>
				The client needed a web application to modify an STL file and generate a
				GCode file customized for the custom printer.
			</P>
		</>
	);
};
