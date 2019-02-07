import React, {Component} from 'react';

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "ingredients": []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  onClearArray = () => {
    this.setState({"ingredients": []});
  };

  alertArray = () => {
    alert(this.state["ingredients"]);
  };

  handleClick(name) {
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, name]
    }));
  }

  render() {
    const inventory = this.props.inventory;
    let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
    let proteins = Object.keys(inventory).filter(name => inventory[name].protein);
    let extras = Object.keys(inventory).filter(name => inventory[name].extra);
    let dressings = Object.keys(inventory).filter(name => inventory[name].dressing);
    return (<div className="container">
      <div>
        <button onClick={() => this.handleClick("test")}>
          lägg till
        </button>
        <button onClick={this.onClearArray}>
          rensa
        </button>
        <button onClick={this.alertArray}>
          alert
        </button>
        <div></div>

      </div>

      <form onSubmit={this.handleSubmit}>
        <div className="row justify-content-center mt-5">
          <h5>Välj en bas</h5>
          <div className="w-100"></div>
          <div className="col-xl-7 col-md-8 col-sm-10 col-11">
            {foundations.map(name => <DrawChoices name={name} this={this}/>)}
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <h5>Välj protein</h5>
          <div className="w-100"></div>
          <div className="col-xl-7 col-md-8 col-sm-10 col-11">
            {
              proteins.map(name => <label className="form-check-label col-xl-6 col">
                <input type="checkbox" className="form-check-input" key={name} onClick={() => this.handleClick(name)}/>
                <span className="px-2 py-1">{name}</span>
              </label>)
            }
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <h5>Välj extra ingredienser</h5>
          <div className="w-100"></div>
          <div className="col-xl-7 col-md-8 col-sm-10 col-11">
            {extras.map(name => <DrawChoices name={name} this={this}/>)}
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <h5>Välj en dressing</h5>
          <div className="w-100"></div>
          <div className="col-xl-7 col-md-8 col-sm-10 col-11">
            {dressings.map(name => <DrawChoices name={name} this={this}/>)}
          </div>
        </div>
      </form>
    </div>);
  }
}

function DrawChoices(props) {
  return (<label className="form-check-label col-xl-4 col-sm-6 col">
    <input type="checkbox" className="form-check-input" key={props.name} onClick={() => props.this.handleClick(props.name)}/>
    <span className="px-2 py-1">{props.name}</span>
  </label>);
}

export default ComposeSalad;
