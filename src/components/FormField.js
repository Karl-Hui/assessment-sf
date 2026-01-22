import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDateValue } from '../utils/formatDateValue';
import { parseDateValue } from '../utils/parseDateValue';

export const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  min,
  step,
  error,
}) => {
  const errorId = `${name}-error`;

  return (
    <label className='field'>
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        min={min}
        step={step}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      />
      <span className='field__error' id={errorId}>
        {error || ''}
      </span>
    </label>
  );
};

export const DateField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
}) => {
  const errorId = `${name}-error`;

  return (
    <label className='field'>
      <span>{label}</span>
      <DatePicker
        selected={parseDateValue(value)}
        onChange={(date) => onChange(date ? formatDateValue(date) : '')}
        onBlur={onBlur}
        placeholderText={placeholder}
        dateFormat='yyyy-MM-dd'
        className='date-picker'
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      />
      <span className='field__error' id={errorId}>
        {error || ''}
      </span>
    </label>
  );
};
