import { H1, Image, Quote } from "summit-kit";
import type { Slide } from "../types/slide.tsx";
import { NotFound } from "./404.tsx";
import { Meditate } from "./Meditate/index.tsx";
import { Social } from "./PresentationInfo/index.ts";
import classes from "./Slides.module.css";

const slides: Slide[] = [
	{
		path: "/home",
		element: <H1>AI-Powered Freelance Development</H1>,
		children: [
			{
				path: "/costume-change",
				element: (
					<Image
						src="/wizard_cyberpunk.png"
						alt="Costume Change"
						width="100%"
					/>
				),
			},
		],
	},
	{
		path: "/meditate",
		element: <Meditate />,
	},
	{
		path: "/the-project",
		element: <Image src="/project_time.png" alt="The Project" width="100%" />,
	},
	{
		path: "/learning",
		element: (
			<Image
				src="/wizard_slicing.png"
				alt="Learning how to work."
				width="100%"
			/>
		),
	},
	{
		path: "/leveraging",
		element: (
			<Image src="/wizard_leveraging.png" alt="Leveraging" width="100%" />
		),
	},
	{
		path: "/mastering",
		element: <Image src="/wizard_master.png" alt="The Project" width="100%" />,
	},
	{
		path: "/inspire",
		element: (
			<Quote classes={[classes.legible]}>
				When you're hiking, those little steps might not seem like much — but
				they're exactly what get you to the top.
			</Quote>
		),
	},
	{ path: "/social", element: <Social /> },
	{
		path: "/finale",
		element: (
			<div style={{ textAlign: "center" }}>
				<Image src="/finale_bg_t.png" alt="Thank you for coming!" width="100%" />
			</div>
		),
	},
	{
		path: "/*",
		element: <NotFound />,
	},
];

const presentationSlides = slides.filter(
	(slide) => ["/controller", "/*"].includes(slide.path) === false,
);
export default presentationSlides;

export const flattenedSlides = slides.flatMap((slide) => {
	const newSlides = [slide];

	if (slide.children && slide.children.length > 0) {
		newSlides.push(
			...slide.children.map(({ path, element }: Slide) => ({
				path: `${slide.path}${path}`,
				element,
			})),
		);
	}

	return newSlides;
});
