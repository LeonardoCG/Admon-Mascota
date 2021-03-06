import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({crearCita}) => {

    //Crear State de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    //actulizar el error con state
    const [error, actualizarError] = useState(false);

    //Función que se ejecuta cada que el usuario escribe en el input
    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    }

    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;
     
    //Enviar formulario
    const submitCita = e => {
        e.preventDefault();

        // validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
            || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return
        }
        //Eliminar el mensaje previo
        actualizarError(false);

        //Asignar un ID
        cita.id= uuidv4();

        //Crear la cita
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }


    return ( 
        <Fragment>
            <h1>Crear Cita</h1>

            {
                error 
                ? <p className="alerta-error">Todos los campos son obligatorios</p>
                : null
            }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre de mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre del Dueño</label>
                <input 
                        type="text"
                        name="propietario"
                        className="u-full-width"
                        placeholder="Nombre-Dueño de la mascota"
                        onChange={actualizarState}
                        value={propietario}
                />
                <label>Fecha</label>
                <input 
                        type="date"
                        name="fecha"
                        className="u-full-width"
                        onChange={actualizarState}
                        value={fecha}
                />
                <label>Hora</label>
                <input 
                        type="time" 
                        name="hora" 
                        className="u-full-width" 
                        onChange={actualizarState}
                        value={hora}
                />
                <label>Síntomas</label>
                <textarea 
                        name="sintomas" 
                        className="u-full-width"
                        onChange={actualizarState}
                        value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}
 
export default Formulario;