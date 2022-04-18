import * as React from 'react';
import Map from './components/Map';
import './App.scss';

function App() {
  const maxHeight = 10;
  const visRef = React.useRef();

  return (
    <div className="App">
      <Map
        maxHeight={maxHeight}
        ref={visRef}
      />
    </div>
  );
}

export default App;
