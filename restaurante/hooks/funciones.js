import {  doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const moment = require('moment');
export const obtenerTiempoTranscurrido=(fechaNotificacion)=> {
    const fechaActual = moment();
    const diff = fechaActual.diff(fechaNotificacion);
    const duracion = moment.duration(diff);

    if (duracion.asSeconds() < 60) {
      return `Hace ${duracion.seconds()} segundos`;
    } else if (duracion.asMinutes() < 60) {
      return `Hace ${duracion.minutes()} minutos`;
    } else if (duracion.asHours() < 24) {
      return `Hace ${duracion.hours()} horas`;
    } else if (duracion.asDays() < 7) {
      return `Hace ${duracion.days()} días`;
    } else if (duracion.asMonths() < 12) {
      return `Hace ${duracion.weeks()} semanas`;
    } else {
      return `Hace ${duracion.months()} meses`;
    }
  }

export const MarcarLeido = async (notificacion) => {
    if (notificacion.leido === true) {
      return;
    }
    const docRef = doc(db, "notificacion", notificacion.id);
    await updateDoc(docRef, {
      leido: true
    });
}
export const eliminar = async (notificacion) => {
  if (notificacion.estado === 0) {
    return;
  }
  const docRef = doc(db, "notificacion", notificacion.id);
  await updateDoc(docRef, {
    estado: 0
  });
}