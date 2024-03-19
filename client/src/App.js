import React, { useRef } from 'react';
import Home from './Home';
import Information from './Information';

const App = () => {
  const informationRef = useRef(null);

  return (
    <div>
      <Home scrollTargetRef={informationRef} />
      <Information ref={informationRef} />
    </div>
  );
}

export default App;
