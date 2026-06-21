import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";

const ImageMesh = ({ image }) => {
  const mesh = useRef();
  const texture = useLoader(TextureLoader, image);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    const mouseX = (state.mouse.x + 1) / 2;
    const mouseY = (state.mouse.y + 1) / 2;

    mesh.current.material.uniforms.uTime.value = t;

    // smooth follow (lerp effect)
    mesh.current.material.uniforms.uMouse.value[0] +=
      (mouseX - mesh.current.material.uniforms.uMouse.value[0]) * 0.08;

    mesh.current.material.uniforms.uMouse.value[1] +=
      (mouseY - mesh.current.material.uniforms.uMouse.value[1]) * 0.08;

    // 🔥 ADD PARALLAX ROTATION
    mesh.current.rotation.y = (state.mouse.x * Math.PI) / 12;
    mesh.current.rotation.x = (-state.mouse.y * Math.PI) / 12;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[3, 2, 32, 32]} />

      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
          uTexture: { value: texture },
          uMouse: { value: [0, 0] },
        }}
        vertexShader={`
            uniform float uTime;
            uniform vec2 uMouse;

            varying vec2 vUv;

            void main() {
            vUv = uv;

            vec3 pos = position;

            float dist = distance(uv, uMouse);

            // 🔥 wave distortion
            pos.z += sin((pos.x + uTime) * 4.0) * 0.15;
            pos.z += cos((pos.y + uTime) * 4.0) * 0.15;

            // 🔥 mouse ripple
            pos.z += (0.3 - dist) * 0.8;

            // 🔥 subtle bulge center
            pos.z += exp(-dist * 8.0) * 0.25;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
            uniform sampler2D uTexture;
            uniform float uTime;
            uniform vec2 uMouse;

            varying vec2 vUv;

            void main() {

            vec2 uv = vUv;

            float dist = distance(uv, uMouse);

            // 🔥 LIQUID UV DISTORTION (GAME CHANGER)
            uv.x += sin(uv.y * 8.0 + uTime * 2.0) * 0.02;
            uv.y += cos(uv.x * 8.0 + uTime * 2.0) * 0.02;

            // 🔥 mouse suction effect
            uv += (uv - uMouse) * -0.15 * exp(-dist * 6.0);

            vec4 color = texture2D(uTexture, uv);

            // 🔥 slight glow boost
            color.rgb += 0.05;

            gl_FragColor = color;
            }
        `}
      />
    </mesh>
  );
};

const DistortedImage = ({ image }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 2.5] }}
      >
        <ImageMesh image={image} />
      </Canvas>
    </div>
  );
};

export default DistortedImage;
