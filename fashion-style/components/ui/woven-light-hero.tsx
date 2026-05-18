"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';

export const WovenLightHero = () => {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    textControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08 + 1.2,
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }));
    buttonControls.start({
        opacity: 1,
        transition: { delay: 2.2, duration: 0.8 }
    });

    return () => {
        if (document.head.contains(link)) {
            document.head.removeChild(link);
        }
    }
  }, [textControls, buttonControls]);

  const headline = "Ayesha Siddiqa";
  
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Premium dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
      
      {/* Soft golden glow overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-yellow-500/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-600/3 blur-[180px]" />
      </div>
      
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
      
      <WovenCanvas />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="inline-block text-xs font-medium tracking-[0.35em] text-amber-400/80 uppercase mb-6"
          >
            New Collection 2026
          </motion.span>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {headline.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-4">
                    {word.split("").map((char, j) => (
                        <motion.span 
                            key={j} 
                            custom={i * 5 + j} 
                            initial={{ opacity: 0, y: 40 }} 
                            animate={textControls} 
                            style={{ display: 'inline-block', textShadow: '0 0 60px rgba(251, 191, 36, 0.15)' }}
                            className="text-white"
                        >
                            {char}
                        </motion.span>
                    ))}
                    {i < headline.split(" ").length - 1 && <span>&nbsp;</span>}
                </span>
            ))}
          </h1>
          
          <motion.p
            custom={headline.length}
            initial={{ opacity: 0, y: 20 }}
            animate={textControls}
            className="mx-auto mt-8 max-w-xl text-base sm:text-lg text-neutral-400 font-light leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            An interactive tapestry of light and motion, crafted with code and creativity.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={buttonControls} className="mt-12">
            <Link 
                href="/#products"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-amber-500/30 bg-amber-500/10 px-12 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-amber-500/20 hover:border-amber-400/50"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="relative z-10 text-white group-hover:text-amber-200 transition-colors">Explore Collection</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </div>
  );
};

const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 3, duration: 1 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
  >
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col items-center gap-2"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Scroll</span>
      <div className="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-1">
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-2 bg-amber-400/60 rounded-full"
        />
      </div>
    </motion.div>
  </motion.div>
);

const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const particleCount = 35000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(2, 0.5, 128, 20);

    for (let i = 0; i < particleCount; i++) {
        const vertexIndex = i % torusKnot.attributes.position.count;
        const x = torusKnot.attributes.position.getX(vertexIndex);
        const y = torusKnot.attributes.position.getY(vertexIndex);
        const z = torusKnot.attributes.position.getZ(vertexIndex);
        
        positions[i * 3] = x + (Math.random() - 0.5) * 0.05;
        positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.05;
        positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.05;
        
        originalPositions[i * 3] = positions[i * 3];
        originalPositions[i * 3 + 1] = positions[i * 3 + 1];
        originalPositions[i * 3 + 2] = positions[i * 3 + 2];

        // Golden/warm palette
        const color = new THREE.Color();
        const goldenHue = Math.random() * 0.12 + 0.08; // Orange to yellow range
        const saturation = 0.7 + Math.random() * 0.3;
        const lightness = 0.5 + Math.random() * 0.25;
        color.setHSL(goldenHue, saturation, lightness);
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        velocities[i * 3] = 0;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.012,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
        depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Add subtle point lights for golden glow
    const light1 = new THREE.PointLight(0xfcd34d, 0.5, 10);
    light1.position.set(2, 2, 2);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0xfbbf24, 0.3, 10);
    light2.position.set(-2, -1, 2);
    scene.add(light2);

    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        const mouseWorld = new THREE.Vector3(mouse.x * 5, mouse.y * 5, 0);

        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            const currentPos = new THREE.Vector3(positions[ix], positions[iy], positions[iz]);
            const originalPos = new THREE.Vector3(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
            const velocity = new THREE.Vector3(velocities[ix], velocities[iy], velocities[iz]);

            const dist = currentPos.distanceTo(mouseWorld);
            if (dist < 2.5) {
                const force = (2.5 - dist) * 0.006;
                const direction = new THREE.Vector3().subVectors(currentPos, mouseWorld).normalize();
                velocity.add(direction.multiplyScalar(force));
            }

            const returnForce = new THREE.Vector3().subVectors(originalPos, currentPos).multiplyScalar(0.003);
            velocity.add(returnForce);
            velocity.multiplyScalar(0.96);

            positions[ix] += velocity.x;
            positions[iy] += velocity.y;
            positions[iz] += velocity.z;
            
            velocities[ix] = velocity.x;
            velocities[iy] = velocity.y;
            velocities[iz] = velocity.z;
        }
        geometry.attributes.position.needsUpdate = true;

        points.rotation.y = elapsedTime * 0.03;
        points.rotation.x = Math.sin(elapsedTime * 0.08) * 0.05;
        
        // Subtle light movement
        light1.position.x = Math.sin(elapsedTime * 0.5) * 3;
        light1.position.y = Math.cos(elapsedTime * 0.3) * 2;
        
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-[1]" />;
};

export default WovenLightHero;