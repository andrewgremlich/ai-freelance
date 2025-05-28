import type { Slide } from "../types/slide.tsx";
import { NotFound } from "./404.tsx";
import { TheFinale } from "./Finale/index.tsx";
import { GithubActions } from "./GithubActions/index.tsx";
import { Learning, Slicer, ThreeDTech } from "./Learning/index.tsx";
import { AIRant } from "./Leveraging/ai-rant.tsx";
import { Leveraging, VibeCoding } from "./Leveraging/index.tsx";
import { Knowing, Mastering } from "./Mastering/index.tsx";
import { PresentationLink, Social } from "./PresentationInfo/index.ts";
import { Finding, ProjectStory, TheProject } from "./TheProject/index.tsx";
import { Title } from "./title.tsx";

const slides: Slide[] = [
	{
		path: "/home",
		element: <Title />,
		notes: "Welcome! Introduce yourself and the topic.",
	},
	{
		path: "/presentation",
		element: <PresentationLink />,
		children: [{ path: "/social", element: <Social /> }],
	},
	{
		path: "/the-project",
		element: <TheProject />,
		notes: "Explain the project background and goals.",
		children: [
			{
				path: "/finding",
				element: <Finding />,
				notes: "Describe how the project idea was found.",
			},
			{
				path: "/project-story",
				element: <ProjectStory />,
				notes: "Share the story behind the project.",
			},
		],
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
				element: <div>Use Whooshes</div>,
				notes:
					"Discuss the use of whooshes in the project and how AI didn't help. It was a basic React mistake by putting an array in an useEffect dependency.",
			},
		],
	},
	{
		path: "/leveraging",
		element: <Leveraging />,
		children: [
			{
				path: "/vibe-coding",
				element: <VibeCoding />,
			},
			{
				path: "/ai-rant",
				element: <AIRant />,
			},
		],
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
		path: "/finale",
		element: <TheFinale />,
	},
	{ path: "/social", element: <Social /> },
	{
		path: "/*",
		element: <NotFound />,
	},
];

const withRemovedNotFound = slides.filter((slide) => slide.path !== "/*");
export default withRemovedNotFound;

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
