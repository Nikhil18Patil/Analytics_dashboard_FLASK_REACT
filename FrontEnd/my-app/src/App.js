// src/App.js
import React from 'react';
import Dashboard from './Dashboard'
import './App.css';
import dashboardIcon from './images/icons8-dashboard-50.png';
import productIcon from './images/icons8-product-50.png';
import customerIcon from './images/icons8-customers-50.png';
import incomeIcon from './images/icons8-income-50.png';
import promotIcon from './images/icons8-mail-advertising-50.png';
import helpIcon from './images/icons8-help-50.png';
import setIcon from './images/icons8-settings-50.png';
import nikhil from './images/nik.png';


const App = () => {
  return (
    <div className="App">
      <div className='sideNav'>

        <div className='navHeader'>
            
            <div className="i_t" >
                        <img src={setIcon} alt="Dashboard Icon" className="menu-icon" />
                        <a href="#" >API Dashboard</a>
                      </div>
              <div id="mySidenav" className="sideManue">
                      <div className="i_t" style={{ backgroundColor: 'blue' }}>
                        <img src={dashboardIcon} alt="Dashboard Icon" className="menu-icon" />
                        <a href="#">Dashboard</a>
                      </div>
                      <div className="i_t">
                        <img src={customerIcon} alt="Customer Icon" className="menu-icon" />
                        <a href="#">Customer</a>
                      </div>
                      <div className="i_t">
                        <img src={productIcon} alt="Product Icon" className="menu-icon" />
                        <a href="#">Product</a>
                      </div>
                      <div className="i_t">
                        <img src={incomeIcon} alt="Income Icon" className="menu-icon" />
                        <a href="#">Income</a>
                      </div>
                      <div className="i_t">
                        <img src={promotIcon} alt="Promote Icon" className="menu-icon" />
                        <a href="#">Promote</a>
                      </div>
                      <div className="i_t">
                        <img src={helpIcon} alt="Help Icon" className="menu-icon" />
                        <a href="#">Help</a>
                      </div>  
                </div>
        </div>

        <div className='navFooter'>
          <div className='a'> Upgreade to pro </div>
          <div className="i_t">
                        <img src={nikhil} alt="Nikhil Icon" className="menu-icon" />
                        <a>Nikhil Patil</a>
          </div>  
        </div>
      </div>

      <div className='dashBoardBody'>
         <Dashboard/> 
      </div> 
    </div>
  );
}

export default App;
