import { useState } from 'react';
import { ClearButton } from './ClearButton';
import { ConfigButton } from './ConfigButton';
import { ConfigPanel } from './ConfigPanel';

export function ConfigBar() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  function toggleConfigPanel() {
    setIsConfigOpen(!isConfigOpen);
  }

  return (
    <div className="divide-y divide-gray-300 bg-gray-200">
      <div className="divide-x divide-gray-300 flex py-1 ">
        <ClearButton />
        <ConfigButton onClick={toggleConfigPanel} />
      </div>
      {isConfigOpen && <ConfigPanel />}
    </div>
  );
}
