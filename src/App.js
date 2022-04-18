import * as React from 'react';
import Map from './components/Map';
import './App.scss';

function App() {
  const maxHeight = 10;
  const visRef = React.useRef();
  const handleResetCamera = () => {
    visRef.current.resetCamera();
  }

  return (
    <div className="App">
      <Map
        maxHeight={maxHeight}
        ref={visRef}
      />
      <button className="reset-camera-btn" onClick={handleResetCamera}>Reset Camera</button>
    </div>
  );
}

export default App;
