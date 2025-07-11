import { useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "summit-kit";

import slides from "../slides/index.tsx";
import classes from "./SlideExplorer.module.css";

/**
 * Component that shows a thumbnail view of all slides to enable direct navigation
 */
export const SlideExplorer = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const toggleExplorer = () => {
		setIsOpen((prev) => !prev);
	};

	const navigateToSlide = (path: string) => {
		navigate(path);
		setIsOpen(false);
	};

	return (
		<>
			<button
				type="button"
				className={classes.explorerButton}
				onClick={toggleExplorer}
				aria-label="Toggle slide explorer"
				aria-expanded={isOpen}
			>
				{isOpen ? (
					<Icon name="FiX" size={32} color="white" />
				) : (
					<Icon name="FiMenu" size={32} color="white" />
				)}
			</button>

			{isOpen && (
				<div className={classes.explorerOverlay} onClick={toggleExplorer}>
					<div
						className={classes.explorerContent}
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
						role="dialog"
						aria-label="Slide Explorer"
					>
						<h2>Slide Explorer</h2>
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
					</div>
				</div>
			)}
		</>
	);
};

export default SlideExplorer;
