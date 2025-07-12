import { Quote } from "summit-kit";
import type { Slide } from "../types/slide.tsx";
import { NotFound } from "./404.tsx";
import { TheFinale } from "./Finale/index.tsx";
import { GithubActions } from "./GithubActions/index.tsx";
import { Learning, Slicer, ThreeDTech, Whooshes } from "./Learning/index.tsx";
import { Leveraging } from "./Leveraging/index.tsx";
import { Knowing, Mastering } from "./Mastering/index.tsx";
import { Meditate } from "./Meditate/index.tsx";
import { PresentationLink, Social } from "./PresentationInfo/index.ts";
import { ProvelPrint } from "./ProvelPrint/index.tsx";
import classes from "./Slides.module.css";
import { TheWhy } from "./TheWhy/index.tsx";
import { CostumeChange, Title } from "./Title/index.tsx";

const slides: Slide[] = [
	{
		path: "/home",
		element: <Title />,
		children: [
			{
				path: "/costume-change",
				element: <CostumeChange />,
			},
		],
	},
	{
		path: "/meditate",
		element: <Meditate />,
	},
	{
		path: "/the-project",
		element: <ProvelPrint />,
	},
	{
		path: "/learning",
		element: <Learning />,
		children: [
			{
				path: "/3d-tech",
				element: <ThreeDTech />,
			},
			{
				path: "/slicer",
				element: <Slicer />,
			},
			{
				path: "/github-actions",
				element: <GithubActions />,
			},
			{
				path: "/use-whooshes",
				element: <Whooshes />,
			},
		],
	},
	{
		path: "/leveraging",
		element: <Leveraging />,
		children: [],
	},
	{
		path: "/mastering",
		element: <Mastering />,
		children: [
			{
				path: "/knowing",
				element: <Knowing />,
			},
		],
	},
	{
		path: "/the-why",
		element: <TheWhy />,
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
		element: <TheFinale />,
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
