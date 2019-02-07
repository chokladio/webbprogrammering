import React, {Component} from 'react';
import './App.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';

class App extends Component {
  render() {
    return (<div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <div className="row justify-content-center">
              <h1 className="display-4">Sallad? Sallad!</h1>
            </div>
            <div className="row justify-content-center">
              <p className="lead">"Man säger ju aldrig nej till lite sallad"</p>
            </div>
        </div>
      </div>

      <ComposeSalad inventory={inventory}/>

    <footer className="page-footer font-small gray mt-5 pt-5 font-small">
      <div className="footer-copyright text-center py-3">
        <p>EDAF90 - Web Programming 2019</p>
      </div>
    </footer>

  </div>);
  }
}

export default App;
