import { useState } from 'react';

export const useFormValidation = (initialState) => {
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value, validations) => {
    setFormValues({ ...formValues, [name]: value });
    setTouched({ ...touched, [name]: true });

    if (validations) {
      const errors = { ...formErrors };

      if (validations.required && !value.trim()) {
        errors[name] = 'Este campo es requerido';
      } else if (errors[name]) {
        delete errors[name];
      }

      if (validations.maxLength && value.trim().length > validations.maxLength) {
        errors[name] = `Este campo debe tener como máximo ${validations.maxLength} caracteres`;
      } else if (errors[name]) {
        delete errors[name];
      }

      if (validations.minLength && value.trim().length < validations.minLength) {
        errors[name] = `Este campo debe tener como mínimo ${validations.minLength} caracteres`;
      } else if (errors[name]) {
        delete errors[name];
      }

      if (validations.pattern && !validations.pattern.test(value)) {
        errors[name] = 'Formato inválido';
      } else if (errors[name]) {
        delete errors[name];
      }

      setFormErrors(errors);
    }
  };

  const handleBlur = (name) => {
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (validations) => {
    const errors = {};
    Object.keys(validations).forEach((name) => {
      const value = formValues[name];
      const validation = validations[name];

      if (validation.required && !value.trim()) {
        errors[name] = 'Este campo es requerido';
      }

      if (validation.maxLength && value.trim().length > validation.maxLength) {
        errors[name] = `Este campo debe tener como máximo ${validation.maxLength} caracteres`;
      }

      if (validation.minLength && value.trim().length < validation.minLength) {
        errors[name] = `Este campo debe tener como mínimo ${validation.minLength} caracteres`;
      }

      if (validation.pattern && !validation.pattern.test(value)) {
        errors[name] = 'Formato inválido';
      }
    });

    setFormErrors(errors);
    setTouched(
      Object.keys(validations).reduce(
        (acc, name) => ({ ...acc, [name]: true }),
        {}
      )
    );

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      console.log('Hay errores en el formulario:', errors);
      return false
    }
  };

  return {
    formValues,
    formErrors,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
  };
};

export default useFormValidation;
