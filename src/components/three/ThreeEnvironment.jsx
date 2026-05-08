import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { useSelector } from 'react-redux'

function FloatingShapes({ isLight }) {
  const groupRef = useRef()
  const shapesRef = useRef([])

  const shapes = useMemo(() => [
    { position: [-3, 2, -5], type: 'box', speed: 0.5 },
    { position: [4, -1, -4], type: 'sphere', speed: 0.7 },
    { position: [-2, -3, -6], type: 'torus', speed: 0.3 },
    { position: [3, 3, -7], type: 'icosahedron', speed: 0.6 },
    { position: [-4, 0, -8], type: 'octahedron', speed: 0.4 },
    { position: [5, 2, -5], type: 'tetrahedron', speed: 0.8 },
  ], [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    shapesRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x = time * shapes[i].speed
        mesh.rotation.y = time * shapes[i].speed * 0.5
      }
    })
  })

  const color = isLight ? '#6366f1' : '#00d4ff'

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={2}>
          <mesh ref={(el) => (shapesRef.current[i] = el)} position={shape.position}>
            {shape.type === 'box' && <boxGeometry args={[1, 1, 1]} />}
            {shape.type === 'sphere' && <sphereGeometry args={[0.6, 32, 32]} />}
            {shape.type === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 100]} />}
            {shape.type === 'icosahedron' && <icosahedronGeometry args={[0.7]} />}
            {shape.type === 'octahedron' && <octahedronGeometry args={[0.6]} />}
            {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[0.6]} />}
            <meshStandardMaterial color={color} wireframe transparent opacity={isLight ? 0.4 : 0.3} emissive={color} emissiveIntensity={0.2} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function ParticleField({ isLight }) {
  const pointsRef = useRef()
  const count = 1500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [])

  useFrame((state) => {
    if (pointsRef.current) pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={isLight ? '#6366f1' : '#00d4ff'} transparent opacity={isLight ? 0.4 : 0.6} />
    </points>
  )
}

function Scene({ isLight }) {
  useFrame(({ camera }) => {
    camera.position.x = Math.sin(Date.now() * 0.0001) * 0.5
    camera.position.y = Math.cos(Date.now() * 0.0001) * 0.3
  })

  return (
    <>
      <color attach="background" args={[isLight ? '#f8fafc' : '#0a0a0f']} />
      <fog attach="fog" args={[isLight ? '#f8fafc' : '#0a0a0f', 10, 50]} />
      <ambientLight intensity={isLight ? 0.6 : 0.2} />
      <pointLight position={[10, 10, 10]} intensity={isLight ? 0.8 : 0.5} color={isLight ? '#6366f1' : '#00d4ff'} />
      <pointLight position={[-10, -10, -10]} intensity={isLight ? 0.4 : 0.3} color="#8b5cf6" />
      <FloatingShapes isLight={isLight} />
      <ParticleField isLight={isLight} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color={isLight ? '#e2e8f0' : '#12121a'} transparent opacity={isLight ? 0.6 : 0.8} />
      </mesh>
      <Stars radius={100} depth={50} count={isLight ? 500 : 1000} factor={4} fade speed={1} />
    </>
  )
}

function ThreeEnvironment() {
  const { theme } = useSelector((state) => state.ui)
  const isLight = theme === 'light'

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <Suspense fallback={null}>
          <Scene isLight={isLight} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeEnvironment