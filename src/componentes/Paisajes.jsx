//Pasamos un prop a la función, la asignamos en el componente Padre, Titulo
function Paisajes({nombreClase,src,img,categoria}) {
          

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