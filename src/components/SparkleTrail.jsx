import { useEffect, useRef } from 'react';

export default function SparkleTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles = [];
    let mouse = { x: width/2, y: height/2 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      mouse.x = e.clientX || (e.touches && e.touches[0].clientX);
      mouse.y = e.clientY || (e.touches && e.touches[0].clientY);
      
      for(let i=0; i<2; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          size: Math.random() * 8 + 4,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          life: 1,
          color: Math.random() > 0.5 ? '#f472b6' : '#fb7185' // pink or rose
        });
      }
    };
    
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.globalAlpha = p.life;
        
        // Draw a heart
        ctx.fillStyle = p.color;
        ctx.beginPath();
        let s = p.size;
        ctx.moveTo(0, s/4);
        ctx.bezierCurveTo(0, -s/4, -s/2, -s/4, -s/2, s/4);
        ctx.bezierCurveTo(-s/2, s*3/4, 0, s, 0, s*1.2);
        ctx.bezierCurveTo(0, s, s/2, s*3/4, s/2, s/4);
        ctx.bezierCurveTo(s/2, -s/4, 0, -s/4, 0, s/4);
        ctx.fill();
        ctx.restore();

        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.02;
      }
      
      particles = particles.filter(p => p.life > 0);
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} id="sparkle-container" />;
}
