import { Canvas } from "@react-three/fiber";
import { AppearanceMode, RenderMode, VFXEmitter, VFXParticles } from "wawa-vfx";

export const SpellCast = ({
	forward,
	trigger,
}: { forward: boolean; trigger: boolean }) => {
	const start: { [key: string]: [number, number, number] } = {
		startPositionMin: [-10, 0, -5],
		startPositionMax: [0, -10, 0],
		directionMin: [1, 1, -1],
	};
	const end: { [key: string]: [number, number, number] } = {
		startPositionMin: [10, 0, -5],
		startPositionMax: [0, -10, 0],
		directionMin: [-1, 1, -1],
	};

	return (
		<Canvas>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />
			{/* Add your 3D scene components here */}
			<mesh>
				{/* Step 1: Define your particle system */}
				<VFXParticles
					name="particles" // A unique identifier for this particle system
					settings={{
						nbParticles: 100000, // Maximum number of particles to allocate
						intensity: 3, // Brightness multiplier
						renderMode: RenderMode.Billboard, // "billboard" or "mesh" or "stretchBillboard"
						fadeSize: [0, 0], // Size fade in/out settings
						fadeAlpha: [0, 0], // Alpha fade in/out settings
						gravity: [0, -9.8, 0], // Apply gravity (x, y, z)
						appearance: AppearanceMode.Circular, // Define the default appearance to be plane (default) or circular
					}}
				/>

				{/* Step 2: Define your emitter */}
				{trigger && (
					<VFXEmitter
						// debug // Show debug visualization
						emitter="particles" // Target the particle system by name
						settings={{
							duration: 0.5,
							nbParticles: 100,
							loop: false,
							colorStart: ["red", "darkred"],
							colorEnd: ["blue", "darkblue"],
							particlesLifetime: [1, 2],
							speed: [1, 12],
							spawnMode: "burst", // "time" or "burst"
							delay: 0,
							size: [0.01, 1],
							startRotationMax: [0, 0, 0],
							startRotationMin: [0, 0, 0],
							rotationSpeedMin: [0, 0, 0],
							rotationSpeedMax: [0, 0, 0],
							directionMax: [0, 0, 0],
							...(forward ? end : start), // Use the start or end configuration based on the forward prop
						}}
					/>
				)}
			</mesh>
		</Canvas>
	);
};
