import { useState, useCallback } from 'react';
import { handleApiError } from '../utils/helpers';

/**
 * Hook personalizado para manejar llamadas a API
 * @param {Function} apiFunction - Función de la API a ejecutar
 * @returns {Object} Objeto con estado de carga, datos, error y función para ejecutar la API
 */
export const useApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setData(result.data);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err, 'operación');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setLoading(false);
    setData(null);
    setError(null);
  }, []);

  return {
    loading,
    data,
    error,
    execute,
    reset
  };
};

/**
 * Hook para manejar listas de datos con paginación
 * @param {Function} fetchFunction - Función para obtener los datos
 * @returns {Object} Objeto con estado de la lista y funciones de control
 */
export const useList = (fetchFunction) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchItems = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction(...args);
      setItems(result.data || []);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err, 'cargar datos');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  const refreshItems = useCallback(async (...args) => {
    setRefreshing(true);
    setError(null);
    
    try {
      const result = await fetchFunction(...args);
      setItems(result.data || []);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err, 'actualizar datos');
      setError(errorMessage);
      throw err;
    } finally {
      setRefreshing(false);
    }
  }, [fetchFunction]);

  const addItem = useCallback((newItem) => {
    setItems(prev => [...prev, newItem]);
  }, []);

  const updateItem = useCallback((id, updatedItem) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const reset = useCallback(() => {
    setItems([]);
    setLoading(false);
    setError(null);
    setRefreshing(false);
  }, []);

  return {
    items,
    loading,
    error,
    refreshing,
    fetchItems,
    refreshItems,
    addItem,
    updateItem,
    removeItem,
    reset
  };
};

/**
 * Hook para manejar formularios con validación
 * @param {Object} initialValues - Valores iniciales del formulario
 * @param {Function} validationSchema - Esquema de validación (opcional)
 * @returns {Object} Objeto con estado del formulario y funciones de control
 */
export const useForm = (initialValues = {}, validationSchema = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error cuando el usuario modifica el campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validateField = useCallback((name, value) => {
    if (!validationSchema) return null;
    
    try {
      validationSchema.validateSyncAt(name, { [name]: value });
      return null;
    } catch (err) {
      return err.message;
    }
  }, [validationSchema]);

  const validateForm = useCallback(() => {
    if (!validationSchema) return true;
    
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  }, [validationSchema, values]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValue(name, fieldValue);
  }, [setValue]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setFieldTouched(name);
    
    if (validationSchema) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [setFieldTouched, validateField, validationSchema]);

  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    try {
      if (validateForm()) {
        await onSubmit(values);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isFieldValid = useCallback((name) => {
    return !errors[name] || !touched[name];
  }, [errors, touched]);

  const getFieldError = useCallback((name) => {
    return touched[name] ? errors[name] : null;
  }, [errors, touched]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateForm,
    isFieldValid,
    getFieldError
  };
};
