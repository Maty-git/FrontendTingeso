// Funciones de utilidad para el sistema ToolRent

import { 
  TOOL_STATE_LABELS, 
  TOOL_CATEGORY_LABELS, 
  DEBT_TYPE_LABELS,
  STATE_BADGE_COLORS,
  DEBT_BADGE_COLORS 
} from './constants';

/**
 * Formatea una fecha para mostrar en la UI
 * @param {string|Date} date - Fecha a formatear
 * @param {string} locale - Locale para formateo (default: 'es-CL')
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, locale = 'es-CL') => {
  if (!date) return '—';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};

/**
 * Formatea una fecha solo con día, mes y año
 * @param {string|Date} date - Fecha a formatear
 * @param {string} locale - Locale para formateo (default: 'es-CL')
 * @returns {string} Fecha formateada
 */
export const formatDateShort = (date, locale = 'es-CL') => {
  if (!date) return '—';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dateObj);
};

/**
 * Formatea un número como moneda chilena
 * @param {number} amount - Cantidad a formatear
 * @param {string} locale - Locale para formateo (default: 'es-CL')
 * @returns {string} Cantidad formateada como moneda
 */
export const formatCurrency = (amount, locale = 'es-CL') => {
  if (amount === null || amount === undefined) return '$0';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Obtiene el label de un estado de herramienta
 * @param {string} state - Estado de la herramienta
 * @returns {string} Label del estado
 */
export const getToolStateLabel = (state) => {
  return TOOL_STATE_LABELS[state] || state;
};

/**
 * Obtiene el label de una categoría de herramienta
 * @param {string} category - Categoría de la herramienta
 * @returns {string} Label de la categoría
 */
export const getToolCategoryLabel = (category) => {
  return TOOL_CATEGORY_LABELS[category] || category;
};

/**
 * Obtiene el label de un tipo de deuda
 * @param {string} type - Tipo de deuda
 * @returns {string} Label del tipo de deuda
 */
export const getDebtTypeLabel = (type) => {
  return DEBT_TYPE_LABELS[type] || type;
};

/**
 * Obtiene la clase CSS para el badge de un estado
 * @param {string} state - Estado de la herramienta
 * @returns {string} Clase CSS del badge
 */
export const getStateBadgeColor = (state) => {
  return STATE_BADGE_COLORS[state] || 'bg-secondary';
};

/**
 * Obtiene la clase CSS para el badge de un tipo de deuda
 * @param {string} type - Tipo de deuda
 * @returns {string} Clase CSS del badge
 */
export const getDebtBadgeColor = (type) => {
  return DEBT_BADGE_COLORS[type] || 'bg-secondary';
};

/**
 * Valida si un RUT chileno es válido
 * @param {string} rut - RUT a validar
 * @returns {boolean} True si el RUT es válido
 */
export const validateRut = (rut) => {
  if (!rut) return false;
  
  // Limpiar el RUT
  const cleanRut = rut.replace(/[^0-9kK]/g, '');
  
  if (cleanRut.length < 8) return false;
  
  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1).toUpperCase();
  
  // Calcular dígito verificador
  let sum = 0;
  let multiplier = 2;
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const remainder = sum % 11;
  const calculatedDv = remainder < 2 ? remainder.toString() : (11 - remainder).toString();
  const finalDv = calculatedDv === '10' ? 'K' : calculatedDv;
  
  return dv === finalDv;
};

/**
 * Formatea un RUT chileno
 * @param {string} rut - RUT a formatear
 * @returns {string} RUT formateado
 */
export const formatRut = (rut) => {
  if (!rut) return '';
  
  const cleanRut = rut.replace(/[^0-9kK]/g, '');
  
  if (cleanRut.length < 8) return rut;
  
  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1).toUpperCase();
  
  // Formatear con puntos y guión
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `${formattedBody}-${dv}`;
};

/**
 * Genera un ID único simple
 * @returns {string} ID único
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Debounce function para optimizar búsquedas
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Maneja errores de API de forma consistente
 * @param {Error} error - Error capturado
 * @param {string} context - Contexto del error
 * @returns {string} Mensaje de error para mostrar al usuario
 */
export const handleApiError = (error, context = 'operación') => {
  console.error(`Error en ${context}:`, error);
  
  if (error.response) {
    // Error de respuesta del servidor
    const status = error.response.status;
    const message = error.response.data?.message || error.response.data?.error;
    
    switch (status) {
      case 400:
        return message || 'Datos inválidos. Por favor, verifica la información ingresada.';
      case 401:
        return 'No tienes autorización para realizar esta acción.';
      case 403:
        return 'Acceso denegado. Contacta al administrador.';
      case 404:
        return 'El recurso solicitado no fue encontrado.';
      case 500:
        return 'Error interno del servidor. Intenta nuevamente más tarde.';
      default:
        return message || `Error del servidor (${status}). Intenta nuevamente.`;
    }
  } else if (error.request) {
    // Error de red
    return 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.';
  } else {
    // Otro tipo de error
    return `Error inesperado en ${context}. Intenta nuevamente.`;
  }
};

/**
 * Muestra una notificación de éxito
 * @param {string} message - Mensaje a mostrar
 */
export const showSuccessNotification = (message) => {
  // Aquí podrías integrar con una librería de notificaciones como react-toastify
  alert(`✅ ${message}`);
};

/**
 * Muestra una notificación de error
 * @param {string} message - Mensaje a mostrar
 */
export const showErrorNotification = (message) => {
  // Aquí podrías integrar con una librería de notificaciones como react-toastify
  alert(`❌ ${message}`);
};

/**
 * Muestra una notificación de advertencia
 * @param {string} message - Mensaje a mostrar
 */
export const showWarningNotification = (message) => {
  // Aquí podrías integrar con una librería de notificaciones como react-toastify
  alert(`⚠️ ${message}`);
};
