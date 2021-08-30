import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types';

function App() {

  //citas en el local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
          citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
          localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas] )

  //Función que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //Funcion - Eliminar una citas desde el app
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter( cita => cita.id !== id );
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 
  ? 'No hay Citas'
  : 'Administra tus Citas'

  return (
    <Fragment>
      
    <h1>Administrador de Mascotas</h1>

    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario 
              crearCita={crearCita}
          />
        </div>
        <div className="one-half column">
          <h1>{titulo}</h1>
          {citas.map(cita => (
            <Cita 
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>
      
    </div>
    </Fragment>

  );
}

//propstypes - para documentas 
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired 
}

export default App;
