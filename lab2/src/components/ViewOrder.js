import React from 'react';

const ViewOrder = props => {
  if (props.order.length > 0) {
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
          {props.order.map((s, i) => <OrderView order={s} index={i} key={i.toString()}/>)}
        </tbody>
      </table>
    </div>);
  }
  return ("");
}

const OrderView = props => (
  <tr>
    <td>{(props.index + 1)}</td>
    <td>{props.order.foundation.map(n => n.name)}</td>
    <td>{props.order.protein.map(n => n.name + ", ")}</td>
    <td>{props.order.extra.map(n => n.name + ", ")}</td>
    <td>{props.order.dressing.map(n => n.name)}</td>
    <td>{props.order.price}</td>
    <td>
    <p className="text-danger">ta bort</p>
  </td>
</tr>)

export default ViewOrder;
