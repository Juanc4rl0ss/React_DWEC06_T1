function Boton({onClick,nombreBoton, dataId}) {

return(
<button type="button" className="filter-btn" data-id={dataId} onClick={onClick}>
 {nombreBoton}
</button>
)}

export default Boton;