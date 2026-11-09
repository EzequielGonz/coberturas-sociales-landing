// Demostración del método: las mismas preguntas para cada opción. Es ilustrativa:
// no hay marcas, precios ni resultados reales.
const criterios = [
  { nombre: 'Cartilla cerca de tu casa', niveles: [3, 2, 1] },
  { nombre: 'Guardias y urgencias', niveles: [2, 3, 2] },
  { nombre: 'Los especialistas que ya usás', niveles: [3, 1, 2] },
  { nombre: 'Carencias y tratamientos en curso', niveles: [2, 2, 3] },
  { nombre: 'Lo que cubren tus aportes', niveles: [1, 3, 2] },
  { nombre: 'Valor final para tu edad', niveles: [2, 3, 1] },
];
const opciones = ['Opción A', 'Opción B', 'Opción C'];

export function Comparacion() {
  return (
    <section className="seccion comparacion" id="como-comparamos">
      <div className="contenedor">
        <div className="comparacion-cabeza">
          <h2 className="revela">Comparamos cada opción con las mismas preguntas</h2>
          <p className="seccion-bajada">Así armamos la comparación para cada persona: qué cambia entre una opción y otra en lo que de verdad vas a usar.</p>
        </div>
        <div className="tabla-marco">
          <table className="tabla">
            <caption>Ejemplo ilustrativo. Cada comparación depende de tu edad, tu zona y tus aportes.</caption>
            <thead>
              <tr>
                <th scope="col"><span className="sr">Criterio</span></th>
                {opciones.map(opcion => <th scope="col" key={opcion}>{opcion}</th>)}
              </tr>
            </thead>
            <tbody>
              {criterios.map(criterio => (
                <tr key={criterio.nombre}>
                  <th scope="row">{criterio.nombre}</th>
                  {criterio.niveles.map((nivel, i) => (
                    <td key={opciones[i]}>
                      <span className="nivel" data-nivel={nivel} role="img" aria-label={['', 'Menos', 'Intermedio', 'Más'][nivel]}>
                        <i /><i /><i />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <span className="tabla-lente" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
