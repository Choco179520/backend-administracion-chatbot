import * as moment from 'moment';

export function convertirFechaDenarius(fecha: string): string {
  return moment(fecha, 'MM/DD/YYYY').format('YYYY-MM-DD 00:00').toString();
}

export function obtenerFechaNacimientoDenarius(fecha: string): number {
  const fechaMoment = moment(fecha, 'YYYY-MM-DD');
  const difEdad = moment().diff(fechaMoment, 'years');
  return difEdad;
}

export function convertirFechaRegistroCivil(fecha: string): string {
  if (!fecha) {
    return 'NA';
  }
  return moment(fecha, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00').toString();
}

export function obtenerEdadRC(fecha: string): number {
  const fechaMoment = moment(fecha, 'DD/MM/YYYY');
  const difEdad = moment().diff(fechaMoment, 'years');
  return difEdad;
}

export function separarApellidos(apellidos: string) {
  let apellidoPaterno = '';
  let apellidoMaterno = '';
  const apellidosSplit = apellidos.trim().split(' ');
  const tamanio = apellidosSplit.length;
  if (apellidosSplit.length > 1) {
    for (const palabra of apellidosSplit) {
      if (palabra === apellidosSplit[tamanio - 1]) {
        apellidoMaterno = palabra.toUpperCase();
      } else {
        apellidoPaterno =
          `${apellidoPaterno.toUpperCase()} ` + palabra.toUpperCase();
      }
    }
  } else {
    apellidoPaterno = apellidosSplit[0].toUpperCase();
  }

  return {
    apellidoPaterno,
    apellidoMaterno,
  };
}

export function separarNombresApellidos(informacion: string) {
  let apellidoPaterno = '';
  let apellidoMaterno = '';
  let nombres = '';
  const nombresSplit = informacion.trim().split(' ');

  switch (nombresSplit.length) {
    case 3:
      apellidoPaterno = nombresSplit[0];
      apellidoMaterno = nombresSplit[1];
      nombres = nombresSplit[2];
      break;
    case 4:
      apellidoPaterno = nombresSplit[0];
      apellidoMaterno = nombresSplit[1];
      nombres = `${nombresSplit[2]} ${nombresSplit[3]}`;
      break;
    default:
      apellidoPaterno = nombresSplit[0];
      apellidoMaterno = nombresSplit[1];
      const nombresSlice = nombresSplit.slice(2);
      for (const palabra of nombresSlice) {
        nombres += `${palabra} `;
      }
      break;
  }

  return {
    apellidoPaterno,
    apellidoMaterno,
    nombres: nombres.trim(),
  };
}

export function generarToken(tamanioToken = 6): string {
  let token = '';
  for (let i = 0; i < tamanioToken; i++) {
    const numero = Math.floor(Math.random() * 9) + 1;
    token = token + numero;
  }
  return token;
}
