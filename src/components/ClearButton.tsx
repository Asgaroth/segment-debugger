import { useDispatch } from '../store';

export function ClearButton() {
  const dispatch = useDispatch();
  function clearEvents() {
    dispatch({
      type: 'CLEAR',
    });
  }
  return (
    <button onClick={clearEvents} className="px-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}
