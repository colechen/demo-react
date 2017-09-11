import React from 'react'
import { amountFormat } from '../utils'
import 'bootstrap/dist/css/bootstrap.css'

export class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleEdit(e) {
    //retrieve values from form fields
    var data = {
      id: this.props.record.id,
      title: this.title.value,
      date: this.date.value,
      amount: this.amount.value.replace(/[$,]/gi,'')
    }
    //update database
    $.ajax({
      method: 'PUT',
      url: '/records/' + this.props.record.id,
      dataType: 'JSON',
      data: {record: data},
      success: function(data) {
        this.setState( {edit: false} );
        this.props.handleEditRecord(this.props.record, data);
      }.bind(this)
    });
  }
  handleToggle(e) {
    e.preventDefault();
    this.setState( {edit: !this.state.edit} );
  }
  handleDelete(e) {
    $.ajax({
      method: 'DELETE',
      url: '/records/' + this.props.record.id,
      dataType: 'JSON',
      success: function() {
        this.props.handleDeleteRecord(this.props.record);
      }.bind(this),
      error: function(data) {
        console.log(data);
      }.bind(this)
    });
  }
  renderForm() {
    return (
      <tr>
        <td><input className='form-control'
                ref={(input) => this.date = input}
                type='text' defaultValue={this.props.record.date} /></td>
        <td><input className='form-control'
                ref={(input) => this.title = input}
                type='text' defaultValue={this.props.record.title} /></td>
        <td><input className='form-control'
                ref={(input) => this.amount = input}
                type='text'
                defaultValue={amountFormat(this.props.record.amount)} /></td>
        <td>
          <a className="btn btn-default" onClick={this.handleEdit}>Update</a>
          <a className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    );
  }
  renderRow() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <a className="btn btn-default" onClick={this.handleToggle}>Edit</a>
          <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    );
  }
  render() {
    if(this.state.edit) {
      return this.renderForm();
    } else {
      return this.renderRow();
    }
  }
}
