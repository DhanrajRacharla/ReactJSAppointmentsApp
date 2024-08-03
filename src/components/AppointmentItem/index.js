// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {eachItem, updateTheStarStatus} = props
  const {id, name, date, isStarred} = eachItem

  const updateStar = () => {
    updateTheStarStatus(id)
  }

  const image = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="list-item">
      <div className="name-star-container">
        <h1 className="appointer-heading">{name}</h1>
        <img onClick={updateStar} className="startImg" src={image} alt="" />
      </div>
      <p className="date-pragraph">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
