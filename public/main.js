const API_URL = 'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
const spaceURL =
  'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'

const main = () => {
  nasaPhoto()
  spaceLaunch()
}

const nasaPhoto = () => {
  fetch(API_URL)
    .then(response => {
      return response.json()
    })
    .then(nasaPic => {
      // console.log(hdUrl)
      console.log(nasaPic.hdUrl)
      // adding the url to the page
      document.querySelector(
        '.image-container'
      ).style.backgroundImage = `url('${nasaPic.hdUrl}')`

      console.log(nasaPic.copyright)
      document.querySelector('.copy').textContent = `copyright: ${
        nasaPic.copyright
      } | title: ${nasaPic.title}`
    })
}

const spaceLaunch = () => {
  fetch(spaceURL)
    .then(response => {
      return response.json()
    })
    .then(card => {
      // console.log(card.mission_name)
      //get name
      document.querySelector('.launch-card-header').textContent
      //get details
      //get location
      //get countdown
      console.log(card.mission_id)
    })
}

document.addEventListener('DOMContentLoaded', main)
