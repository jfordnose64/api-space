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
      document.getElementById('card-name').textContent = spaceXFlights[0].name
      document.getElementById('card-info').textContent =
        spaceXFlights[0].description
      document.getElementById('card-time').textContent = spaceXFlights[0].time
      document.getElementById('card-location').textContent =
        spaceXFlights[0].location
      console.log(spaceXFlights)
    })
}