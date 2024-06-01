import React, { useEffect } from 'react';
import Home from './Home/Home'
import Cookies from 'js-cookie';

function App() {
  useEffect(() => {
    Cookies.set('language', 'hu', { expires: 30 }); 
  }, []);
  

  return (
    <div>
      <Home/>
    </div>
  );
}

export default App;
