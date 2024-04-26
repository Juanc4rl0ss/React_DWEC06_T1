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
   
    const handleCategoriaSeleccionada = useCallback((categoria) => {
      setCategoria(categoria);
      setIndiceActivo(0);
    }, []);

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

    {deportesParaMostrar.map(({ id, src, img, categoria }, indice) => {
          // Corregido: Uso correcto de paréntesis y 'return' en la función map
         // Para cada imagen en mi conjunto de datos, decido qué clase CSS aplicar basándome en su índice.
          // Por defecto, asigno a todas las imágenes la clase 'nextSlide'.
          let nombreClase = 'nextSlide'; 

          if (deportesParaMostrar.length === 2) {
           // Cuando solo hay dos imágenes, alternamos entre 'activeSlide' y 'lastSlide'.
          if (indice === indiceActivo) {
            nombreClase = 'activeSlide'; // La imagen activa mantiene su clase.
          } else {
            nombreClase = 'lastSlide'; // La imagen no activa obtiene 'lastSlide' para deslizarse hacia la izquierda.
          }
        } else {


          if (indice === indiceActivo) {

            // La imagen actualmente activa recibe la clase 'activeSlide'.
            nombreClase = 'activeSlide';
            
            //En caso de que el indice corresponda al anterior del índice activo,le asignamos el atributo de clase 'lastSlide'
            //En caso de que el índice sea el primer objeto del Array, y evaluamos la última imagen del array 'naturaleza', le asignamos a ésta última imagen, el atributo de clase 'lastSlide'
          } else if (indice === indiceActivo - 1 || (indiceActivo === 0 && indice === deportesParaMostrar.length - 1)) {
            nombreClase = 'lastSlide';
          } 
        }
          return (
            <Paisajes
              key={id}
              id={id}
              nombreClase={nombreClase}
              src={src}
              img={img}
              categoria={categoria}
          />
          );
        })}
    </div>
  
  </section>  
  );
}

export default App;
