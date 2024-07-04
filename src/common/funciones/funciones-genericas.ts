import * as moment from 'moment';

export function generarToken(tamanioToken = 6): string {
  let token = '';
  for (let i = 0; i < tamanioToken; i++) {
    const numero = Math.floor(Math.random() * 9) + 1;
    token = token + numero;
  }
  return token;
}
