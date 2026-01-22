const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const isValidDateString = (value) => {
  if (!DATE_REGEX.test(value)) {
    return false;
  }

  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
};

const parseNumber = (value) => {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) {
    return null;
  }

  return numberValue;
};

export const validateCollection = (values) => {
  const errors = {};
  const clinicValue = values.clinic ? values.clinic.trim() : '';

  if (!clinicValue) {
    errors.clinic = 'Clinic is required.';
  }

  if (!values.date) {
    errors.date = 'Date is required.';
  } else if (!isValidDateString(values.date)) {
    errors.date = 'Date must be a valid YYYY-MM-DD value.';
  }

  ['collection_credit', 'collection_cash', 'collection_eft'].forEach(
    (field) => {
      const numberValue = parseNumber(values[field]);

      if (
        values[field] === '' ||
        values[field] === null ||
        values[field] === undefined
      ) {
        errors[field] = 'This amount is required.';
        return;
      }

      if (numberValue < 0) {
        errors[field] = 'Amount must be 0 or more.';
      }
    }
  );

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
