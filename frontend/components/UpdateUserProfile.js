import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UpdateUserProfile = (props) => {
  const userId = props.match.params.userId
  const [cityData, updateCityData] = useState([])
  const token = localStorage.getItem('token')


  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    age: '',
    height: '',
    bio: '',
    interest: '',
    location: '',
    image: ''
  })

  const inputFields = ['username', 'email', 'password',
    'passwordConfirmation', 'age', 'height', 'bio', 'interest', 'image']

  useEffect(() => {
    axios.get(`/api/user/${userId}`)
      .then(resp => {
        updateFormData(resp.data)
      })
  }, [])

  useEffect(() => {
    axios.get('/api/cities')
      .then(resp => {
        updateCityData(resp.data)
      })
  }, [])

  function handleData(event) {
    const name = event.target.name
    const value = event.target.value
    const data = {
      ...formData,
      [name]: value
    }
    updateFormData(data)
  }

  function handleLocation(event) {
    const data = {
      ...formData,
      location: `${event.target.value}`
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`/api/user/${userId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        props.history.push(`/user/${userId}`)
      })
  }

  // delete profile
  function handleDelete() {
    axios.delete(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        props.history.push('/')
      })
  }

  return <main className="addRiderMain">
    <h1>Hi {formData.username}</h1>
    <h2>Update your Profile</h2>

    <form onSubmit={handleSubmit}>
      {inputFields.map((field, i) => {
        return <div key={i}>
          <label>{field}</label>
          <input
            type="text"
            onChange={handleData}
            value={formData[field] || ''}
            name={field}
          />
        </div>
      })}

      <label>City
        <select name="location" onChange={handleLocation}>
          {cityData.map((city, index) => {
            return <option key={index} value={city.name}>{city.name}</option>
          })}
        </select>
      </label>

      <button>Update</button>

    </form>
    <button onClick={handleDelete}>
      Delete Profile
    </button>
  </main >
}

export default UpdateUserProfile