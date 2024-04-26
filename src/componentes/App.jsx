import Paisajes from './Paisajes.jsx'
import Datos from '../data.js'
import Boton from './Boton.jsx';
import Titulo from './Titulo.jsx';

//Importo los hooks que necesito para el componente
import React, { useState, useEffect, useCallback } from 'react';

function App() {


  // Utilizo useState para mantener el índice de la imagen que está actualmente activa en el carrusel. Lo inicio en 0, es decir, con la primera imagen del array.
  const [indiceActivo, setIndiceActivo] = useState(0);

  // Valida la categoría seleccionada,y la inicializamos en todas
  const [categoriaSeleccionada, setCategoria] = useState('todas');

  const [datos, setDatos] = useState(Datos);

      //Empleamos 'reduce' para crear un Array con las categorias existentes en 'data.js' sin que se dupliquen,y así poder crear los botones posteriormente
      const categoriasUnicas = datos.reduce((categorias, dato) => {

        //En caso de que no esté incluida la categoría, se añade al array
        if (!categorias.includes(dato.categoria)) {
          categorias.push(dato.categoria);
        }
        return categorias;
      }, []);
   
    //Éstas funciones emplean 'useCallback' para que no se cree una nueva función cada vez que se renderiza el componente
    const handleCategoriaSeleccionada = useCallback((categoria) => {
      setCategoria(categoria);
      setIndiceActivo(0);
    }, []);

    //
    const handleTodasLasCategorias = useCallback(() => {
      setCategoria('todas');
      setIndiceActivo(0);
    }, []);
  


  useEffect(() => {

  //Configuramos el temporizador dentro de useEffect para que cambie cada dos segundos

    const temporizador = setTimeout(() => {

      const totalImagenes = Datos.filter(imagen => 
        categoriaSeleccionada === 'todas' || imagen.categoria === categoriaSeleccionada
      ).length;


      //Ésta función del useState, devuelve 0 si es la última imagen del objeto 'naturaleza', o la aumenta en 1 en caso contrario,para ello empleamos un operador ternario
      setIndiceActivo(indiceActivo => {
        const esUltimaImagen = indiceActivo + 1 === totalImagenes;
        return esUltimaImagen ? 0 : indiceActivo + 1;
      });
    }, 2000); 

  //Ésta funcion de limpieza, limpia el temporizador,para evitar solapaciones de estados anteriores
  return () => clearTimeout(temporizador);
  }, [indiceActivo,categoriaSeleccionada]);


      //Ésta contante crea un map ya sea con todos los paisajes, o con los de la categoría seleccionada, empleando 'filter'
      const deportesParaMostrar =  datos.filter(deporte => categoriaSeleccionada === 'todas' || deporte.categoria === categoriaSeleccionada);

  return (
  <section className="section"> 

      <Titulo/>

    <div className="btn-container">

          <Boton
            key="todas"
            data-id="todas"
            onClick={handleTodasLasCategorias}
            nombreBoton="Todas las categorías"
          />

        {categoriasUnicas.map((categoria) => (
          
          <Boton
            key={categoria}
            data-id={categoria}
            onClick={() => handleCategoriaSeleccionada(categoria)}
            nombreBoton={categoria}
          />
        ))}

    </div>

    <div className="section-center">

    {deportesParaMostrar.map(({ id, src, img, categoria}, indice) => {
         
          return (
            <Paisajes
              key={id}
              id={id}
              src={src}
              img={img}
              categoria={categoria}
              indice={indice}
              indiceActivo={indiceActivo}
              totalImagenes={deportesParaMostrar}
          />
          );
        })}
    </div>
  
  </section>  
  );
}

export default App;
