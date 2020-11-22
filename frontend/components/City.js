import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
import Navbar from './Navbar'


const City = (props) => {
  const [city, updateCity] = useState({})
  const [text, updateText] = useState('')

  const cityName = props.match.params.cityName
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`/api/cities/${cityName}`)
      .then(resp => {
        const data = resp.data
        updateCity(data)
      })
  }, [])

  if (!city.name) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
      </div>
    </div>
  }


  // delete city
  function handleDelete() {
    axios.delete(`/api/cities/${cityName}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        props.history.push('/cities')
      })
  }

  // comments section
  function handleComment() {
    axios.post(`/api/cities/${cityName}/comments`, { text }, {
      headers: { Authorization: `Bearer ${token}` }

    })
      .then(resp => {
        updateText('')
        updateCity(resp.data)
      })

  }

  function handleDeleteComment(commentId) {
    axios.delete(`/api/cities/${cityName}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateCity(resp.data)
      })
  }

  return <main className="singleCityMain">
    <header>
      <Navbar />
    </header>

    <section className="cityInfo">
      <img src={city.image} alt={city.name} />
      <h2>{city.name}</h2>
      <h3>{city.country}</h3>
      <p>{city.bio}</p>
    </section>

    <section className="buttonSection">
      {token && city && isCreator(city.user._id) &&
        <button onClick={handleDelete}>
          Remove City
        </button>}
      {token && city && isCreator(city.user._id) && <Link to={`/cities/edit-city/${cityName}`}>
        <button>
          Edit City
        </button>
      </Link>}
      {token && <Link to={`/cities/${city.name}/users`}>
        <button className="darkButton">
          See Users in {city.name}
        </button>
      </Link>}
      {token && <a rel="noreferrer" target='_blank' href={'shers-chat-client.herokuapp.com'}>
        <button className="darkButton">
          Join Chat Room
        </button>
      </a>}
    </section>
    <section className="commentsSection">
      <h3>User Comments About {city.name}</h3>
      <div className="previousComments">
        {/* this will prevent breaking when loading checks if is any comments */}
        {city.comments && city.comments.map(comment => {

          return <section className="commentOuter" key={comment._id}>
            <div className="userImage">
              <img src={comment.user.image} />
            </div>
            <div className="commentBody">
              <h3> {comment.user.username} </h3>
              <p>{comment.text}</p>
            </div>
            <div className="commentButtons">
              {isCreator(comment.user._id) &&
                <Link to={`/cities/${cityName}/comments/${comment._id}`}>
                  <button>
                    Edit 🖋
                  </button>
                </Link>}
              {isCreator(comment.user._id) && <div>
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Delete ❌
                </button>
              </div>}
            </div>
          </section>
        })}
      </div>
      <h3>Add a Comment</h3>
      <section className="addComment">
        <textarea
          className="textarea"
          placeholder="Add your text here..."
          onChange={event => updateText(event.target.value)}
          value={text}>
        </textarea>
        <button
          onClick={handleComment}
          className="button is-info">
          Send
        </button>
      </section>
    </section>
  </main>
}

export default City




