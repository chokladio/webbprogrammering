import React, {Component} from 'react';
import Salad from "./Salad";

const list = {
  foundation: "",
  protein: [],
  extras: [],
  dressing: ""
};

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = list;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearArray = () => {
    this.setState(list);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.target.classList.add("was-validated");
    if (e.target.checkValidity() === false) {
      alert("Din sallad är inte komplett");
      if (this.state.foundation === "") {
        e.target.scrollIntoView({behavior: "smooth"});
      }
    } else {

      let sallad = []; //Skapa lista som add() kan hantera
      sallad.push(this.state.foundation);
      let arr = this.state.protein;
      Object.keys(arr).forEach(k => {
        if (arr[k]) {
          sallad.push(k);
        }
      });
      arr = this.state.extras;
      Object.keys(arr).forEach(k => {
        if (arr[k]) {
          sallad.push(k);
        }
      });
      sallad.push(this.state.dressing);

      this.createSalad(sallad);
      this.props.history.push('/view-order');
      this.clearArray();
    }
  }

  createSalad = (s) => {
    const mySalad = new Salad();
    mySalad.add(s);
    this.props.newOrder(mySalad);
  }

  handleChange(e, type) {
    e.target.parentElement.classList.add("was-validated");
    const item = e.target.name;
    if (type === "foundation" || type === "dressing") {
      this.setState({[type]: e.target.value});
    } else if (type === "extras" || type === "protein") {
      let state = this.state[type][item];
      this.setState(prevState => ({
        [type]: {
          ...prevState[type],
          [item]: !state
        }
      }));
    }
  }

  render() {
    const inventory = this.props.inventory;
    let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
    let proteins = Object.keys(inventory).filter(name => inventory[name].protein);
    let extras = Object.keys(inventory).filter(name => inventory[name].extra);
    let dressings = Object.keys(inventory).filter(name => inventory[name].dressing);

    return (
      <form onSubmit={this.handleSubmit} noValidate="noValidate">

      <div className="row justify-content-center mt-5">
        <h5>Välj en bas</h5>
        <div className="w-100"></div>
        <div className="form-group mt-2 col-xl-4 col-md-6 col-8">
          <select required="required" className="form-control" id="foundationSelect" value={this.state.foundation} onChange={(e) => this.handleChange(e, "foundation")}>
            <option value="" hidden="hidden">Välj bas</option>
            {foundations.map(name => <option value={name} key={name}>{name}</option>)}
          </select>
          <div className="invalid-feedback">Var god välj en bas till salladen</div>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <h5>Välj protein</h5>
        <div className="w-100"></div>
        <div className="form-check mt-2 col-xl-7 col-md-8 col-sm-10 col-11">
          {
            proteins.map(name => <label key={name} className="form-check-label px-2 py-1 col-xl-6 col">
              <input type='checkbox' name={name} checked={this.state.protein[name] || false} onChange={(e) => this.handleChange(e, "protein")}/>
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
              <input type='checkbox' name={name} checked={this.state.extras[name] || false} onChange={(e) => this.handleChange(e, "extras")}/>
              <span className="px-2 py-1">{name}</span>
            </label>)
          }
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <h5>Välj en dressing</h5>
        <div className="w-100"></div>
        <div className="form-group mt-2 col-xl-4 col-md-6 col-8">
          <select required="required" className="form-control" value={this.state.dressing} onChange={(e) => this.handleChange(e, "dressing")}>
            <option value="" hidden="hidden">Välj dressing</option>
            {dressings.map(name => <option value={name} key={name}>{name}</option>)}
          </select>
          <div className="invalid-feedback">Var god välj en dressing</div>
        </div>
      </div>
      <div className="row justify-content-center mt-5 pt-5 border-top">
        <input className="btn btn-primary" type="submit" value="Lägg till i varukorg och gå till kassan"/>
      </div>
    </form>);
  }
}

export default ComposeSalad;
