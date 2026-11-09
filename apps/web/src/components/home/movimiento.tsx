import { useEffect } from 'react';

/*
 * Animaciones ligadas al desplazamiento (GSAP con ScrollTrigger, SplitText y DrawSVG).
 * Se cargan con la primera interacción (desplazar, tocar o usar el teclado) y solo si
 * la persona no pidió reducir el movimiento. Sin JavaScript todo se ve completo, y lo
 * que ya está en pantalla al iniciar no se toca, para que nada parpadee.
 */
export function Movimiento() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelado = false;
    let deshacer: (() => void) | undefined;

    let modulos: Promise<[typeof import('gsap'), typeof import('gsap/ScrollTrigger'), typeof import('gsap/SplitText'), typeof import('gsap/DrawSVGPlugin')]> | undefined;
    const cargar = () => modulos ??= Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
      import('gsap/DrawSVGPlugin'),
    ]);

    const iniciar = async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }, { DrawSVGPlugin }] = await cargar();
      if (cancelado) return;
      gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
      const pendiente = (el: Element | null): el is Element =>
        !!el && el.getBoundingClientRect().top > window.innerHeight * 0.9;
      const mm = gsap.matchMedia();

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.revela').forEach(titulo => {
          if (!pendiente(titulo)) return;
          SplitText.create(titulo, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: self => gsap.from(self.lines, {
              yPercent: 110,
              duration: 1,
              ease: 'expo.out',
              stagger: 0.08,
              scrollTrigger: { trigger: titulo, start: 'top 86%', once: true },
            }),
          });
        });

        // Portada: la credencial se aleja apenas al bajar.
        gsap.to('.portada-visual', {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: '.portada', start: 'top top', end: 'bottom top', scrub: true },
        });

        // Recibo: aparecen los conceptos, se resalta el 3 % y la flecha lleva a la cobertura.
        const escena = document.querySelector('.recibo-escena');
        if (pendiente(escena)) {
          gsap.timeline({ scrollTrigger: { trigger: escena, start: 'top 70%', once: true }, defaults: { ease: 'power3.out' } })
            .from('.recibo', { y: 40, rotation: -4, opacity: 0, duration: 0.9 })
            .from('.recibo-fila', { opacity: 0, x: -14, stagger: 0.09, duration: 0.5 }, '-=0.4')
            .from('.recibo-importe', { scaleX: 0, transformOrigin: 'left center', stagger: 0.09, duration: 0.6 }, '<0.1')
            .from('.recibo-marcador', { scaleX: 0, transformOrigin: 'left center', duration: 0.7, ease: 'power2.inOut' }, '+=0.1')
            .from('.recibo-flecha-trazo', { drawSVG: 0, duration: 0.9, ease: 'power2.inOut' }, '-=0.2')
            .from('.mini-credencial', { scale: 0.7, opacity: 0, duration: 0.6, ease: 'back.out(2)' }, '-=0.25');
        }

        // Tabla: los niveles se completan fila por fila y una lente recorre los criterios.
        const tabla = document.querySelector('.tabla');
        if (pendiente(tabla)) {
          gsap.from('.tabla .nivel i', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.5,
            ease: 'power2.out',
            stagger: { each: 0.025, from: 'start' },
            scrollTrigger: { trigger: tabla, start: 'top 72%', once: true },
          });
        }
        mm.add('(min-width: 760px)', () => {
          gsap.fromTo('.tabla-lente', { yPercent: 0 }, {
            yPercent: 500,
            ease: 'none',
            scrollTrigger: { trigger: '.tabla-marco', start: 'top 65%', end: 'bottom 45%', scrub: 0.6 },
          });
        });

        mm.add({ ancho: '(min-width: 760px)', angosto: '(max-width: 759px)' }, contexto => {
          const { ancho } = contexto.conditions as { ancho: boolean };
          gsap.fromTo('.pasos-avance', ancho ? { scaleX: 0 } : { scaleY: 0 }, {
            scaleX: 1,
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.pasos', start: 'top 80%', end: 'bottom 70%', scrub: 0.5 },
          });
        });
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      deshacer = () => { mm.revert(); ctx.revert(); };
    };

    const eventos = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
    // Si la primera interacción es un ancla con desplazamiento suave, armar ScrollTrigger
    // en el medio lo corta: los módulos se descargan ya, pero se arman cuando la página
    // deja de moverse.
    let quieto = 0;
    const alMoverse = () => {
      window.clearTimeout(quieto);
      quieto = window.setTimeout(() => {
        window.removeEventListener('scroll', alMoverse);
        if (!cancelado) void iniciar();
      }, 220);
    };
    const alInteractuar = () => {
      eventos.forEach(evento => window.removeEventListener(evento, alInteractuar));
      void cargar();
      window.addEventListener('scroll', alMoverse, { passive: true });
      alMoverse();
    };
    eventos.forEach(evento => window.addEventListener(evento, alInteractuar, { passive: true }));
    return () => {
      cancelado = true;
      window.clearTimeout(quieto);
      window.removeEventListener('scroll', alMoverse);
      eventos.forEach(evento => window.removeEventListener(evento, alInteractuar));
      deshacer?.();
    };
  }, []);

  return null;
}
