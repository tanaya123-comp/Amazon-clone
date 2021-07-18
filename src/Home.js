import React from 'react';
import './Home.css';
import Product from './Product';
import uuid from 'uuid/dist/v4';

function Home() {
    return (
        <div className="home">
            <div className="home__container" >
               
            </div>

            <div className="home_products">
            
            <div className="home__row">
                <Product 
                id={uuid()}
                key={uuid()}
                title="The woman in the window" 
                price={19.99} 
                image="https://m.media-amazon.com/images/M/MV5BZWE3OWE4OTMtODcwMS00MzRlLWJiNWItMGY4ZWM5NjdmZDk1XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"
                rating={5}
                />

                <Product 
                id={uuid()}
                key={uuid()}
                title="The woman in the window" 
                price={19.99} 
                image="https://m.media-amazon.com/images/M/MV5BZWE3OWE4OTMtODcwMS00MzRlLWJiNWItMGY4ZWM5NjdmZDk1XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"
                rating={5}
                />
                
            </div>

            <div className="home__row">
            <Product 
            id={uuid()}
            key={uuid()}
                title="The woman in the window" 
                price={19.99} 
                image="https://m.media-amazon.com/images/M/MV5BZWE3OWE4OTMtODcwMS00MzRlLWJiNWItMGY4ZWM5NjdmZDk1XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"
                rating={5}
                />
            </div>

            <div className="home__row" >
            <Product 
            id={uuid()}
            key={uuid()}
                title="The woman in the window" 
                price={19.99} 
                image="https://m.media-amazon.com/images/M/MV5BZWE3OWE4OTMtODcwMS00MzRlLWJiNWItMGY4ZWM5NjdmZDk1XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"
                rating={5}
                />
            </div>
                
            </div>
            
        </div>
    )
}

export default Home;
