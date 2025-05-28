import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import slides from "../slides";

import classes from "./NavigationMap.module.css";

/**
 * A component that shows the current navigation position within the slide hierarchy
 */
export const NavigationMap = () => {
	const location = useLocation();
	const [currentPosition, setCurrentPosition] = useState({
		parentIndex: 0,
		isChild: false,
		childIndex: -1,
	});

	useEffect(() => {
		// Find parent slide and index
		const parentIndex = slides.findIndex((s) =>
			location.pathname.includes(s.path),
		);

		// Determine if we're on a child slide
		const pathParts = location.pathname.split("/");
		const isChild = pathParts.length > 2;

		let childIndex = -1;
		if (isChild && slides[parentIndex]?.children) {
			const childPath = `/${pathParts[pathParts.length - 1]}`;
			childIndex = slides[parentIndex].children.findIndex(
				(child) => child.path === childPath,
			);
		}

		setCurrentPosition({
			parentIndex,
			isChild,
			childIndex,
		});
	}, [location.pathname]);

	return (
		<div className={classes.container}>
			<div className={classes.parentMap}>
				{slides.map((slide, index) => (
					<div
						key={slide.path}
						className={`${classes.slideMarker} ${index === currentPosition.parentIndex ? classes.active : ""}`}
						title={`Slide ${index + 1}`}
					/>
				))}
			</div>

			{slides[currentPosition.parentIndex]?.children && (
				<div className={classes.childMap}>
					{slides[currentPosition.parentIndex].children?.map(
						(childSlide, index) => (
							<div
								key={childSlide.path}
								className={`${classes.childMarker} ${
									currentPosition.isChild &&
									index === currentPosition.childIndex
										? classes.active
										: ""
								}`}
								title={`Child slide ${index + 1}`}
							/>
						),
					)}
				</div>
			)}
		</div>
	);
};
