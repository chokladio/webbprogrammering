import React, {Component} from 'react';
import './App.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';

class App extends Component {
  render() {
    return (<div>
      <div className="jumbotron jumbotron-fluid">
        <div class="container">
          <div class="col-md">
            <div class="row">
              <h1 class="display-4">Sallad? Sallad!</h1>
            </div>
            <div class="row">
              <p class="lead">"Man säger ju aldrig nej till lite sallad"</p>
            </div>
          </div>
        </div>
      </div>

      <ComposeSalad inventory={inventory}/>

  </div>);
  }
}

export default App;
