import React, {Component} from 'react';

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const inventory = this.props.inventory;
    let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
    let proteins = Object.keys(inventory).filter(name => inventory[name].protein);
    let extras = Object.keys(inventory).filter(name => inventory[name].extra);
    let dressings = Object.keys(inventory).filter(name => inventory[name].dressing);
    return (<div className="container">
      <form onSubmit={this.handleSubmit}>
        <div class="row justify-content-center mt-5">
          <h5>Välj en bas</h5>
          <div class="w-100"></div>
          <div class="col-xl-6 col-md-8 col-sm-10 col-11">
            {
              foundations.map(name => <label class="form-check-label col-md-4 col-sm-6 col">
                <input type="checkbox" class="form-check-input" value={this.state.value} onChange={this.handleChange}/>
                <span>{name}</span>
              </label>)
            }
          </div>
        </div>

        <div class="row justify-content-center mt-5">
          <h5>Välj protein</h5>
          <div class="w-100"></div>
          <div class="col-xl-6 col-md-8 col-sm-10 col-11">
            {
              proteins.map(name => <label class="form-check-label col-md-4 col-sm-6 col">
                <input type="checkbox" class="form-check-input" value={this.state.value} onChange={this.handleChange}/>
                <span>{name}</span>
              </label>)
            }
          </div>
        </div>

        <div class="row justify-content-center mt-5">
          <h5>Välj extra ingredienser</h5>
          <div class="w-100"></div>
          <div class="col-xl-6 col-md-8 col-sm-10 col-11">
            {
              extras.map(name => <label class="form-check-label col-md-4 col-sm-6 col">
                <input type="checkbox" class="form-check-input" value={this.state.value} onChange={this.handleChange}/>
                <span>{name}</span>
              </label>)
            }
          </div>
        </div>

        <div class="row justify-content-center mt-5">
          <h5>Välj en dressing</h5>
          <div class="w-100"></div>
          <div class="col-xl-6 col-md-8 col-sm-10 col-11">
            {
              dressings.map(name => <label class="form-check-label col-md-4 col-sm-6 col">
                <input type="checkbox" class="form-check-input" value={this.state.value} onChange={this.handleChange}/>
                <span class="px-2 py-1">{name}</span>
              </label>)
            }
          </div>
        </div>
      </form>
    </div>);
  }
}

export default ComposeSalad;
