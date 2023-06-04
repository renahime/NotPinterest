import React from 'react';
import SignupFormPage from '../SignupFormPage';
import './LandingPage.css'

function LandingPage() {
  return (
    <div className="landing-page-container">

      <div className='full-screen-top'>
        <div className="h1">
          <span>Get your next</span>
          <br />
          <span className="h1-blue-text">new look outfit</span>
        </div>

        <div className="images-main-page">
          <img
            src="https://i.pinimg.com/564x/5f/60/3f/5f603fba7b0ae07f66ce429553f3ac14.jpg"
          // alt="Image 1"
          />
          <img
            src="https://i.pinimg.com/564x/a4/b3/e0/a4b3e0e6ae852bca145fe32c40e093a2.jpg"
          // alt="Image 2"
          />
          <img
            src="https://i.pinimg.com/564x/63/3d/ee/633dee2ad3a5dc08925c911f7f25cb2d.jpg"
          // alt="Image 3"
          />
          <img
            src="https://i.pinimg.com/564x/c9/81/85/c98185782bd5aadd8606003b0da76696.jpg"
          // alt="Image 4"
          />
          <img
            src="https://i.pinimg.com/736x/6b/14/21/6b1421585dca717b2eee20b12757d9fe.jpg"
          // alt="Image 5"
          />
          <img
            src="https://i.pinimg.com/564x/5f/16/3f/5f163f2994d73a1f470adcaac95ef08f.jpg"
          // alt="Image 6"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSNdvTkMY2clFD6tu6PSjaa3N0hzGLRhtKCH1Z2vyV6HTbB8QYlIzCAwozHEMU5SWcMl_Ldoml35ceMPUlkJSZ7g_wOWIeAjNrttc9bt_uQJ3nBCbAPC5Tz6eCe8Ly7zjnqzDU&usqp=CAc"
          // alt="Image 7"
          />
        </div>
      </div>

      <div className='full-screen-bottom'>
        {/* <img src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" /> */}
        <div className='landing-page-left-side'>
          <h1 className='landing-page-left-side-text'>
            Sign up to get your ideas</h1>
        </div>

        <div className='landing-page-right-side'>
          {/* <h1>Login</h1> */}
          <SignupFormPage />
        </div>

        {/* <div class="main-page-up-arrow-circle">
          <svg class="main-page-up-arrow" viewBox="0 0 24 24" aria-label="Scroll up" role="img"><path d="M21.75 19.5c-.58 0-1.15-.22-1.59-.65L12 10.79l-8.16 8.06c-.88.87-2.3.87-3.18 0a2.21 2.21 0 0 1 0-3.15L12 4.5l11.34 11.2c.88.87.88 2.28 0 3.15-.44.43-1.01.65-1.59.65"></path></svg>
        </div> */}


      </div>




    </div>
  );
}

export default LandingPage;
