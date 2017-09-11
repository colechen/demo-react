import React from 'react'
import { amountFormat } from '../utils'
import 'bootstrap/dist/css/bootstrap.css'

export class AmountBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-md-4">
        <div className={"panel panel-"+this.props.type}>
          <div className="panel-heading">
            {this.props.text}
          </div>
          <div className="panel-body">
            {amountFormat(this.props.amount)}
          </div>
        </div>
      </div>
    );
  }

}
