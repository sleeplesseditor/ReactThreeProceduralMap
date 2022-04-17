import * as React from 'react';
import Map from './components/Map';
import './App.css';

function App() {
  const visRef = React.useRef();
  const handleResetCamera = () => {
    visRef?.current?.resetCamera();
  }

  return (
    <div className="App">
      <Map 
        mapRef={visRef}
      />
      <button onClick={handleResetCamera}>Reset Camera</button>
    </div>
  );
}

export default App;
