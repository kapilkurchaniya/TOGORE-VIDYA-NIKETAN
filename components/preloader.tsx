"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export default function Preloader() {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: import("three").WebGLRenderer | null = null;
    let animationId: number;

    const init = async () => {
      const THREE = await import("three");
      const { gsap } = await import("gsap");

      if (!mountRef.current) return;

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;

      // Responsive scale factor
      const scale = isMobile ? 0.62 : isTablet ? 0.82 : 1.0;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#0b1629");

      const W = window.innerWidth;
      const H = window.innerHeight;

      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      // Move camera back more on mobile so book fits
      camera.position.set(0, 0.3 * scale, isMobile ? 7 : 5.5);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      mountRef.current.appendChild(renderer.domElement);

      // Lighting
      const ambient = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambient);

      const keyLight = new THREE.DirectionalLight(0xfff5dd, 1.8);
      keyLight.position.set(4, 6, 5);
      keyLight.castShadow = true;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x2244aa, 0.5);
      fillLight.position.set(-4, -2, 3);
      scene.add(fillLight);

      const goldenPoint = new THREE.PointLight(0xd4a843, 0, 8);
      goldenPoint.position.set(0, 0.5, 2);
      scene.add(goldenPoint);

      // Textures
      const loader = new THREE.TextureLoader();
      const logoTex = loader.load("/images/logo.png");

      // Materials
      const coverMat = new THREE.MeshStandardMaterial({
        color: 0x0d2151,
        roughness: 0.35,
        metalness: 0.25,
      });
      const coverInsideMat = new THREE.MeshStandardMaterial({
        color: 0x0a1840,
        roughness: 0.6,
      });
      const spineMat = new THREE.MeshStandardMaterial({
        color: 0x071230,
        roughness: 0.4,
        metalness: 0.5,
      });
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xd4a843,
        roughness: 0.15,
        metalness: 0.95,
        emissive: new THREE.Color(0xd4a843),
        emissiveIntensity: 0.15,
      });
      const pageMat = (i: number) => {
        const v = 0.86 + i * 0.025;
        return new THREE.MeshStandardMaterial({
          color: new THREE.Color(v, v * 0.97, v * 0.9),
          roughness: 0.92,
        });
      };
      const logoMat = new THREE.MeshStandardMaterial({
        map: logoTex,
        transparent: true,
        roughness: 0.4,
        alphaTest: 0.05,
      });

      // Book dimensions (scaled)
      const cW = 1.3 * scale;   // cover half-width
      const cH = 1.8 * scale;   // cover half-height
      const cD = 0.07 * scale;  // cover thickness
      const spW = 0.22 * scale; // spine width
      const pageCount = 7;

      // Master book group — spine sits at x=0
      const book = new THREE.Group();
      scene.add(book);

      // --- Spine ---
      const spineMesh = new THREE.Mesh(
        new THREE.BoxGeometry(spW, cH * 2, cD * 2 + 0.01 * scale),
        spineMat
      );
      book.add(spineMesh);

      // Gold trim strips on spine
      const trimGeo = new THREE.BoxGeometry(spW + 0.015 * scale, 0.05 * scale, cD * 2 + 0.02 * scale);
      [cH - 0.025 * scale, -(cH - 0.025 * scale)].forEach((y) => {
        const t = new THREE.Mesh(trimGeo, goldMat);
        t.position.y = y;
        book.add(t);
      });

      // --- Back cover group (hinge at spine right edge) ---
      const backGroup = new THREE.Group();
      backGroup.position.set(spW / 2, 0, 0);
      book.add(backGroup);

      const backMesh = new THREE.Mesh(
        new THREE.BoxGeometry(cW * 2, cH * 2, cD),
        [coverMat, coverMat, coverMat, coverMat, coverMat, coverInsideMat]
      );
      backMesh.position.set(cW, 0, -cD - 0.005 * scale);
      backMesh.castShadow = true;
      backMesh.receiveShadow = true;
      backGroup.add(backMesh);

      // Pages block (sits inside back cover edge)
      const pageBlock = new THREE.Mesh(
        new THREE.BoxGeometry(cW * 1.95, cH * 1.96, cD * 2.8),
        pageMat(0)
      );
      pageBlock.position.set(cW * 0.975, 0, -cD * 0.4);
      backGroup.add(pageBlock);

      // --- Front cover group (hinge at spine right edge, opens left) ---
      const frontGroup = new THREE.Group();
      frontGroup.position.set(spW / 2, 0, 0);
      book.add(frontGroup);

      const frontMesh = new THREE.Mesh(
        new THREE.BoxGeometry(cW * 2, cH * 2, cD),
        [coverMat, coverMat, coverMat, coverMat, coverInsideMat, coverMat]
      );
      frontMesh.position.set(cW, 0, cD + 0.005 * scale);
      frontMesh.castShadow = true;
      frontGroup.add(frontMesh);

      // Logo on front cover face
      const logoPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(cW * 1.1, cW * 1.1),
        logoMat
      );
      logoPlane.position.set(cW, cH * 0.12, cD + cD + 0.012 * scale);
      frontGroup.add(logoPlane);

      // Gold title bar
      const titleBar = new THREE.Mesh(
        new THREE.BoxGeometry(cW * 1.55, 0.1 * scale, 0.008 * scale),
        goldMat
      );
      titleBar.position.set(cW, -(cH - 0.32 * scale), cD + cD + 0.009 * scale);
      frontGroup.add(titleBar);

      // Gold border frame on front cover
      const makeBorderFrame = (bw: number, bh: number, cx: number, cy: number, z: number) => {
        const g = new THREE.Group();
        const thick = 0.025 * scale;
        const segs = [
          [bw, thick, cx, cy + bh / 2 - thick / 2],    // top
          [bw, thick, cx, cy - bh / 2 + thick / 2],    // bottom
          [thick, bh, cx - bw / 2 + thick / 2, cy],    // left
          [thick, bh, cx + bw / 2 - thick / 2, cy],    // right
        ];
        segs.forEach(([w, h, x, y]) => {
          const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.006 * scale), goldMat);
          m.position.set(x, y, z);
          g.add(m);
        });
        return g;
      };
      frontGroup.add(makeBorderFrame(cW * 1.82, cH * 1.88, cW, 0, cD + cD + 0.007 * scale));

      // --- Individual fan pages (hinged at spine, open one by one) ---
      const pageGroups: THREE.Group[] = [];
      for (let i = 0; i < pageCount; i++) {
        const pg = new THREE.Group();
        pg.position.set(spW / 2, 0, 0);
        book.add(pg);

        const pm = new THREE.Mesh(
          new THREE.BoxGeometry(cW * 1.96, cH * 1.94, 0.007 * scale),
          pageMat(i)
        );
        pm.position.set(cW * 0.975, 0, 0);
        pm.castShadow = true;
        pg.add(pm);

        // Closed: same angle as front cover (0 = no Y rotation)
        pg.rotation.y = 0;
        pageGroups.push(pg);
      }

      // Particles
      const pCount = isMobile ? 60 : 100;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3]     = (Math.random() - 0.5) * 7;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 6;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 5;
        pCol[i * 3]     = 0.83 + Math.random() * 0.12;
        pCol[i * 3 + 1] = 0.65 + Math.random() * 0.1;
        pCol[i * 3 + 2] = 0.26;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.035 * scale,
        vertexColors: true,
        transparent: true,
        opacity: 0,
        sizeAttenuation: true,
      });
      const particleSystem = new THREE.Points(pGeo, pMat);
      scene.add(particleSystem);

      // Ground plane for shadow
      const groundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.ShadowMaterial({ opacity: 0.3 })
      );
      groundMesh.rotation.x = -Math.PI / 2;
      groundMesh.position.y = -cH - 0.1;
      groundMesh.receiveShadow = true;
      scene.add(groundMesh);

      // ---- GSAP Timeline ----
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.7,
              ease: "power2.inOut",
              onComplete: () => setHidden(true),
            });
          }
        },
      });

      // 0-1.2s: book rises and rotates slightly to show front
      tl.from(book.position, { y: -3.5, duration: 1.2, ease: "power3.out" }, 0);
      tl.from(book.rotation, { x: -0.5, y: -1.4, duration: 1.2, ease: "power3.out" }, 0);

      // 1.2-2s: settle rotate to show cover face-on
      tl.to(book.rotation, { y: 0.25, x: 0.08, duration: 0.9, ease: "power2.inOut" }, 1.1);

      // Golden glow fires up
      tl.to(goldenPoint, { intensity: 3.5, duration: 0.9, ease: "power2.in" }, 1.8);

      // 2.4s: front cover swings open (rotates on Y hinge)
      tl.to(frontGroup.rotation, {
        y: -Math.PI * 0.86,
        duration: 1.5,
        ease: "power2.inOut",
      }, 2.3);

      // Pages fan out with stagger after cover starts moving
      pageGroups.forEach((pg, i) => {
        const angle = -Math.PI * 0.72 * ((i + 1) / pageCount);
        tl.to(pg.rotation, {
          y: angle,
          duration: 1.0,
          ease: "power1.inOut",
        }, 2.55 + i * 0.09);
      });

      // Particles drift in
      tl.to(pMat, { opacity: 0.75, duration: 0.7, ease: "power2.in" }, 2.8);

      // 4.0s: rotate to show open book spread
      tl.to(book.rotation, { y: 0, x: 0.18, duration: 0.9, ease: "power2.inOut" }, 3.8);

      // Hold + fade
      tl.to({}, { duration: 1.1 }, 4.7);

      // Render loop
      const clock = new THREE.Clock();
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        book.position.y += (Math.sin(t * 0.9) * 0.03 - book.position.y) * 0.02;
        // Drift particles upward
        const pos = pGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < pCount; i++) {
          (pos.array as Float32Array)[i * 3 + 1] += 0.004;
          if ((pos.array as Float32Array)[i * 3 + 1] > 3.5) {
            (pos.array as Float32Array)[i * 3 + 1] = -3.5;
          }
        }
        pos.needsUpdate = true;
        renderer!.render(scene, camera);
      };
      animate();

      // Resize handler — fully responsive
      const onResize = () => {
        if (!renderer) return;
        const rw = window.innerWidth;
        const rh = window.innerHeight;
        camera.aspect = rw / rh;
        camera.updateProjectionMatrix();
        renderer.setSize(rw, rh);
      };
      window.addEventListener("resize", onResize);

      return () => window.removeEventListener("resize", onResize);
    };

    init();

    return () => {
      cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
        if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ background: "#0b1629" }}
    >
      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Text overlay — positioned relative to viewport, safe on all screens */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end pb-12 md:pb-16 pointer-events-none"
      >
        <h1
          className="font-serif font-bold text-white text-2xl sm:text-3xl md:text-5xl tracking-wide mb-2 px-4 text-center text-balance"
          style={{
            animation: "preloaderFadeUp 1s ease-out 3.4s both",
            textShadow: "0 0 40px rgba(212,168,67,0.7)",
          }}
        >
          Tagore Vidya Niketan
        </h1>
        <p
          className="font-sans text-sm sm:text-base md:text-lg tracking-widest uppercase"
          style={{
            animation: "preloaderFadeUp 1s ease-out 3.8s both",
            color: "#d4a843",
          }}
        >
          Gadarwara &bull; Est. 1977
        </p>
      </div>

      <style>{`
        @keyframes preloaderFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
