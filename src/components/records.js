import React from 'react'
import { AmountBox } from './amount_box'
import { Record } from './record'
import { RecordForm } from './record_form'
import { Clock } from './Clock'
import 'bootstrap/dist/css/bootstrap.css'
import update from 'react-addons-update'

export class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: this.props.data };

    //this.addRecord = this.addRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.credits = this.credits.bind(this);
    this.debits = this.debits.bind(this);
    this.balance = this.balance.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }
  addRecord = (record) => {
    // var records = React.addons.update(this.state.records, {$push: [record]});
    var records = [
      ...this.state.records,
      record
    ]
    this.setState({records: records});
  }
  updateRecord(record, data) {
    var index = this.state.records.indexOf(record);
    var records = update(
                    this.state.records, {$splice: [[index, 1, data]]}
                  );
    this.setState({records: records});
  }
  deleteRecord(record) {
    // var index = this.state.records.indexOf(record);
    // var records = React.addons.update(
    //                 this.state.records, {$splice: [[index, 1]]}
    //               );
    var records = this.state.records.filter((r) => r.id !== record.id);
    this.setState({records: records});
  }
  credits() {
    var credit = this.state.records.filter((record) => record.amount >= 0);
    return credit.reduce((prev, curr) => prev+parseFloat(curr.amount),0);
  }
  debits() {
    var credit = this.state.records.filter((record) => record.amount < 0);
    return credit.reduce((prev, curr) => prev+parseFloat(curr.amount),0);
  }
  balance() {
    return this.credits() + this.debits();
  }

  render() {
    const styleObj = {
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 30
    };
    return (
      <div style={styleObj} >
        <div className='panel panel-primary'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Account</h3>
          </div>
          <div className='panel-body'>
            <Clock />
            <legend>Records</legend>
            <div className='row'>
              <AmountBox type='success' amount={this.credits()} text='Credit' />
              <AmountBox type='danger' amount={this.debits()} text='Debit' />
              <AmountBox type='info' amount={this.balance()} text='Balance' />
            </div>
            <hr />
            <RecordForm handleNewRecord={this.addRecord}/>
            <hr />
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.records.map( (record) =>
                  <Record key={record.id} record={record}
                    handleDeleteRecord={this.deleteRecord}
                    handleEditRecord={this.updateRecord} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
