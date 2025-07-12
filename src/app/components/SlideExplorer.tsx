import cn from "classnames";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { H2, Icon } from "summit-kit";

import slides from "../slides/index.tsx";
import classes from "./SlideExplorer.module.css";

/**
 * Component that shows a thumbnail view of all slides to enable direct navigation
 */
export const SlideExplorer = () => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const navigate = useNavigate();

	const toggleExplorer = () => {
		if (dialogRef.current?.open) {
			dialogRef.current.close();
		} else {
			dialogRef.current?.showModal();
		}
	};

	const navigateToSlide = (path: string) => {
		navigate(path);
		dialogRef.current?.close();
	};

	return (
		<>
			<button
				type="button"
				className={classes.explorerButton}
				onClick={toggleExplorer}
				aria-label="Toggle slide explorer"
			>
				<Icon name="FiMenu" size={32} color="white" />
			</button>

			<dialog
				className={cn(classes.explorerContent)}
				ref={dialogRef}
				onClick={(e) => {
					e.stopPropagation(); // Prevent dialog from closing when clicking inside
					if (e.target === dialogRef.current) {
						dialogRef.current?.close();
					}
				}}
				onKeyDown={(e) => {
					// Optionally close dialog on Escape key
					if (e.key === "Escape" && dialogRef.current?.open) {
						dialogRef.current.close();
					}
				}}
			>
				<H2 classes={[classes.explorerContentH2]}>Slide Explorer</H2>
				<div className={classes.slideGrid}>
					{slides.map((slide, index) => (
						<div key={slide.path} className={classes.slideGroup}>
							<button
								type="button"
								className={classes.slideItem}
								onClick={() => navigateToSlide(slide.path)}
							>
								<div className={classes.slideNumber}>{index + 1}</div>
								<div className={classes.slideName}>
									{slide.path
										.replace("/", "")
										.replace(/-/g, " ")
										.replace(/\b\w/g, (l) => l.toUpperCase())}
								</div>
							</button>

							{slide.children && slide.children.length > 0 && (
								<div className={classes.childrenContainer}>
									{slide.children.map((child, childIndex) => (
										<button
											type="button"
											key={child.path}
											className={classes.childItem}
											onClick={() =>
												navigateToSlide(`${slide.path}${child.path}`)
											}
										>
											<div className={classes.slideNumber}>
												{index + 1}.{childIndex + 1}
											</div>
											<div className={classes.childName}>
												{child.path
													.replace("/", "")
													.replace(/-/g, " ")
													.replace(/\b\w/g, (l) => l.toUpperCase())}
											</div>
										</button>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</dialog>
		</>
	);
};

export default SlideExplorer;
