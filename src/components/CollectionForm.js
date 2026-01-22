import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateField, FormField } from './FormField';
import {
  createEntry,
  updateEntry,
} from '../features/collections/collectionsSlice';
import { validateCollection } from '../utils/validation';

const EMPTY_FORM_VALUES = {
  clinic: '',
  date: '',
  collection_credit: '',
  collection_cash: '',
  collection_eft: '',
};

const normalizeEntry = (entry) => {
  if (!entry) {
    return EMPTY_FORM_VALUES;
  }

  return {
    clinic: entry.clinic || '',
    date: entry.date || '',
    collection_credit: String(entry.collection_credit ?? ''),
    collection_cash: String(entry.collection_cash ?? ''),
    collection_eft: String(entry.collection_eft ?? ''),
  };
};

export const CollectionForm = ({ editingEntry, onCancelEdit }) => {
  const dispatch = useDispatch();
  const { status, lastAction } = useSelector((state) => state.collections);
  const [values, setValues] = useState(EMPTY_FORM_VALUES);
  const [touched, setTouched] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setValues(normalizeEntry(editingEntry));
    setTouched({});
    setHasSubmitted(false);
  }, [editingEntry]);

  useEffect(() => {
    if (status === 'succeeded') {
      setValues(EMPTY_FORM_VALUES);
      setTouched({});
      setHasSubmitted(false);

      if (lastAction === 'update' && onCancelEdit) {
        onCancelEdit();
      }
    }
  }, [status, lastAction, onCancelEdit]);

  const validation = useMemo(() => validateCollection(values), [values]);
  const isEditing = Boolean(editingEntry);

  const showError = (field) =>
    (touched[field] || hasSubmitted) && validation.errors[field];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setHasSubmitted(true);

    if (!validation.isValid) {
      setTouched({
        clinic: true,
        date: true,
        collection_credit: true,
        collection_cash: true,
        collection_eft: true,
      });
      return;
    }

    const payload = {
      clinic: values.clinic.trim(),
      date: values.date,
      collection_credit: Number(values.collection_credit),
      collection_cash: Number(values.collection_cash),
      collection_eft: Number(values.collection_eft),
    };

    if (isEditing) {
      dispatch(updateEntry({ id: editingEntry.id, updates: payload }));
    } else {
      dispatch(createEntry(payload));
    }
  };

  return (
    <section className='panel'>
      <header className='panel__header'>
        <div>
          <h1>Collection Breakdown</h1>
        </div>
      </header>
      <form className='collection-form' onSubmit={handleSubmit} noValidate>
        <div className='form-grid'>
          <FormField
            label='Clinic'
            name='clinic'
            value={values.clinic}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Enter Clinic Code'
            error={showError('clinic') ? validation.errors.clinic : ''}
          />

          <DateField
            label='Date'
            name='date'
            value={values.date}
            onChange={(nextValue) => {
              setValues((prev) => ({
                ...prev,
                date: nextValue,
              }));
              setTouched((prev) => ({ ...prev, date: true }));
            }}
            onBlur={handleBlur}
            placeholder='Select Date'
            error={showError('date') ? validation.errors.date : ''}
          />

          <FormField
            label='Collection Credit'
            name='collection_credit'
            type='number'
            value={values.collection_credit}
            onChange={handleChange}
            onBlur={handleBlur}
            min='0'
            step='0.01'
            placeholder='Enter Credit Amount'
            error={
              showError('collection_credit')
                ? validation.errors.collection_credit
                : ''
            }
          />

          <FormField
            label='Collection Cash'
            name='collection_cash'
            type='number'
            value={values.collection_cash}
            onChange={handleChange}
            onBlur={handleBlur}
            min='0'
            step='0.01'
            placeholder='Enter Cash Amount'
            error={
              showError('collection_cash')
                ? validation.errors.collection_cash
                : ''
            }
          />

          <FormField
            label='Collection EFT'
            name='collection_eft'
            type='number'
            value={values.collection_eft}
            onChange={handleChange}
            onBlur={handleBlur}
            min='0'
            step='0.01'
            placeholder='Enter EFT Amount'
            error={
              showError('collection_eft')
                ? validation.errors.collection_eft
                : ''
            }
          />
        </div>

        <div className='form-actions'>
          <button
            className='btn btn--primary'
            type='submit'
            disabled={!validation.isValid || status === 'loading'}
          >
            {isEditing ? 'Update Entry' : 'Add Entry'}
          </button>
          {isEditing && (
            <button
              className='btn btn--ghost'
              type='button'
              onClick={onCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
};
