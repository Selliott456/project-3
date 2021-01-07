### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive 
 
# Devs.Map 🌎

Devs.Map is a travel sharing platform for developers.
Users can create an account to share their experience in a particular city, add new city information it is not in the database and also chat, network with local like minded people.

Live site: https://still-river-70995.herokuapp.com/
 
## Overview
We worked as a team of three on this project. We were working on features individually but also collaborated throughout the day to solve problems or debug each others' code.
 
We built a `MongoDB` database of cities, and served this data using `Express`. We also used `JWT Authentication` to create accounts, login and update profiles. The front end is built with React where users can search for cities and connect with other users in the chosen city. They can delete, update, create comments on the city page and also add a new city to the database if they want to.
 
## Brief

- Build a full MERN-stack application.
- Use an Express API to serve your data from a Mongo database and/or build our own.
- Build a complete product with multiple relationships and CRUD functionality for the models.
- Build a professional frontend design with React.
- Deploy online so it's publicly accessible.
 
## Technologies Used

- JavaScript(ES6)
- MongoDB and Mongoose
- Express
- React
- Node.js
- Bcrypt & JWT
- Insomnia 
- SCSS
- Git and GitHub
- Heroku
- Mongo Atlas 
   
## Approach Taken

The original idea was a dating app which evolved through group discussion and took the form of a travel app with a connetcion through a chat app. 
After extensive white-boarding and wire-framing, we built the fundamentals of the user and city schema together, as well as the starter controller function. We also populated the database with some example data to kickstart the project via a seed file. 

## Method
 
**Authorization**

For authorization we used `JWT`.
JSON web token is a standardized, optionally validated and/or encrypted container format that is used to securely transfer information between two parties.

When a user is successfully logged in the backend returns a signed `JWT` that can be used for subsequent secured requests.
```javaScript
function loginUser(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      const token = jwt.sign(
        { sub: user._id },
        secret,
        { expiresIn: '48h' }
      )
      res.status(202).send({ token, message: 'Login was successful!' })
    })

}
```
To make the `JWT` verification reusable we created `secureRoute` middleware. That extracts the token from the `Authorization Header` and uses `JWT` to verify it's validity. 

**Search** 

The App has a built in search function which allows users to search for the city they are looking for.
In order to store the relevant property values to the Search component, we used the `useState` and `useEffect` React hooks and `axios` to fetch the data from the backend.

**Seed**

Another team mate was responisble for seeding the database via the countries API because we found it misbehaved and lagged when accessed from the frontend.

She used two APIs
- [The countries](https://restcountries.eu/) `REST API` to get some information about the cities
- [The unsplash API](https://unsplash.com/developers) for the images.

Unfortunately unsplash had a demo limit for requests - 50 requests per hour. She used a`setInterval` function to get all the images within the boundaries of the API.

```javaScript
 .then((cityInfo) => {
    const promises = []

    for (let i = 0; i < cityInfo.length; i++) {
      const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(cityInfo[i].name)}&client_id=${CLIENT_ID}`
      const timeoutInterval = 1000 * 60 * 1.5 * (i + 1)
      promises.push(new Promise((resolve) => {
        setTimeout(() => {
          axios.get(url)
            .then(({ data }) => {
              cityInfo[i].image = data.results[0] ? data.results[0].urls.full : ''
              console.log(`name: ${cityInfo[i].name}
                           image: ${cityInfo[i].image}`)
              resolve(cityInfo[i])
            })
        }, timeoutInterval)
      }))
    }
    return Promise.all(promises)
  })
```
Data was then exported, cleaned and converted into the correct format, making the above function redundant so it was removed from the code.

##The Chat App

I was in charge of creating a chat app using Web Sockets - you can access the code for this 


## Challenges
Since this project was the first we worked on together via GitHub it was challenging sometimes to sync our work and merge the files. By the end of the week we improved a lot and got comfortable working remotely and using Git.
 
## Future enhancements.

The "chat users in the city" button takes the user to another separate chat app, that initially we wanted to include in the project. Unfortunately we couldn't manage to merge it on time, so we connected it via a link not to lose this functionality. 

Given more time, we would have also liked to provide more information about the cities, and visualize coffee shops and nice meeting spots on a map.
 
 
# Summary
 
As mentioned above, working with a remote team on this app provided an opportunity for me to get more familiar with `Git`, `GitHub` and with the other collaborative tools we used. This included everything from discussing features, working through merge conflicts to organizing our tasks and timelines. 

Overall, it was exciting to see how quickly the app took shape.
As the first full stack project I have worked on to completion, it was a very enlightening experience to see how different technologies in the `MERN` stack relate to form a complete whole.
 



