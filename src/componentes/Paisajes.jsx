//Pasamos un prop a la función, la asignamos en el componente Padre, Titulo
function Paisajes({src,img,categoria, indice, indiceActivo, totalImagenes}) {
         // Para cada imagen en mi conjunto de datos, decido qué clase CSS aplicar basándome en su índice.
          // Por defecto, asigno a todas las imágenes la clase 'nextSlide'.
          let nombreClase = 'nextSlide'; 

          if (totalImagenes.length === 2) {
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
          } else if (indice === indiceActivo - 1 || (indiceActivo === 0 && indice === totalImagenes.length - 1)) {
            nombreClase = 'lastSlide';
          } 
        }

          // Renderizo el artículo para cada imagen, aplicando la clase CSS correspondiente y mostrando la imagen y su información.
          return (
            <article className={nombreClase}>
              <img src={src} alt={img} className="person-img" />
              <h4>{img}</h4>
              <p className="title">{categoria}</p>
            </article>
          );    
  
}
// Exporto el componente Paisajes para usarlo en el componente Título.
export default Paisajes;