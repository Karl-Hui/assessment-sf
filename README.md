# Collection Breakdown

A small React + Redux Toolkit app for capturing daily collection breakdowns by payment method.

## Folder Structure

```
src/
  components/
    CollectionForm.js
    CollectionList.js
    FormField.js
  features/
    collections/
      collectionsSlice.js
  pages/
    CollectionPage.js
  store/
    store.js
  utils/
    formatDateValue.js
    parseDateValue.js
    validation.js
  App.css
  App.js
  index.css
  index.js
```

## How to Run

1. Install dependencies:

```
npm install
```

2. Start the app:

```
npm start
```

The app runs at `http://localhost:3000`.

## Why Redux Toolkit

Redux Toolkit provides a predictable state container with minimal boilerplate. It offers:

- `createSlice` for cohesive reducer/action definitions
- `createAsyncThunk` for async workflows (simulated here)
- Scalable structure that keeps UI, data, and validation cleanly separated

## Assumptions & Tradeoffs

- All data is stored in Redux state only, so collection entries will reset on page refresh.

- Async thunks are used to simulate API behavior, allowing business logic to be separated from the view layer, which improves maintainability and supports future expansion when real API calls are introduced.

- Form values are stored as strings to support partial user input and smoother editing; values are converted to numbers during validation or submission.

- Due to time constraints, plain CSS was used for styling. For a more scalable and consistent design system, a utility-first approach such as Tailwind CSS would be recommended, as it promotes better isolation and reduces the risk of style conflicts.

- To preserve input precision, there is currently no restriction on the number of decimal places allowed for numeric fields. If stricter formatting is required, decimal precision (e.g., limiting to two decimal places) can be enforced at the view layer.
