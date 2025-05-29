import { useState } from "react";
import { Icon } from "summit-kit";

import classes from "./KeyboardGuide.module.css";

/**
 * A component to display keyboard shortcuts for slide navigation
 */
export const KeyboardGuide = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		setIsVisible((prev) => !prev);
	};

	return (
		<div className={classes.container}>
			<button
				type="button"
				className={classes.toggleButton}
				onClick={toggleVisibility}
				aria-label={
					isVisible ? "Hide keyboard shortcuts" : "Show keyboard shortcuts"
				}
			>
				<Icon name="FiHelpCircle" size={32} color="white" />
			</button>

			{isVisible && (
				<div className={classes.guideContent}>
					<h3>Keyboard Shortcuts</h3>
					<table className={classes.shortcutTable}>
						<tbody>
							<tr>
								<td>
									<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>→</kbd>
								</td>
								<td>Next slide / Next child slide</td>
							</tr>
							<tr>
								<td>
									<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>←</kbd>
								</td>
								<td>Previous slide / Previous child slide</td>
							</tr>
							<tr>
								<td>
									<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>↓</kbd>
								</td>
								<td>Enter child slides</td>
							</tr>
							<tr>
								<td>
									<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>↑</kbd>
								</td>
								<td>Return to parent slide</td>
							</tr>
							<tr>
								<td>
									<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd>
								</td>
								<td>Activate Magic Mode</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
