// Constantes del sistema ToolRent

export const TOOL_STATES = {
  AVAILABLE: 'AVAILABLE',
  LOANED: 'LOANED',
  UNDER_REPAIR: 'UNDER_REPAIR',
  OUT_OF_SERVICE: 'OUT_OF_SERVICE'
};

export const TOOL_CATEGORIES = {
  MANUAL: 'MANUAL',
  ELECTRICAL: 'ELECTRICAL',
  CONSTRUCTION: 'CONSTRUCTION',
  CUTTING: 'CUTTING',
  CARPENTRY: 'CARPENTRY',
  WELDING: 'WELDING',
  GARDENING: 'GARDENING',
  MEASUREMENT: 'MEASUREMENT',
  SCAFFOLDING: 'SCAFFOLDING',
  MACHINERY: 'MACHINERY',
  SAFETY: 'SAFETY',
  ACCESSORIES: 'ACCESSORIES'
};

export const LOAN_STATUS = {
  ACTIVE: 'ACTIVE',
  RETURNED: 'RETURNED',
  UNPAID_FINE: 'UNPAID_FINE',
  REPLACEMENT: 'REPLACEMENT'
};

export const DEBT_TYPES = {
  LATE_FEE: 'LATE_FEE',
  REPLACEMENT: 'REPLACEMENT'
};

export const CLIENT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  RESTRICTED: 'RESTRICTED'
};

// Mapeo de estados para mostrar en UI
export const TOOL_STATE_LABELS = {
  [TOOL_STATES.AVAILABLE]: 'Disponible',
  [TOOL_STATES.LOANED]: 'Arrendada',
  [TOOL_STATES.UNDER_REPAIR]: 'En Mantenimiento',
  [TOOL_STATES.OUT_OF_SERVICE]: 'Fuera de Servicio'
};

export const TOOL_CATEGORY_LABELS = {
  [TOOL_CATEGORIES.MANUAL]: 'Manual',
  [TOOL_CATEGORIES.ELECTRICAL]: 'Eléctrica',
  [TOOL_CATEGORIES.CONSTRUCTION]: 'Construcción',
  [TOOL_CATEGORIES.CUTTING]: 'Corte',
  [TOOL_CATEGORIES.CARPENTRY]: 'Carpintería',
  [TOOL_CATEGORIES.WELDING]: 'Soldadura',
  [TOOL_CATEGORIES.GARDENING]: 'Jardinería',
  [TOOL_CATEGORIES.MEASUREMENT]: 'Medición',
  [TOOL_CATEGORIES.SCAFFOLDING]: 'Andamios',
  [TOOL_CATEGORIES.MACHINERY]: 'Maquinaria',
  [TOOL_CATEGORIES.SAFETY]: 'Seguridad',
  [TOOL_CATEGORIES.ACCESSORIES]: 'Accesorios'
};

export const DEBT_TYPE_LABELS = {
  [DEBT_TYPES.LATE_FEE]: 'Multa por Atraso',
  [DEBT_TYPES.REPLACEMENT]: 'Reposición'
};

// Colores para badges según estado
export const STATE_BADGE_COLORS = {
  [TOOL_STATES.AVAILABLE]: 'bg-success',
  [TOOL_STATES.LOANED]: 'bg-primary',
  [TOOL_STATES.UNDER_REPAIR]: 'bg-warning',
  [TOOL_STATES.OUT_OF_SERVICE]: 'bg-danger'
};

export const DEBT_BADGE_COLORS = {
  [DEBT_TYPES.LATE_FEE]: 'bg-warning',
  [DEBT_TYPES.REPLACEMENT]: 'bg-danger'
};

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'ToolRent',
  DESCRIPTION: 'Sistema de gestión de herramientas para construcción',
  VERSION: '1.0.0',
  PRIMARY_COLOR: '#163D73',
  ACCENT_COLOR: '#F26B21'
};
