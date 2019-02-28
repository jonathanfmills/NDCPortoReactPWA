import React, { Component } from 'react';
import './App.css';
import Day from './components/Day';
import Axios from 'axios';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      days: ['Thursday', 'Friday'],
      selectedDay: 0,
      talks: {}
    };
  }
  changeDay = (e)=>{
    this.getTalks(e.target.id);
  }

  componentDidMount(){
    this.getTalks(this.state.selectedDay);
  }

  getTalks = (day) => {
    Axios.get(`day${day}.json`)
      .then((response)=>{
        this.setState({talks: response.data, selectedDay: Number(day)});
      })
      .catch( (error) => {
        console.log(error);
      });
  }
  render() {
    const {talks, days, selectedDay} = this.state;
    return (
      <div className="container">
        <div className="row">

          <div className="col-md-12">

            <div className="panel">
              <div className="panel-body">
                  <Day talks={talks} days={days} selectedDay={selectedDay} changeDay={this.changeDay}></Day>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
