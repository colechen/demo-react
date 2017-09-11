import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export class RecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      amount: ''
    }
    this.valid = this.valid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  valid() {
    return (this.state.title && this.state.date && this.state.amount);
  }
  handleChange(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  }
  handleSubmit(e) {
    e.preventDefault();
    $.post('/records/',
          {record: this.state},
          function(data) {
            this.props.handleNewRecord(data);
            this.setState({
              title: '',
              date: '',
              amount: ''
            });
          }.bind(this),
          'JSON'
    );
  }
  render() {
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group' style={{paddingRight: 10}}>
          <input className='form-control' type='text'
                placeholder='Date' name='date'
                value={this.state.date} onChange={this.handleChange} />
        </div>
        <div className='form-group' style={{paddingRight: 10}}>
          <input className='form-control' type='text'
              placeholder='Title' name='title'
              value={this.state.title} onChange={this.handleChange} />
        </div>

        <div className='form-group' style={{paddingRight: 10}}>
          <input className='form-control' type='text'
              placeholder='Amount' name='amount'
              value={this.state.amount} onChange={this.handleChange} />
        </div>
        <button type='submit' className='btn btn-primary'
              disabled={!this.valid()}>Create Record</button>
      </form>
    )
  }

}
