import React, {Component} from 'react';
import Checkbox from "./Checkbox";
import Salad from "./Salad";

const list = {foundation: ["Sallad"], protein: [], extras: [], dressing: ["Ceasardressing"]};

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearArray = () => {
    this.state = {
      list,
    }
  }

  alertArray = () => {
    alert(this.state.foundation + this.state.protein + this.state.extras + this.state.dressing);
  }

  createSalad = () => {
    const ceasarsallad = [
      'Sallad',
      'Kycklingfilé',
      'Tomat',
      'Krutonger',
      'Inlagd lök',
      'Parmesan',
      'Ceasardressing'
    ];

    let mySalad = new Salad();
    mySalad.add(ceasarsallad);
    alert(mySalad.toString());
    alert(mySalad.price());
  }

  handleSubmit(f) {
    //Does nothing
  }

  handleChange(e, type) {
    const item = e.target.name;
    let isChecked = e.target.checked;

    if (type == "foundation") {
      this.setState({type: item});
    } else if (type == "protein") {
      this.setState(prevState => ({
        protein: [prevState.protein, item]
      }));
    } else if (type == "extra") {
      this.setState(prevState => ({
        extras: [prevState.extras, item]
      }));
    } else if (type == "dressing") {
      this.setState({type: item});
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
          submit
        </button>
      </div>

      <form onSubmit={this.handleSubmit}>
        <div className="row justify-content-center mt-5">
          <h5>Välj en bas</h5>
          <div className="w-100"></div>
          <div className="form-group mt-2 col-xl-4 col-md-6 col-8">
            <select class="form-control" name={this.state.value} onChange={(e) => this.handleChange(e, "foundation")}>
              {foundations.map(name => <option>{name}</option>)}
            </select>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <h5>Välj protein</h5>
          <div className="w-100"></div>
          <div className="form-check mt-2 col-xl-7 col-md-8 col-sm-10 col-11">
            {
              proteins.map(name => <label className="form-check-label px-2 py-1 col-xl-6 col">
                <Checkbox name={name} onChange={(e) => this.handleChange(e, "protein")}/>
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
              extras.map(name => <label className="form-check-label px-2 py-1 col-xl-4 col-sm-6 col">
                <Checkbox name={name} onChange={(e) => this.handleChange(e, "extra")}/>
                <span className="px-2 py-1">{name}</span>
              </label>)
            }
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <h5>Välj en dressing</h5>
          <div className="w-100"></div>
          <div className="form-group mt-2 col-xl-4 col-md-6 col-8">
            <select class="form-control" name={this.state.value} onChange={(e) => this.handleChange(e, "dressing")}>
              <option>Välj...</option>
              {dressings.map(name => <option>{name}</option>)}
            </select>
          </div>
        </div>
      </form>
    </div>);
  }
}

export default ComposeSalad;
