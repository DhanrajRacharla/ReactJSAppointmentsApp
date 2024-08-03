// Write your code here
import './index.css'
import {Component} from 'react'
import AppointmentItem from '../AppointmentItem'
import {v4 as uuidv4} from 'uuid'

const appointmentItems = [
  // {
  //   id: '1',
  //   name: 'Dhanraj',
  //   date: '21-22-2020 Tuesday',
  // },
  // {
  //   id: '2',
  //   name: 'Shashi',
  //   date: '10-85-2021 Wednesday',
  // },
]

class Appointments extends Component {
  state = {
    initialAppoinmentItems: appointmentItems,
    name: '',
    date: '',
    date2: '',
    starredButton: false,
  }

  updateName = event => {
    this.setState({name: event.target.value})
  }

  updateDate = event => {
    const date1 = new Date(event.target.value)
    this.setState({date: date1.toDateString(), date2: event.target.value})
  }

  addAppoinment = event => {
    event.preventDefault()
    const {name, date} = this.state
    const newItem = {
      id: uuidv4(),
      name: name,
      date: date,
      isStarred: false,
    }
    this.setState(prevState => ({
      initialAppoinmentItems: [...prevState.initialAppoinmentItems, newItem],
      name: '',
      date2: '',
    }))
  }

  updateTheStarStatus = itemId => {
    const {initialAppoinmentItems} = this.state
    this.setState(prevState => ({
      initialAppoinmentItems: prevState.initialAppoinmentItems.map(eachItem => {
        if (eachItem.id === itemId) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  getStarredItems = () => {
    const {initialAppoinmentItems, starredButton} = this.state
    this.setState(prevState => ({starredButton: !prevState.starredButton}))
  }

  render() {
    const {initialAppoinmentItems, date, name, starredButton, date2} =
      this.state
    const updateAppoinmentItem = starredButton
      ? initialAppoinmentItems.filter(eachItem => eachItem.isStarred === true)
      : initialAppoinmentItems
    const button = starredButton
      ? 'color-starred-button starred-button'
      : 'starred-button'

    return (
      <div className="background-container">
        <div className="main-container">
          <div className="white-container">
            <div>
              <form id="form" onSubmit={this.addAppoinment}>
                <h1 className="appointment-heading">Add Appointment</h1>
                <label htmlFor="title">TITLE</label>
                <br />
                <input
                  onChange={this.updateName}
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={name}
                />
                <br />
                <label htmlFor="date">DATE</label>
                <br />
                <input
                  onChange={this.updateDate}
                  id="date"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={date2}
                />
                <br />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="appointment-heading-button">
            <h1 className="appoinment-items-heading">Appointments</h1>
            <div>
              <button onClick={this.getStarredItems} className={button}>
                Starred
              </button>
            </div>
          </div>

          <ul className="unordered-list-items">
            {updateAppoinmentItem.map(eachItem => (
              <AppointmentItem
                updateTheStarStatus={this.updateTheStarStatus}
                eachItem={eachItem}
                key={eachItem.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
