import { Image, Quote } from "summit-kit";
import type { Slide } from "../types/slide.tsx";
import { NotFound } from "./404.tsx";
import { Leveraging } from "./Leveraging/index.tsx";
import { Meditate } from "./Meditate/index.tsx";
import { PresentationLink, Social } from "./PresentationInfo/index.ts";
import classes from "./Slides.module.css";
import { CostumeChange, Title } from "./Title/index.tsx";

const slides: Slide[] = [
	{
		path: "/home",
		element: <Title />,
		children: [
			{
				path: "/costume-change",
				element: <CostumeChange />, // TODO: a cyberpunk image of a wizard putting on his cloak.
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
		element: <Image src="/wizard_slicing.png" alt="The Project" width="100%" />,
	},
	{
		path: "/leveraging",
		element: <Leveraging />,
		children: [],
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
	{
		path: "/presentation",
		element: <PresentationLink />,
		children: [{ path: "/social", element: <Social /> }],
	},
	{
		path: "/finale",
		element: (
			<div style={{ textAlign: "center" }}>
				<Image src="/wizard_hike.png" alt="The Project" width="50%" />
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
