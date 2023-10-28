import React, { useEffect } from "react";

const Home = () => {

    useEffect(() => {
        document.title = 'E-shopping';
    }, []);

    

    return (
        <div className="home">
            <h5>Home page</h5>
        </div>
    )
}

export default Home;