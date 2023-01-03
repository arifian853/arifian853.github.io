import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const Achievements = () => {
  return (
    <div className="achievements-parent">
        <h1 className="text-4xl">Achievements</h1>
        <br />
        <div className="container-achievements">
            <div className="the-carousel shadow-lg">
                <Carousel>
                    <div>
                        <img className='img-size' src="../images/Sertifikat MSIB X Dicoding Batch 3.png" alt="A"/>
                    </div>
                    <div>
                        <img className='img-size' src="../images/re-cloud.png" alt="B"/>
                    </div>
                    <div>
                        <img className='img-size' src="../images/ecs.png" alt="A"/>
                    </div>
                </Carousel>
            </div>
        </div>
    </div>
  )
}

export default Achievements