// src/components/Home.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import Footer from "./Footer";

function AnimatedNeuralNode({ position, color, size = 0.08 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <Sphere ref={ref} args={[size, 64, 64]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </Sphere>
  );
}

function NeuralStructure({
  position = [0, 0, 0],
  color = "#00faff",
  nodeCount = 8,
}) {
  const nodes = useRef([]);
  if (nodes.current.length === 0) {
    for (let i = 0; i < nodeCount; i++) {
      nodes.current.push([
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
      ]);
    }
  }

  const connections = [];
  for (let i = 0; i < nodeCount; i++) {
    const connectionCount = 2 + Math.floor(Math.random() * 2);
    const connectedIndices = new Set();
    while (connectedIndices.size < connectionCount) {
      const targetIndex = Math.floor(Math.random() * nodeCount);
      if (targetIndex !== i) connectedIndices.add(targetIndex);
    }
    connectedIndices.forEach((targetIndex) => {
      connections.push([i, targetIndex]);
    });
  }

  return (
    <group position={position}>
      {nodes.current.map((pos, i) => (
        <AnimatedNeuralNode key={i} position={pos} color={color} />
      ))}
      {connections.map(([start, end], i) => (
        <Line
          key={i}
          points={[nodes.current[start], nodes.current[end]]}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      ))}
    </group>
  );
}

export default function Home() {
  const structures = [];
  const colors = ["#00faff", "#00d9ff", "#00bfff", "#1e90ff", "#007fff", "#4dffff"];
  for (let i = 0; i < 12; i++) {
    structures.push({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
      ],
      color: colors[i % colors.length],
      nodeCount: 5 + Math.floor(Math.random() * 6),
    });
  }

  return (
    <div className="w-screen min-h-screen bg-black flex flex-col">
      {/* HERO SECTION */}
      <section className="relative h-screen">
        {/* Overlay text */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-center pointer-events-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-8xl font-bold text-cyan-200 drop-shadow-[0_0_15px_#00faff] special-font"
            >
              <b>MACHINE LEARNING FOR EVERYONE</b> (<b>ML4E</b>)
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="mt-2 text-lg md:text-2xl text-blue-300 drop-shadow-[0_0_10px_#00d9ff]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <ReactTyped
                strings={["THE OFFICIAL MACHINE LEARNING CLUB OF NIT ROURKELA"]}
                typeSpeed={50}
                backSpeed={30}
                backDelay={1500}
                loop={false}
                showCursor={true}
              />
            </motion.p>
          </motion.div>
        </div>

        {/* 3D Canvas */}
        <Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          {structures.map((props, i) => (
            <NeuralStructure key={i} {...props} />
          ))}
          <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1.5} />
          <EffectComposer>
            <Bloom
              intensity={2.5}
              kernelSize={3}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Canvas>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
