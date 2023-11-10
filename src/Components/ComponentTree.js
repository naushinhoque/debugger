import React, { useState, useEffect } from 'react';

function TreeNode({ node, updateState, logEvent, error, isPaused, togglePause }) {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleNode = () => {
      setIsOpen(!isOpen);
      logEvent(`Toggled ${node.name} component`);
    };
  
    const handleStateChange = (key, value) => {
      try {
        if (!isPaused) {
          updateState(node.name, { ...node.state, [key]: value });
          logEvent(`Changed state of ${node.name} - ${key}: ${value}`);
          error(null);
        } else {
          error('Execution is paused. Resume to make changes.');
        }
      } catch (err) {
        error(`Error updating state of ${node.name} - ${err.message}`);
      }
    };
  
    return (
      <div>
        <div className="component-node" onClick={toggleNode}>
          {node.name}
        </div>
        {isOpen && (
          <div style={{ marginLeft: '20px' }}>
            <h4>Props:</h4>
            <pre>{JSON.stringify(node.props, null, 2)}</pre>
            <h4>State:</h4>
            {Object.entries(node.state).map(([key, value]) => (
              <div key={key}>
                <span>{key}:</span>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleStateChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
        <div>
          <button onClick={togglePause}>
            {isPaused ? 'Resume Execution' : 'Pause Execution'}
          </button>
        </div>
        {isOpen && node.children && (
          <div style={{ marginLeft: '20px' }}>
            {node.children.map((child) => (
              <TreeNode
                key={child.name}
                node={child}
                updateState={updateState}
                logEvent={logEvent}
                error={error}
                isPaused={isPaused}
                togglePause={togglePause}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  function ComponentTree({ componentTreeData }) {
    const [data, setData] = useState(componentTreeData);
    const [eventLog, setEventLog] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [renderTime, setRenderTime] = useState(0);
  
    useEffect(() => {
      const startTime = performance.now();
      // Your render logic or any significant updates go here
  
      const endTime = performance.now();
      const timeTaken = endTime - startTime;
      setRenderTime(timeTaken);
    }, [data]); // Adjust the dependency array according to your rendering logic
  
    const updateState = (componentName, newState) => {
      // Update state logic remains the same
      // ...
  
      // Log the event
      setEventLog([...eventLog, `Changed state of ${componentName}`]);
    };
  
    const logEvent = (event) => {
      setEventLog([...eventLog, event]);
    };
  
    return (
      <div className="component-tree">
        {errorMessage && <div className="error">{errorMessage}</div>}
        <div className="performance-metrics">
          <h3>Performance Metrics:</h3>
          <p>Render Time: {renderTime} milliseconds</p>
          {/* Add other performance metrics as needed */}
        </div>
        <div className="event-log">
          <h3>Event Log:</h3>
          <ul>
            {eventLog.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>
        <TreeNode
          node={data}
          updateState={updateState}
          logEvent={logEvent}
          error={setErrorMessage}
        />
      </div>
    );
  }

export default ComponentTree;
