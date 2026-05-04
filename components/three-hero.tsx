"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

/* ─── Atom: nucleus + orbiting electrons ─── */
function buildAtom(scene: THREE.Scene) {
  const group = new THREE.Group();

  const nucleusMat = new THREE.MeshStandardMaterial({
    color: "#e74c3c",
    emissive: new THREE.Color("#e74c3c"),
    emissiveIntensity: 0.5,
    roughness: 0.3,
    metalness: 0.4,
  });
  const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), nucleusMat);
  group.add(nucleus);

  const orbitalMat = new THREE.MeshBasicMaterial({ color: "#d4a843", transparent: true, opacity: 0.3 });
  const electronMat = new THREE.MeshStandardMaterial({
    color: "#3498db",
    emissive: new THREE.Color("#3498db"),
    emissiveIntensity: 0.8,
  });

  const orbits: { angle: number; rx: number; ry: number; rz: number; speed: number; mesh: THREE.Mesh }[] = [];

  [[0, 0, 0.8], [Math.PI / 3, Math.PI / 4, 1.0], [-Math.PI / 3, -Math.PI / 4, 0.9]].forEach(
    ([rx, ry, rad], i) => {
      const torus = new THREE.Mesh(new THREE.TorusGeometry(rad, 0.012, 12, 80), orbitalMat);
      torus.rotation.set(rx, ry, 0);
      group.add(torus);

      const electron = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), electronMat);
      const electronWrapper = new THREE.Group();
      electronWrapper.rotation.set(rx, ry, 0);
      electronWrapper.add(electron);
      group.add(electronWrapper);

      orbits.push({ angle: (i * Math.PI * 2) / 3, rx, ry, rz: 0, speed: 1.2 + i * 0.3, mesh: electron });
      electron.userData = { orbitRadius: rad, orbitRx: rx, orbitRy: ry, orbitWrapper: electronWrapper };
    }
  );

  group.position.set(-3.8, 1.8, 0.5);
  group.scale.setScalar(1.0);
  scene.add(group);

  gsap.from(group.position, { x: -8, duration: 1.4, ease: "back.out(1.4)", delay: 0.4 });
  gsap.from(group.scale, { x: 0, y: 0, z: 0, duration: 1.4, ease: "back.out(1.7)", delay: 0.4 });

  return { group, orbits };
}

/* ─── DNA double helix ─── */
function buildDNA(scene: THREE.Scene) {
  const group = new THREE.Group();
  const strandA: THREE.Mesh[] = [];
  const strandB: THREE.Mesh[] = [];
  const rungs: THREE.Mesh[] = [];
  const count = 28;
  const height = 5;
  const radius = 0.35;
  const matA = new THREE.MeshStandardMaterial({ color: "#1a6fc4", emissive: new THREE.Color("#1a6fc4"), emissiveIntensity: 0.4, metalness: 0.5 });
  const matB = new THREE.MeshStandardMaterial({ color: "#d4a843", emissive: new THREE.Color("#d4a843"), emissiveIntensity: 0.4, metalness: 0.5 });
  const rungMat = new THREE.MeshStandardMaterial({ color: "#ffffff", transparent: true, opacity: 0.35 });

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 4;
    const y = (t - 0.5) * height;

    const bA = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), matA);
    bA.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    group.add(bA);
    strandA.push(bA);

    const bB = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), matB);
    bB.position.set(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
    group.add(bB);
    strandB.push(bB);

    if (i % 3 === 0) {
      const rungGeo = new THREE.CylinderGeometry(0.015, 0.015, radius * 2, 8);
      const rung = new THREE.Mesh(rungGeo, rungMat);
      rung.position.set(0, y, 0);
      rung.rotation.z = Math.PI / 2;
      rung.rotation.y = angle;
      group.add(rung);
      rungs.push(rung);
    }
  }

  group.position.set(4.2, 0, -0.5);
  scene.add(group);

  gsap.from(group.position, { x: 9, duration: 1.6, ease: "back.out(1.2)", delay: 0.6 });
  gsap.from(group.scale, { x: 0, y: 0, z: 0, duration: 1.6, ease: "elastic.out(1, 0.5)", delay: 0.6 });

  return { group };
}

/* ─── Open book ─── */
function buildOpenBook(scene: THREE.Scene) {
  const group = new THREE.Group();

  const coverMat = new THREE.MeshStandardMaterial({ color: "#1a4a8a", roughness: 0.4, metalness: 0.2 });
  const pageMat = new THREE.MeshStandardMaterial({ color: "#fdfbf3", roughness: 0.9 });
  const spineMat = new THREE.MeshStandardMaterial({ color: "#0f2d5a", roughness: 0.3, metalness: 0.3 });
  const lineMat = new THREE.MeshBasicMaterial({ color: "#bdc3c7" });

  // Spine
  const spine = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.5, 1.2), spineMat);
  group.add(spine);

  // Left cover (open ~100 deg)
  const leftGroup = new THREE.Group();
  leftGroup.position.set(-0.04, 0, 0);
  const leftCover = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.5, 0.04), coverMat);
  leftCover.position.set(-0.55, 0, 0);
  leftGroup.add(leftCover);
  const leftPage = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.42, 0.015), pageMat);
  leftPage.position.set(-0.55, 0, 0.025);
  leftGroup.add(leftPage);
  leftGroup.rotation.y = -1.1;
  group.add(leftGroup);

  // Right cover
  const rightGroup = new THREE.Group();
  rightGroup.position.set(0.04, 0, 0);
  const rightCover = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.5, 0.04), coverMat);
  rightCover.position.set(0.55, 0, 0);
  rightGroup.add(rightCover);
  const rightPage = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.42, 0.015), pageMat);
  rightPage.position.set(0.55, 0, 0.025);
  rightGroup.add(rightPage);
  rightGroup.rotation.y = 1.1;
  group.add(rightGroup);

  // Text lines on pages
  for (let i = 0; i < 7; i++) {
    const lw = 0.6 + (i % 3) * 0.1;
    const line = new THREE.Mesh(new THREE.BoxGeometry(lw, 0.02, 0.001), lineMat);
    line.position.set(-0.55, 0.45 - i * 0.13, 0.033);
    leftGroup.add(line);
    const line2 = new THREE.Mesh(new THREE.BoxGeometry(lw, 0.02, 0.001), lineMat);
    line2.position.set(0.55, 0.45 - i * 0.13, 0.033);
    rightGroup.add(line2);
  }

  group.position.set(-0.5, -1.8, 1.5);
  group.rotation.x = 0.3;
  group.scale.setScalar(1.1);
  scene.add(group);

  gsap.from(group.position, { y: -5, duration: 1.5, ease: "back.out(1.5)", delay: 0.8 });
  gsap.from(group.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: "back.out(2)", delay: 0.8 });

  return { group };
}

/* ─── Floating pencil ─── */
function buildPencil(scene: THREE.Scene, position: [number, number, number], delay = 0) {
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: "#f4d03f", roughness: 0.5 });
  const tipMat = new THREE.MeshStandardMaterial({ color: "#f0c070", roughness: 0.7 });
  const graphiteMat = new THREE.MeshStandardMaterial({ color: "#2c3e50", roughness: 0.3 });
  const bandMat = new THREE.MeshStandardMaterial({ color: "#c0c0c0", metalness: 0.8, roughness: 0.2 });
  const eraserMat = new THREE.MeshStandardMaterial({ color: "#f1948a", roughness: 0.6 });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.0, 6), bodyMat);
  group.add(body);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.18, 6), tipMat);
  tip.position.y = -0.59;
  group.add(tip);
  const graphite = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.08, 8), graphiteMat);
  graphite.position.y = -0.72;
  group.add(graphite);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.06, 12), bandMat);
  band.position.y = 0.54;
  group.add(band);
  const eraser = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.1, 12), eraserMat);
  eraser.position.y = 0.63;
  group.add(eraser);

  group.position.set(...position);
  group.rotation.set(0.3, 0.5, 0.8);
  scene.add(group);

  gsap.from(group.position, { y: position[1] - 6, duration: 1.4, ease: "elastic.out(1, 0.5)", delay });
  gsap.from(group.scale, { x: 0, y: 0, z: 0, duration: 1.0, ease: "back.out(2)", delay });

  return group;
}

/* ─── Floating math formula board ─── */
function buildFormulaSphere(scene: THREE.Scene) {
  const group = new THREE.Group();
  const count = 18;
  const symbols = ["π", "∑", "∫", "√", "∞", "Δ", "θ", "α", "E=mc²", "H₂O", "F=ma", "λ", "∇", "∂", "℃", "∮", "∏", "⊕"];
  const colors = ["#d4a843", "#1a6fc4", "#e74c3c", "#2ecc71", "#9b59b6", "#1abc9c"];

  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 2.8;

    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 128, 128);
    ctx.fillStyle = colors[i % colors.length];
    ctx.font = "bold 42px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.9;
    ctx.fillText(symbols[i % symbols.length], 64, 64);

    const tex = new THREE.CanvasTexture(canvas);
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.38, 0.38),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide })
    );
    mesh.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    mesh.userData = { basePos: mesh.position.clone(), speed: 0.5 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2 };
    group.add(mesh);
  }

  scene.add(group);
  return { group };
}

/* ─── Particles field ─── */
function buildParticles(scene: THREE.Scene, count: number) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 22;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 22;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.028, color: "#d4a843", transparent: true, opacity: 0.55, sizeAttenuation: true }));
  scene.add(pts);
  return pts;
}

/* ─── Stars ─── */
function buildStars(scene: THREE.Scene, count: number) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 18 + Math.random() * 40;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.07, color: "#ffffff", transparent: true, opacity: 0.4, sizeAttenuation: true }));
  scene.add(pts);
  return pts;
}

/* ─── Main Component ─── */
export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    const scaleFactor = isMobile ? 0.58 : isTablet ? 0.78 : 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, container.clientWidth / container.clientHeight, 0.1, 200);
    camera.position.set(0, 0, isMobile ? 9 : 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.PointLight(0xffffff, 2.5, 40);
    keyLight.position.set(8, 8, 8);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x1a6fc4, 1.5, 30);
    fillLight.position.set(-8, 4, -4);
    scene.add(fillLight);
    const rimLight = new THREE.PointLight(0xd4a843, 1.2, 30);
    rimLight.position.set(0, -6, 6);
    scene.add(rimLight);

    // Build scene objects
    const { group: atomGroup, orbits } = buildAtom(scene);
    const { group: dnaGroup } = buildDNA(scene);
    const { group: bookGroup } = buildOpenBook(scene);
    const pencil1 = buildPencil(scene, [2.8, 2.2, 0.5], 1.0);
    const pencil2 = buildPencil(scene, [-2.2, -1.5, 0.8], 1.2);
    const { group: formulaGroup } = buildFormulaSphere(scene);
    const particles = buildParticles(scene, isMobile ? 200 : 350);
    const stars = buildStars(scene, isMobile ? 500 : 900);

    // Apply scale factor
    [atomGroup, dnaGroup, bookGroup, pencil1, pencil2, formulaGroup].forEach((g) => {
      g.scale.multiplyScalar(scaleFactor);
    });

    // Electron orbit angles
    const electronAngles = orbits.map((o) => o.angle);

    // Mouse / touch tracking
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const clock = new THREE.Clock();
    let animId: number;

    // GSAP continuous timeline for book floating
    gsap.to(bookGroup.position, {
      y: bookGroup.position.y + 0.25,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    gsap.to(bookGroup.rotation, {
      y: bookGroup.rotation.y + 0.15,
      duration: 5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(pencil1.rotation, {
      z: pencil1.rotation.z + 0.3,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    gsap.to(pencil2.rotation, {
      z: pencil2.rotation.z - 0.25,
      duration: 3.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Atom
      atomGroup.rotation.y += 0.005;

      // Electron orbits
      orbits.forEach((orbit, i) => {
        electronAngles[i] += orbit.speed * 0.012;
        const a = electronAngles[i];
        const r = orbit.mesh.userData.orbitRadius;
        const wrapper: THREE.Group = orbit.mesh.userData.orbitWrapper;
        orbit.mesh.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
      });

      // DNA spin
      dnaGroup.rotation.y += 0.007;
      dnaGroup.position.y = Math.sin(t * 0.4) * 0.18;

      // Formula sphere billboard + float
      formulaGroup.rotation.y += 0.003;
      formulaGroup.children.forEach((child) => {
        const m = child as THREE.Mesh;
        if (m.userData.basePos) {
          const bp = m.userData.basePos as THREE.Vector3;
          m.position.y = bp.y + Math.sin(t * m.userData.speed + m.userData.phase) * 0.12;
          m.lookAt(camera.position);
        }
      });

      // Particles slow drift
      particles.rotation.y = t * 0.018;
      particles.rotation.x = Math.sin(t * 0.01) * 0.08;

      stars.rotation.y = t * 0.004;

      // Camera parallax
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.025;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf([bookGroup.position, bookGroup.rotation, pencil1.rotation, pencil2.rotation]);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
