import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface BackgroundProps {
  isCelebrating: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ isCelebrating }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const objectsGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    objectsGroupRef.current = group;
    scene.add(group);

    const createIconTexture = (char: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = '90px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(char, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const heartTexture = createIconTexture('💖');
    const flowerTexture = createIconTexture('🌸');
    const teddyTexture = createIconTexture('🧸');
    const sparkleTexture = createIconTexture('✨');
    const roseTexture = createIconTexture('🌹');
    const bunnyTexture = createIconTexture('🐰');

    const textures = [heartTexture, flowerTexture, teddyTexture, sparkleTexture, roseTexture, bunnyTexture];

    // Metallic Rose Gold Charms
    const roseGoldMat = new THREE.MeshStandardMaterial({
      color: 0xb76e79,
      metalness: 0.9,
      roughness: 0.1,
    });

    // Heart Shape for 3D Charms
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
    heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
    heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
    heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05 });

    const animatedObjects: { obj: THREE.Object3D; initialPos: THREE.Vector3; speed: number; offset: number }[] = [];

    // Increase density to 120 items for a "filled" feel
    for (let i = 0; i < 120; i++) {
      let object: THREE.Object3D;
      
      if (i % 5 === 0) {
        // 3D Rose Gold Heart Charm
        object = new THREE.Mesh(heartGeo, roseGoldMat.clone());
        const s = 0.2 + Math.random() * 0.4;
        object.scale.set(s, s, s);
        object.rotation.x = Math.PI;
      } else {
        // Sprite Icons
        const texture = textures[Math.floor(Math.random() * textures.length)];
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.7 });
        object = new THREE.Sprite(material);
        const s = 0.4 + Math.random() * 1.2;
        object.scale.set(s, s, 1);
      }
      
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20 - 5
      );
      object.position.copy(pos);
      
      group.add(object);
      animatedObjects.push({
        obj: object,
        initialPos: pos.clone(),
        speed: 0.15 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2
      });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);
    
    const pinkLight = new THREE.PointLight(0xffb7c5, 2.5);
    pinkLight.position.set(10, 10, 15);
    scene.add(pinkLight);

    const goldLight = new THREE.PointLight(0xffd700, 2);
    goldLight.position.set(-10, -10, 10);
    scene.add(goldLight);

    camera.position.z = 18;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    const animate = (time: number) => {
      const t = time * 0.001;
      
      group.position.x += (mouseRef.current.x * 3 - group.position.x) * 0.03;
      group.position.y += (mouseRef.current.y * 3 - group.position.y) * 0.03;

      animatedObjects.forEach((s) => {
        if (!isCelebrating) {
          s.obj.position.y = s.initialPos.y + Math.sin(t * s.speed + s.offset) * 1.2;
          s.obj.position.x = s.initialPos.x + Math.cos(t * s.speed * 0.6 + s.offset) * 0.6;
          if (s.obj instanceof THREE.Mesh) {
            s.obj.rotation.y += 0.02;
            s.obj.rotation.z += 0.01;
          }
        }
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate(0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (isCelebrating && objectsGroupRef.current) {
      objectsGroupRef.current.children.forEach((child) => {
        gsap.to(child.position, {
          x: (Math.random() - 0.5) * 150,
          y: 60,
          z: -60,
          duration: 4,
          ease: 'power3.inOut',
          delay: Math.random() * 0.7
        });
        gsap.to(child.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: 'power3.inOut'
        });
      });
    }
  }, [isCelebrating]);

  return (
    <>
      <div className="aurora-bg">
        <div className="aurora-blob w-[900px] h-[900px] -top-60 -left-40 bg-[#fecaca]"></div>
        <div className="aurora-blob w-[800px] h-[800px] top-1/4 -right-60 bg-[#fef3c7]"></div>
        <div className="aurora-blob w-[1000px] h-[1000px] -bottom-60 left-1/3 bg-[#fbcfe8]"></div>
        <div className="aurora-blob w-[700px] h-[700px] bottom-1/4 right-1/4 bg-[#fda4af]"></div>
      </div>
      <div ref={containerRef} className="fixed inset-0 z-[-1]" />
    </>
  );
};