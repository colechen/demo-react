import React from 'react'
import { render } from 'react-dom'
import { hello, goodbye } from './lib'
import { Records } from './components/records'


const default_data = [
	{
		id: 1,
		date: "2017/09/01",
		title: "Record 1",
		amount: 200
	},
	{
		id: 2,
		date: "2017/09/02",
		title: "Record 2",
		amount: -300
	},
	{
		id: 3,
		date: "2017/09/03",
		title: "Record 3",
		amount: 1000
	}
];


(function() {
    $.ajax({
      method: 'GET',
      url: '/records/',
      success: function(data) {
      	console.log(data);
       	render(
		<div>
			< Records data={data}/>
		</div>,
		document.getElementById('app')
	)
      },
      error: function(err) {
      	console.log(err);
      }
    });
})();
