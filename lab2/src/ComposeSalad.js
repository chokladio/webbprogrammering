import React, {Component} from 'react';
import Checkbox from "./Checkbox";
import Salad from "./Salad";

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
      foundation: [],
      protein: [],
      extras: [],
      foundation: []
    }
  }

  alertArray = () => {
    alert(this.state.foundation);
    alert(this.state.protein);
    alert(this.state.extras);
    alert(this.state.dressing);
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

  handleChange(e) {
    const item = e.target.name;
    const value = e.target.value;
    let isChecked = e.target.checked;

    this.setState({foundation: value});
    this.setState({dressing: value});
    this.setState(prevState => ({
      protein: [
        prevState.protein,
        item
      ]
    }));
    this.setState(prevState => ({
      extras: [
        prevState.extras,
        item
      ]
    }));

    console.log(this.setState);

    //DUMT med lista pga behöver söka igenom för att se om objekt redan finns. Fixa Object/Map
    // if (isChecked) {
    //   this.setState(prevState => ({
    //     ingredients: [
    //       ...prevState.ingredients,
    //       item
    //     ]
    //   }));
    // } else if (value) {
    //   this.setState(prevState => ({
    //     ingredients: [
    //       ...prevState.ingredients,
    //       value
    //     ]
    //   }));
    // }
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
            <select class="form-control" value={this.state.value} onChange={this.handleChange}>
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
                <Checkbox name={name} onChange={this.handleChange}/>
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
                <Checkbox name={name} onChange={this.handleChange}/>
                <span className="px-2 py-1">{name}</span>
              </label>)
            }
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <h5>Välj en dressing</h5>
          <div className="w-100"></div>
          <div className="form-group mt-2 col-xl-4 col-md-6 col-8">
            <select class="form-control" value={this.state.value} onChange={this.handleChange}>
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
