import React, {Component} from 'react';
import Checkbox from "./Checkbox";
import Salad from "./Salad";

const list = {
  foundation: [],
  protein: [],
  extras: [],
  dressing: [],
  checked:{}
};

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = list;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearArray = () => { //Fixa så att form resettas
    this.state = list;

  }

  alertArray = () => { //Bara test
    alert(this.state.foundation + "," + this.state.protein + "," + this.state.extras + "," + this.state.dressing);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let sallad = []; //Skapa lista som add() kan läsa
    sallad.push(this.state.foundation);
    this.state.protein.forEach((p) => {sallad.push(p)});
    this.state.extras.forEach((p) => {sallad.push(p)});
    sallad.push(this.state.dressing);
    console.log(sallad);

    this.createSalad(sallad);
  }

  createSalad = (s) => {
    const newSalad = new Salad();
    newSalad.add(s);
    this.props.newOrder(newSalad);
  }

  handleChange(e, type) {
    const item = e.target.name;
    if (type == "foundation" || type == "dressing") {
      this.setState({[type]: e.target.value});
    } else if (type == "extras" || type == "protein") {
      let array = [...this.state[type]];
      let index = array.indexOf(item);

      if (index > -1) { //om den redan finns
        array.splice(index, 1); //ta bort
        this.setState({[type]: array});
      } else { //om den inte finns
        this.setState(prevState => ({
          [type]: [...prevState[type],item]
        }));
      }
    }
  }

  render() {
    const inventory = this.props.inventory;
    let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
    let proteins = Object.keys(inventory).filter(name => inventory[name].protein);
    let extras = Object.keys(inventory).filter(name => inventory[name].extra);
    let dressings = Object.keys(inventory).filter(name => inventory[name].dressing);

    return (<div className="container">
      <div>
        <button onClick={this.clearArray}>
          rensa
        </button>
        <button onClick={this.alertArray}>
          alert
        </button>
        <button onClick={this.createSalad}>
          testsallad
        </button>
      </div>

      <form onSubmit={this.handleSubmit}>
        <div className="row justify-content-center mt-5">
          <h5>Välj en bas</h5>
          <div className="w-100"></div>
          <div className="form-group mt-2 col-xl-4 col-md-6 col-8">
            <select className="form-control" defaultValue="Välj bas" onChange={(e) => this.handleChange(e, "foundation")}>
              <option  disabled="disabled" hidden="hidden">Välj bas</option>
              {foundations.map(name => <option key={name}>{name}</option>)}
            </select>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <h5>Välj protein</h5>
          <div className="w-100"></div>
          <div className="form-check mt-2 col-xl-7 col-md-8 col-sm-10 col-11">
            {
              proteins.map(name => <label key={name} className="form-check-label px-2 py-1 col-xl-6 col">
                <Checkbox name={name} checked={this.state.protein.includes({name}) ? this.state.protein.includes({name}) : false} onChange={(e) => this.handleChange(e, "protein")}/>
                <span className="px-2 py-1">{name}</span>
              </label>)
            }
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <h5>Välj extra ingredienser</h5>
          <div className="w-100"></div>
          <div className="form-check mt-2 col-xl-7 col-md-8 col-sm-10 col-11">
            {
              extras.map(name => <label key={name} className="form-check-label px-2 py-1 col-xl-4 col-sm-6 col">
                <Checkbox name={name} checked={this.state.extras.includes({name}) ? this.state.extras.includes({name}) : false} onChange={(e) => this.handleChange(e, "extras")}/>
                <span className="px-2 py-1">{name}</span>
              </label>)
            }
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <h5>Välj en dressing</h5>
          <div className="w-100"></div>
          <div className="form-group mt-2 col-xl-4 col-md-6 col-8">
            <select className="form-control" defaultValue="Välj dressing" onChange={(e) => this.handleChange(e, "dressing")}>
              <option disabled="disabled" hidden="hidden">Välj dressing</option>
              {dressings.map(name => <option key={name}>{name}</option>)}
            </select>
          </div>
        </div>
        <input type="submit" value="Submit"/>
      </form>
    </div>);
  }
}

export default ComposeSalad;
