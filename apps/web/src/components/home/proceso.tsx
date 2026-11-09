const pasos = [
  { titulo: 'Contanos qué necesitás', texto: 'Compartí tu situación y lo que buscás en una cobertura, por WhatsApp o con el formulario.' },
  { titulo: 'Comparamos las opciones', texto: 'Revisamos obras sociales y prepagas con los mismos criterios para tu edad, tu zona y tus aportes.' },
  { titulo: 'Elegís con la información completa', texto: 'Te mostramos qué cambia entre cada opción para que decidas con claridad.' },
];

export function Proceso() {
  return (
    <section className="seccion proceso" id="como-funciona">
      <div className="contenedor">
        <div className="proceso-cabeza">
          <h2 className="revela">Cómo te asesoramos</h2>
          <p className="seccion-bajada">Tres pasos, sin vueltas.</p>
        </div>
        <div className="pasos">
          <span className="pasos-riel" aria-hidden="true"><span className="pasos-avance" /></span>
          <ol>
            {pasos.map((paso, i) => (
              <li className="paso" key={paso.titulo}>
                <span className="paso-num" aria-hidden="true">{i + 1}</span>
                <h3>{paso.titulo}</h3>
                <p>{paso.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
