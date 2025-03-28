async function getDashboardData(query) {
  try {
    const [destinations, weathers, airports] = await Promise.all([
      fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`).then(res => res.json()),
      fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`).then(res => res.json()),
      fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`).then(res => res.json())
    ]);

    // Estrarre i dati usando optional chaining (?.)
    const city = destinations[0]?.name || "Dati non disponibili";
    const country = destinations[0]?.country || "Dati non disponibili";
    const temperature = weathers[0]?.temperature || "Dati non disponibili";
    const weather = weathers[0]?.weather_description || "Dati non disponibili";
    const airport = airports[0]?.name || "Dati non disponibili";

    const dashboardData = { city, country, temperature, weather, airport };

    // console.log(`Dashboard Data:
    //   Città: ${dashboardData.city}, ${dashboardData.country}
    //   Temperatura: ${dashboardData.temperature}°C
    //   Meteo: ${dashboardData.weather}
    //   Aeroporto: ${dashboardData.airport}`);

    return dashboardData;
  } catch (error) {
    console.error("Errore nel recupero dei dati:", error);
    return null;
  }
}

// Test della funzione con "london"
getDashboardData('london')
  .then(data => {
    // console.log('Dasboard data:', data);
    console.log(
      `${data.city} is in ${data.country}.\n` +
      `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
      `The main airport is ${data.airport}.\n`
    );
  })
  .catch(error => console.error(error));
