'use client';

import { useEffect, useRef } from 'react';

type ParticleCanvasProps = {
  className?: string;
  count?: number;
  color?: string;
  maxRadius?: number;
  speed?: number;
};

export default function ParticleCanvas({
  className = '',
  count = 80,
  color = '#2e5c8a',
  maxRadius = 2.5,
  speed = 0.3,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    let animId = 0;
    let disposed = false;
    let io: IntersectionObserver | null = null;

    async function init() {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const THREE = await import('three');
      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.z = 30;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      // パーティクル生成
      const positions = new Float32Array(count * 3);
      const velocities: { vx: number; vy: number }[] = [];

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        velocities.push({
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
        });
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const r = parseInt(color.slice(1, 3), 16) / 255;
      const g = parseInt(color.slice(3, 5), 16) / 255;
      const b = parseInt(color.slice(5, 7), 16) / 255;

      const material = new THREE.PointsMaterial({
        color: new THREE.Color(r, g, b),
        size: maxRadius,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.35,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // 初回描画（アニメーション無効時も1フレームは描画する）
      renderer.render(scene, camera);

      let isVisible = false;

      function animate() {
        if (disposed || !isVisible) return; // 画面外ならループ停止
        animId = requestAnimationFrame(animate);
        const pos = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
          pos[i * 3] += velocities[i].vx;
          pos[i * 3 + 1] += velocities[i].vy;
          if (Math.abs(pos[i * 3]) > 30) velocities[i].vx *= -1;
          if (Math.abs(pos[i * 3 + 1]) > 20) velocities[i].vy *= -1;
        }
        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      }

      if (!prefersReducedMotion) {
        io = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            animate();
          }
        });
        io.observe(canvas);
      }

      const ro = new ResizeObserver(() => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        if (prefersReducedMotion || !isVisible) {
          renderer.render(scene, camera); // リサイズ時の再描画
        }
      });
      ro.observe(canvas);

      // クリーンアップ関数を返す
      return () => {
        io?.disconnect();
        cancelAnimationFrame(animId);
        ro.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      cleanup?.();
    };
  }, [count, color, maxRadius, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    />
  );
}
