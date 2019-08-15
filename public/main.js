const API_URL = 'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
const spaceX_URL = ''

const main = () => {
  nasaPhoto()
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

const spaceX = () => {
  fetch
}

document.addEventListener('DOMContentLoaded', main)
