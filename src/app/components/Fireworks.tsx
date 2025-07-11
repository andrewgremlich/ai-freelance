import { Canvas } from "@react-three/fiber";
import { AppearanceMode, RenderMode, VFXEmitter, VFXParticles } from "wawa-vfx";

export const Fireworks = ({ enabled }: { enabled: boolean }) => {
	if (!enabled) return null;

	return (
		<Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />
			<VFXParticles
				name="fireworkParticles"
				settings={{
					nbParticles: 5000,
					intensity: 4,
					renderMode: RenderMode.Billboard,
					fadeSize: [0.2, 0.8],
					fadeAlpha: [0.2, 0.8],
					gravity: [0, -9.8, 0],
					appearance: AppearanceMode.Circular,
				}}
			/>

			<VFXEmitter
				debug={false}
				emitter="fireworkParticles"
				settings={{
					duration: 0.1,
					delay: 0.2,
					nbParticles: 50,
					spawnMode: "time",
					loop: true,
					startPositionMin: [0, -4.1, 1],
					startPositionMax: [0, -4, 0],
					startRotationMin: [0, 0, 0],
					startRotationMax: [0, 0, 0],
					particlesLifetime: [3.4, 4.8],
					speed: [5, 12],
					directionMin: [-1, 1, 0],
					directionMax: [-0.5, 0, 0],
					rotationSpeedMin: [0, 0, 0],
					rotationSpeedMax: [0, 0, 0],
					colorStart: ["#fc2e61", "#ff8000"],
					colorEnd: ["#ff5353", "#fcb169"],
					size: [0.36, 0.5],
				}}
			/>

			<VFXEmitter
				debug={false}
				emitter="fireworkParticles"
				settings={{
					duration: 0.1,
					delay: 0.7,
					nbParticles: 50,
					spawnMode: "time",
					loop: true,
					startPositionMin: [0, -4.1, 1],
					startPositionMax: [0, -4, 0],
					startRotationMin: [0, 0, 0],
					startRotationMax: [0, 0, 0],
					particlesLifetime: [3.4, 4.8],
					speed: [5, 12],
					directionMin: [1, 1, 0],
					directionMax: [0.5, 0, 0],
					rotationSpeedMin: [0, 0, 0],
					rotationSpeedMax: [0, 0, 0],
					colorStart: ["#2dfcfc", "#4ff74d"],
					colorEnd: ["#00ffff", "#8bfc89"],
					size: [0.36, 0.5],
				}}
			/>
		</Canvas>
	);
};
