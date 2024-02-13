  import React from 'react';
  import './Home.css';
  import Navbar from './Navbar'; // Navbar komponens importálása

  const Home = () => {
    return (
      <div className="home">
        <Navbar />
        <div className="overlay">
          <h1>Üdvözöllek a Veho.com-on!</h1>
          <p>Ez egy online platform, ahol megoszthatod az ötleteidet, és másokkal együttműködhetsz.</p>
          <p>Ha már regisztráltál, jelentkezz be, hogy folytathasd.</p>
          <p>Ha még nem regisztráltál, kérlek, regisztrálj egy fiókot, és csatlakozz hozzánk!</p>
        </div>
      </div>
    );
  }

  export default Home;
