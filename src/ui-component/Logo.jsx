import React from 'react';
import NavLogo from 'assets/images/logo-removebg-preview.png';

function Logo() {
  return (
    <>
    <div>
      <img src={NavLogo} alt="NXTSTEP" loading="lazy" height={70} />
      </div>
    <div>
    <span style={{color:"#ea580c",fontFamily:"Elegant Serif",fontSize:"22px",}}>NXTSTEP</span>
    <p style={{color:"white",fontFamily:"Spaced serif ",margin:"0"}}>Design Your Future</p>
    </div>
    </>
  );
}

export default Logo;
