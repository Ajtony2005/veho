// App.js

import React from 'react';
//import Home from './Home';
import Information from './Information';
import Home from './Home';

const App = () => {
  return (
    <div>
      {/* <Home /> */}
      <div>
      <Home/>
      <Information imageUrl="wallpaper.jpg" />
    </div>
    </div>
  );
}

export default App;
