const API_URL = 'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'

const main = () => {
  nasaPhoto()
  getSpaceXMissions()
}

const spaceXFlights = []
let currentFlight = 0

class SpaceXLaunches {
  constructor(
    name,
    description,
    time,
    location,
    container,
    nameBox,
    detailsBox,
    timeBox,
    locationBox
  ) {
    this.name = name
    this.description = description
    this.time = time
    this.location = location
    this.container = container
    this.nameBox = nameBox
    this.detailsBox = detailsBox
    this.timeBox = timeBox
    this.locationBox = locationBox
  }
}

const nasaPhoto = () => {
  fetch(API_URL)
    .then(response => {
      return response.json()
    })
    .then(nasaPic => {
      document.querySelector(
        '.image-container'
      ).style.backgroundImage = `url('${nasaPic.hdUrl}')`
      document.querySelector('.copy').textContent = `copyright: ${
        nasaPic.copyright
      } | title: ${nasaPic.title}`
    })
}

const getSpaceXMissions = async () => {
  const response = await fetch(`https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming`)
  const missionData = await response.json()


  missionData.forEach(mission => {
    const cardcontainer = document.createElement('div')
    const cardTitle = document.createElement('h2')
    const cardDetails = document.createElement('p')
    const cardTime = document.createElement('p')
    const cardLocation = document.createElement('p')

    // This is setting up each mission name //
    const missionName = mission.mission_name

    // This will cover the mission details //
    const missionDetails = mission.detailsBox

    // This will cover the mission timer //
    const missionTimer = mission.launch_date_utc

    // This will cover the mission location //
    const missionLocation = mission.launch_site.site_name_long

    const flights = new SpaceXLaunches(missionName, missionDetails, missionTimer, missionLocation, cardcontainer, cardTitle, cardTime, cardDetails, cardLocation)
    console.log(spaceXFlights)
    spaceXFlights.push(flights)
  })
  letsDisplayThis()
}

const letsDisplayThis = () => {
  console.log(spaceXFlights[currentFlight])
  const maincontainer = document.querySelector('#container')

  maincontainer.textContent = ''
  spaceXFlights[currentFlight].container.classList.add('main-container')

  spaceXFlights[currentFlight].nameBox.textContent = spaceXFlights[currentFlight].name

  spaceXFlights[currentFlight].detailsBox.textContent = spaceXFlights[currentFlight].details
  spaceXFlights[currentFlight].detailsBox.classList.add('card-style')

  spaceXFlights[currentFlight].timeBox.textContent = spaceXFlights[currentFlight].time
  spaceXFlights[currentFlight].timeBox.classList.add('card-style')

  spaceXFlights[currentFlight].locationBox.textContent = spaceXFlights[currentFlight].location
  spaceXFlights[currentFlight].locationBox.classList.add('card-style')

  spaceXFlights[currentFlight].container.appendChild(spaceXFlights[currentFlight].nameBox)
  spaceXFlights[currentFlight].container.appendChild(spaceXFlights[currentFlight].detailsBox)
  spaceXFlights[currentFlight].container.appendChild(spaceXFlights[currentFlight].timeBox)
  spaceXFlights[currentFlight].container.appendChild(spaceXFlights[currentFlight].locationBox)

  maincontainer.appendChild(spaceXFlights[currentFlight].container)
}

const rightArrow = () => {
  if (currentFlight === spaceXFlights) {
    currentFlight = 0
  } else {
    currentFlight++
  }
  letsDisplayThis()
}

const leftArrow = () => {
  if (currentFlight === spaceXFlights) {
    currentFlight = 0
  } else {
    currentFlight--
  }
  letsDisplayThis()
}

document.querySelector('.arrow-right').addEventListener('click', rightArrow)
document.querySelector('.arrow-left').addEventListener('click', leftArrow)
document.addEventListener('DOMContentLoaded', main)