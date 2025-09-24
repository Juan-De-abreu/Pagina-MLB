// src/utils/formatters.ve.js

/**
 * Formatea un número según las convenciones venezolanas:
 * - Separador de miles: punto (.)
 * - Separador decimal: coma (,)
 * - Ejemplo: 1234567.89 → "1.234.567,89"
 */
export const formatNumberEs = (value) => {
    // Verifica que el valor sea un número válido
    if (typeof value !== 'number' || isNaN(value)) {
        return value;
    }
    return new Intl.NumberFormat('es-ES', {
        useGrouping: 'always',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

/**
 * Formatea como moneda venezolana (Bolívar Soberano - VES)
 * Usa símbolo Bs.S y separadores adecuados.
 * Ejemplo: 1234567.89 → "Bs.S 1.234.567,89"
 */
export const formatCurrencyVE = (value, currency = 'VES', options = {}) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '—';
  }

  const defaultOptions = {
    locale: 'es-VE',
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  };

  return new Intl.NumberFormat(defaultOptions.locale, defaultOptions).format(value);
};

/**
 * Formatea una fecha en formato venezolano común:
 * "dd/mm/yyyy" (muy usado en formularios, documentos y sistemas internos)
 * Ejemplo: "2024-06-15" → "15/06/2024"
 */
export const formatDateVE = (dateString, format = 'dd/mm/yyyy') => {
  if (!dateString) return '—';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const year = date.getFullYear();

  switch (format) {
    case 'dd/mm/yyyy': {
      return `${day}/${month}/${year}`;
    }
    case 'mm/dd/yyyy': {
      return `${month}/${day}/${year}`;
    }
    case 'yyyy-mm-dd': {
      return `${year}-${month}-${day}`;
    }
    case 'full': {
      const days = [
        'domingo', 'lunes', 'martes', 'miércoles',
        'jueves', 'viernes', 'sábado'
      ];
      const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      return `${days[date.getDay()]}, ${day} de ${months[date.getMonth()]} de ${year}`;
    }
    default: {
      return `${day}/${month}/${year}`;
    }
  }
};

/**
 * Formatea hora en formato venezolano (12h con AM/PM)
 * Ejemplo: "14:30:00" → "2:30 PM"
 */
export const formatTimeVE = (timeString) => {
  if (!timeString) return '—';

  const [hours, minutes] = timeString.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return '—';

  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12; // Convierte 0 a 12

  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Formatea fecha y hora juntas en formato venezolano común
 * Ejemplo: "2024-06-15T14:30:00" → "15/06/2024 2:30 PM"
 */
export const formatDateTimeVE = (dateTimeString) => {
  if (!dateTimeString) return '—';

  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return '—';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;

  return `${day}/${month}/${year} ${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Formatea porcentaje en formato venezolano: "28,7%" (coma decimal)
 * Ejemplo: 0.287 → "28,7%"
 */
export const formatPercentageVE = (value, decimals = 1) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '—';
  }

  const percentage = (value * 100).toFixed(decimals).replace('.', ',');
  return `${percentage}%`;
};



/**
 * Formatea cédula de identidad venezolana (sin guiones ni espacios)
 * Ejemplo: "20123456" → "20.123.456"
 */
export const formatCedulaVE = (cedula) => {
  if (!cedula || typeof cedula !== 'string') return '—';

  // Limpia cualquier carácter no numérico
  const clean = cedula.replace(/\D/g, '');

  // Si tiene menos de 7 dígitos o más de 8, lo dejamos sin formato
  if (clean.length < 7 || clean.length > 8) {
    return clean;
  }

  // Formato: XX.XXX.XXX
  return clean.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
}

export function getMedalColorVar(index) {
  const position = index + 1;

  if (position === 1) return '--dorado';
  if (position === 2) return '--plateado';
  if (position === 3) return '--bronce';
  return '--gris-claro';
}
