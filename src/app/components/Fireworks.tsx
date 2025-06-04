import { Canvas } from "@react-three/fiber";
import { v4 } from "uuid";
import { AppearanceMode, RenderMode, VFXEmitter, VFXParticles } from "wawa-vfx";

export const Fireworks = () => {
	console.log("Fireworks component rendered");
	return (
		<Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />
			<VFXParticles
				name="fireworkParticles"
				settings={{
					nbParticles: 10000,
					intensity: 4,
					renderMode: RenderMode.Billboard,
					fadeSize: [0.2, 0.8],
					fadeAlpha: [0.2, 0.8],
					gravity: [0, -9.8, 0],
					appearance: AppearanceMode.Circular,
				}}
			/>

			{Array.from({ length: 5 }).map((_, i) => (
				<VFXEmitter
					key={v4()}
					emitter="fireworkParticles"
					settings={{
						duration: 0.1,
						nbParticles: 500,
						loop: true,
						colorStart: [
							"#ff0040",
							"#ff8000",
							"#ffff00",
							"#00ff00",
							"#00ffff",
							"#0000ff",
							"#ff00ff",
						],
						colorEnd: ["#000000"],
						particlesLifetime: [1.2, 2.2],
						speed: [5, 10],
						spawnMode: "burst",
						delay: Math.random() * 2,
						size: [0.08, 0.18],
						startRotationMin: [0, 0, 0],
						startRotationMax: [0, Math.PI * 2, 0],
						rotationSpeedMin: [0, 0, 0],
						rotationSpeedMax: [0, 0, 0],
						startPositionMin: [
							-6 + Math.random() * 12,
							2 + Math.random() * 6,
							-4 + Math.random() * 8,
						],
						startPositionMax: [
							-6 + Math.random() * 12,
							2 + Math.random() * 6,
							-4 + Math.random() * 8,
						],
						directionMin: [-1, 1, -1],
						directionMax: [1, 1, 1],
					}}
				/>
			))}
		</Canvas>
	);
};
