import React, {Component} from 'react';

class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  render() {

    const order = this.props.order;
    console.log(order);
    if (order.length>0) {
      return (<div className="row justify-content-center table-responsive">
        <h4>Din order:</h4>
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Bas</th>
              <th scope="col">Protein</th>
              <th scope="col">Extra</th>
              <th scope="col">Dressing</th>
              <th scope="col">Pris</th>
              <th scope="col">ta bort</th>
            </tr>
          </thead>
          <tbody>
            {order.map((sallad) => <OrderView order={sallad} index={this.state.count} key={sallad.price() + Object.values(sallad.extra).length + order.length}/>)}
          </tbody>
        </table>
      </div>);
    }
    return ("");
  }
}

function OrderView(props) {
  return (<tr>
    <td>{props.index}</td>
    <td>{props.order.foundation.map(n => n.name)}</td>
    <td>{props.order.protein.map(n => n.name + ", ")}</td>
    <td>{props.order.extra.map(n => n.name + ", ")}</td>
    <td>{props.order.dressing.map(n => n.name)}</td>
    <td>{props.order.price()}</td>
    <td><p class="text-danger">ta bort</p></td>

  </tr>);
}

export default ViewOrder;
