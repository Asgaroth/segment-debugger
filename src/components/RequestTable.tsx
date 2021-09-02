import classNames from 'classnames';
import { RequestEntry } from '../services/processRequest';
import { useDispatch, useStore } from '../store';
import { ClearButton } from './ClearButton';
import { PropertiesTable } from './PropertiesTable';

export function RequestTable() {
  const { requests, selectedRequest } = useStore();
  const dispatch = useDispatch();

  function selectEvent(event: RequestEntry) {
    dispatch({
      type: 'SELECT',
      payload: event,
    });
  }

  console.log(requests, selectedRequest);
  return (
    <div className="flex">
      <div className="flex-1 min-w-max">
        <h3 className="flex items-center bg-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Events {requests && <ClearButton />}
        </h3>
        <div className="divide-y divide-gray-200">
          {requests ? (
            Object.entries<RequestEntry>(requests).map(([key, event]) => (
              <div
                className={classNames('py-2 px-4 cursor-pointer', {
                  'bg-gray-50': selectedRequest?.key === key,
                })}
                key={key}
                onClick={() => selectEvent(event)}
              >
                <div className="content">
                  <span className="text-sm font-medium text-gray-900">
                    {event.name}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 w-full text-center">
              No events tracked in this tab yet!
            </div>
          )}
        </div>
      </div>
      {selectedRequest?.data && (
        <div className="flex-1 divide-x divide-gray-200">
          <header>
            <h3 className="bg-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Properties
            </h3>
          </header>
          <PropertiesTable data={selectedRequest.data} />
        </div>
      )}
    </div>
  );
}
