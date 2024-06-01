import React, { useRef } from 'react';
import First from './jsx/First.jsx';
import Information from './jsx/Information.jsx';
import Footer  from './jsx/Footer.jsx';

const Home = () => {
    const informationRef = useRef(null);

    return (
        <div>
            <First scrollTargetRef={informationRef} />
            <Information ref={informationRef} />
            <Footer />
        </div>
    );
};

export default Home;
