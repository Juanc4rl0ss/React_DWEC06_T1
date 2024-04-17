//Importamos el componente Título,que es donde comienza la lógica de los dos componentes anidados
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './componentes/App.jsx'
import './index.css'


//Renderizamos React,para que el id root sea el punto de partida
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
