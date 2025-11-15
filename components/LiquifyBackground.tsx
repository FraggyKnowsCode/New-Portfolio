import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 u_resolution;
  uniform float u_time;
  varying vec2 vUv;

  // --- UTILITY FUNCTIONS ---
  // Simple pseudo-random number generator
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // 2D Value Noise function
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x),
      mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Fractional Brownian Motion (FBM) for creating detailed noise
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 st = vUv;
    st.x *= u_resolution.x / u_resolution.y; // Aspect ratio correction

    // --- DISTORTION ---
    vec2 distorted_uv = st;
    float time = u_time * 0.1;
    
    // Add a slow, wavy horizontal motion
    distorted_uv.y += sin(distorted_uv.x * 3.0 + time) * 0.1;
    
    // Add noise-based distortion for a more organic, swirling feel
    float distortion_noise = fbm(st * 2.0 + time);
    distorted_uv += (distortion_noise - 0.5) * 0.2;

    // --- COLOR PALETTE (Inspired by reference image) ---
    vec3 color_orange = vec3(0.95, 0.35, 0.1);
    vec3 color_cyan = vec3(0.2, 0.7, 0.8);
    vec3 color_dark_blue = vec3(0.1, 0.2, 0.4);
    vec3 color_black = vec3(0.0, 0.0, 0.0);
    vec3 color_highlight = vec3(0.85, 0.9, 0.95);

    // --- COLORING ---
    // Create a base gradient from orange to blue based on the distorted vertical position
    float vertical_boundary = 0.45;
    vec3 color = mix(color_orange, color_dark_blue, smoothstep(vertical_boundary - 0.2, vertical_boundary + 0.2, distorted_uv.y));

    // Layer in the cyan and highlights using another noise pattern
    float highlight_noise = fbm(distorted_uv * 3.5 + 20.0);
    color = mix(color, color_cyan, smoothstep(0.5, 0.6, highlight_noise));
    color = mix(color, color_highlight, smoothstep(0.7, 0.75, highlight_noise));

    // --- MASKING ---
    // Fade to black at the top and bottom to create depth
    float edge_vignette = 1.0 - abs(vUv.y - 0.5) * 1.8;
    color *= smoothstep(0.0, 1.0, edge_vignette);

    // --- GRAIN ---
    // Increase grain intensity to match the reference
    float grain = (random(vUv * (u_time * 1.5)) - 0.5) * 0.25;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const LiquifyBackground: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({});
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                u_time: { value: 0 },
            },
            vertexShader,
            fragmentShader,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        const clock = new THREE.Clock();

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            material.uniforms.u_time.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default LiquifyBackground;