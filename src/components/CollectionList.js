import { useSelector } from 'react-redux';

export const CollectionList = ({ onEdit }) => {
  const entries = useSelector((state) => state.collections.entries);

  return (
    <section className='panel'>
      <header className='panel__header panel__header--compact'>
        <div>
          <h2>Recorded Entries</h2>
        </div>
      </header>

      {entries.length === 0 ? (
        <div className='empty-state'>
          <p>No collection entries yet.</p>
          <span>Submit the form to start.</span>
        </div>
      ) : (
        <div className='table-wrapper'>
          <table>
            <thead>
              <tr>
                <th>Clinic</th>
                <th>Date</th>
                <th>Credit</th>
                <th>Cash</th>
                <th>EFT</th>
                <th aria-label='Actions' />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.clinic}</td>
                  <td>{entry.date}</td>
                  <td>${entry.collection_credit}</td>
                  <td>${entry.collection_cash}</td>
                  <td>${entry.collection_eft}</td>
                  <td>
                    <button
                      className='btn btn--link'
                      type='button'
                      onClick={() => onEdit(entry.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
