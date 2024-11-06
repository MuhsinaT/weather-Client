import React, { useState } from 'react';
import './dash.css';
import { Row, Col } from 'react-bootstrap';
import User from '../Users/User';
import Weather from '../Weather/Weather';

function Dashh() {
    const [state, setState] = useState('users'); 

  return (
    <>
      <Row className="vh-100">
        <Col xs={12} md={3} className="bg-light border-right d-flex flex-column justify-content-center align-items-center">
          <button 
            className="dashboard-button" 
            onClick={() => setState('users')}
          >
            Users
          </button>
          <button 
            className="dashboard-button" 
            onClick={() => setState('chart')}
          >
            Weather Chart
          </button>
        </Col>

        <Col xs={12} md={9} className="p-4">
          {state === 'users' && <User />}  
          {state === 'chart' && <Weather />}  
        </Col>
      </Row>    
    </>
  );
}

export default Dashh;
