import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { CollectionForm } from '../components/CollectionForm';
import { CollectionList } from '../components/CollectionList';
import { clearStatus } from '../features/collections/collectionsSlice';

export const CollectionPage = () => {
  const dispatch = useDispatch();
  const { entries, status, lastAction, error } = useSelector((state) => state.collections);
  const [editingId, setEditingId] = useState(null);

  const editingEntry = useMemo(
    () => entries.find((entry) => entry.id === editingId) || null,
    [entries, editingId]
  );

  useEffect(() => {
    if (status === 'succeeded' && lastAction === 'create') {
      toast.success('Collection entry created successfully.');
      dispatch(clearStatus());
    }

    if (status === 'succeeded' && lastAction === 'update') {
      toast.success('Collection entry updated successfully.');
      dispatch(clearStatus());
    }

    if (status === 'failed') {
      toast.error(error);
      dispatch(clearStatus());
    }
  }, [dispatch, status, lastAction, error]);

  return (
    <div className="collection-page">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            fontWeight: 600,
          },
        }}
      />
      <CollectionForm editingEntry={editingEntry} onCancelEdit={() => setEditingId(null)} />
      <CollectionList onEdit={setEditingId} />
    </div>
  );
};
