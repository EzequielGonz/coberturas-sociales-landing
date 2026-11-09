/*
 * Credencial en 3D (Three.js): una tarjeta con laca y brillo real que muestra el perfil
 * de cobertura. El frente se dibuja en un lienzo y se vuelve a dibujar con cada respuesta;
 * cuando el perfil se completa, la tarjeta da una vuelta entera. Se inclina con el puntero,
 * se gira con el dedo y flota apenas. Sin modelos ni archivos extra.
 */
type Three = typeof import('three');
type Entorno = typeof import('three/examples/jsm/environments/RoomEnvironment.js').RoomEnvironment;
type Caja = typeof import('three/examples/jsm/geometries/RoundedBoxGeometry.js').RoundedBoxGeometry;
export type Campo = { etiqueta: string; valor?: string };

export function crearCredencial(THREE: Three, RoomEnvironment: Entorno, RoundedBoxGeometry: Caja, canvas: HTMLCanvasElement, logo: HTMLImageElement) {
  const W = 1024, H = 640, ANCHO = 3.4, ALTO = ANCHO * (H / W), RADIO = 0.17;
  const lienzo = document.createElement('canvas'); lienzo.width = W; lienzo.height = H;
  const g = lienzo.getContext('2d')!;
  const dorso = document.createElement('canvas'); dorso.width = W; dorso.height = H;

  const redondeado = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  };
  const fondo = (c: CanvasRenderingContext2D) => {
    const rg = c.createRadialGradient(0, 0, 40, 0, 0, W * 1.1);
    rg.addColorStop(0, '#1b6a5e'); rg.addColorStop(0.55, '#0a332e'); rg.addColorStop(1, '#062420');
    c.fillStyle = rg; c.fillRect(0, 0, W, H);
    // la cinta del logo, de verde azulado a lima
    const lg = c.createLinearGradient(W * 0.55, H, W, H * 0.55);
    lg.addColorStop(0, '#00807a'); lg.addColorStop(1, '#a8e05f');
    c.save(); c.translate(W * 0.86, H * 0.92); c.rotate(-0.42);
    redondeado(c, -260, -60, 560, 120, 60); c.fillStyle = lg; c.fill(); c.restore();
    // guardas finas, como en las credenciales impresas
    c.strokeStyle = 'rgba(255,255,255,.05)'; c.lineWidth = 1;
    for (let i = 0; i < 18; i++) { c.beginPath(); c.arc(W * 0.98, -H * 0.1, 260 + i * 22, 0, Math.PI * 2); c.stroke(); }
  };
  const marca = (c: CanvasRenderingContext2D, x: number, y: number, s: number) => {
    redondeado(c, x, y, s, s, s * 0.26); c.fillStyle = '#fff'; c.fill();
    const k = (s * 0.74) / Math.max(logo.width, logo.height);
    c.drawImage(logo, x + (s - logo.width * k) / 2, y + (s - logo.height * k) / 2, logo.width * k, logo.height * k);
  };

  const dibujarFrente = (campos: Campo[]) => {
    g.clearRect(0, 0, W, H); fondo(g);
    marca(g, 64, 58, 78);
    g.fillStyle = 'rgba(255,255,255,.88)'; g.font = '700 30px Manrope, sans-serif'; g.textBaseline = 'middle';
    g.fillText('Compara Tu Obra Social', 162, 97);
    g.fillStyle = '#fff'; g.font = '800 54px Manrope, sans-serif'; g.textBaseline = 'alphabetic';
    g.fillText('Tu perfil de cobertura', 64, 248);
    campos.forEach((campo, i) => {
      const x = 64 + (i % 2) * 440, y = 330 + Math.floor(i / 2) * 120;
      g.font = '600 25px Manrope, sans-serif'; g.fillStyle = campo.valor ? '#a8e05f' : 'rgba(255,255,255,.55)';
      g.fillText(campo.etiqueta, x, y);
      if (campo.valor) { g.font = '700 34px Manrope, sans-serif'; g.fillStyle = '#fff'; g.fillText(campo.valor, x, y + 48, 400); }
      else { redondeado(g, x, y + 22, 290, 18, 9); g.fillStyle = 'rgba(255,255,255,.16)'; g.fill(); }
    });
    frente.needsUpdate = true;
  };
  {
    const c = dorso.getContext('2d')!; fondo(c);
    marca(c, W / 2 - 110, H / 2 - 170, 220);
    c.fillStyle = '#fff'; c.textAlign = 'center'; c.font = '800 46px Manrope, sans-serif';
    c.fillText('Compará con un asesor', W / 2, H / 2 + 120);
    c.fillStyle = 'rgba(255,255,255,.7)'; c.font = '600 28px Manrope, sans-serif';
    c.fillText('comparatuobrasocial.com', W / 2, H / 2 + 172);
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.outputColorSpace = THREE.SRGBColorSpace;
  const escena = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const entorno = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  escena.environment = entorno;
  const camara = new THREE.PerspectiveCamera(30, 1, 0.1, 50); camara.position.set(0, 0, 6.8);

  const frente = new THREE.CanvasTexture(lienzo); frente.colorSpace = THREE.SRGBColorSpace; frente.anisotropy = 8;
  const atras = new THREE.CanvasTexture(dorso); atras.colorSpace = THREE.SRGBColorSpace; atras.anisotropy = 8;
  const tarjeta = new THREE.Group();
  const cuerpoGeo = new RoundedBoxGeometry(ANCHO, ALTO, 0.07, 6, RADIO);
  const cuerpoMat = new THREE.MeshPhysicalMaterial({ color: '#0a332e', roughness: 0.4, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.12 });
  tarjeta.add(new THREE.Mesh(cuerpoGeo, cuerpoMat));
  // caras con las esquinas redondeadas: un plano con máscara de transparencia
  const mascara = document.createElement('canvas'); mascara.width = W; mascara.height = H;
  { const c = mascara.getContext('2d')!; c.fillStyle = '#000'; c.fillRect(0, 0, W, H); redondeado(c, 2, 2, W - 4, H - 4, (RADIO / ANCHO) * W); c.fillStyle = '#fff'; c.fill(); }
  const alfa = new THREE.CanvasTexture(mascara);
  const caraGeo = new THREE.PlaneGeometry(ANCHO * 0.995, ALTO * 0.995);
  const lacado = { roughness: 0.32, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.08, alphaMap: alfa, transparent: true, emissive: new THREE.Color('#ffffff'), emissiveIntensity: 0.32 };
  const mFrente = new THREE.MeshPhysicalMaterial({ ...lacado, map: frente, emissiveMap: frente });
  const mAtras = new THREE.MeshPhysicalMaterial({ ...lacado, map: atras, emissiveMap: atras });
  const caraF = new THREE.Mesh(caraGeo, mFrente); caraF.position.z = 0.036; tarjeta.add(caraF);
  const caraA = new THREE.Mesh(caraGeo, mAtras); caraA.position.z = -0.036; caraA.rotation.y = Math.PI; tarjeta.add(caraA);
  escena.add(tarjeta);
  const luz = new THREE.DirectionalLight(0xffffff, 1.4); escena.add(luz);

  let arrastre = 0, inercia = 0, ultX: number | null = null, vuelta = 0, pulso = 0;
  const puntero = { x: 0, y: 0 };
  const abajo = (e: PointerEvent) => { ultX = e.clientX; };
  const mover = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    if (e.pointerType === 'mouse') { puntero.x = (e.clientX - r.left) / r.width - 0.5; puntero.y = (e.clientY - r.top) / r.height - 0.5; }
    if (ultX !== null) { const d = ((e.clientX - ultX) / r.width) * 4; arrastre += d; inercia = d; ultX = e.clientX; }
  };
  const arriba = () => { ultX = null; };
  canvas.addEventListener('pointerdown', abajo);
  window.addEventListener('pointermove', mover, { passive: true });
  window.addEventListener('pointerup', arriba); window.addEventListener('pointercancel', arriba);

  const ajustar = () => { const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camara.aspect = w / h; camara.updateProjectionMatrix(); tarjeta.scale.setScalar(Math.min(1, camara.aspect / 1.25)); };
  ajustar(); const ro = new ResizeObserver(ajustar); ro.observe(canvas);
  let visible = true; const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(canvas);

  const reloj = new THREE.Clock(); let cuadro = 0, giro = 0, completo = false;
  const animar = () => {
    cuadro = requestAnimationFrame(animar);
    if (!visible || document.hidden) return;
    const t = reloj.getElapsedTime();
    if (ultX === null) { arrastre += inercia; inercia *= 0.93; arrastre *= 0.985; }
    vuelta += (0 - vuelta) * 0.045;
    pulso *= 0.9;
    const objetivo = Math.sin(t * 0.5) * 0.18 + puntero.x * 0.55 + arrastre + vuelta;
    giro += (objetivo - giro) * 0.1;
    tarjeta.rotation.y = giro;
    tarjeta.rotation.x = Math.sin(t * 0.4) * 0.06 - puntero.y * 0.4;
    tarjeta.rotation.z = Math.sin(t * 0.33) * 0.03;
    tarjeta.position.y = Math.sin(t * 0.9) * 0.06;
    const s = 1 + pulso * 0.04; tarjeta.scale.setScalar(Math.min(1, camara.aspect / 1.25) * s);
    luz.position.set(Math.cos(t * 0.45) * 4, 3, 4);
    renderer.render(escena, camara);
  };
  animar();

  return {
    actualizar(campos: Campo[]) {
      dibujarFrente(campos);
      pulso = 1;
      const lleno = campos.every(c => c.valor);
      if (lleno && !completo) vuelta = -Math.PI * 2; // una vuelta entera al completar
      completo = lleno;
    },
    destruir() {
      cancelAnimationFrame(cuadro); ro.disconnect(); io.disconnect();
      canvas.removeEventListener('pointerdown', abajo); window.removeEventListener('pointermove', mover);
      window.removeEventListener('pointerup', arriba); window.removeEventListener('pointercancel', arriba);
      [frente, atras, alfa, entorno].forEach(x => x.dispose());
      [cuerpoMat, mFrente, mAtras].forEach(x => x.dispose()); cuerpoGeo.dispose(); caraGeo.dispose(); pmrem.dispose(); renderer.dispose();
    },
  };
}
