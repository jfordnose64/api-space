const API_URL = 'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
const spaceURL =
  'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'

const main = () => {
  nasaPhoto()
  spaceLaunch()
}

let spaceXFlights = []

class spaceXLaunches {
  constructor(name, description, time, location) {
    this.name = name
    this.description = description
    this.time = time
    this.location = location
  }
}

const nasaPhoto = () => {
  fetch(API_URL)
    .then(response => {
      return response.json()
    })
    .then(nasaPic => {
      // adding the url to the page
      document.querySelector(
        '.image-container'
      ).style.backgroundImage = `url('${nasaPic.hdUrl}')`
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
    .then(launchCard => {
      spaceXFlights = launchCard.map(
        launchCard =>
          new spaceXLaunches(
            launchCard.mission_name,
            launchCard.details,
            launchCard.launch_data_unix,
            launchCard.launch_site.site_name_long
          )
      )
      console.log(spaceXFlights)
      document.getElementById('card-name').textContent = spaceXFlights[1].name
      document.getElementById('card-info').textContent =
        spaceXFlights[1].description
      document.getElementById('card-time').textContent = spaceXFlights[1].time
      document.getElementById('card-location').textContent =
        spaceXFlights[1].location
    })
}
document.addEventListener('DOMContentLoaded', main)
