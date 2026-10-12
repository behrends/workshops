// Vorlage für Schritt 3: in data/FakeData.kt einfügen, Paketnamen anpassen.
// Wird in Schritt 8 vom FakeWeatherRepository weiterverwendet.
// Die Koordinaten sind echt und werden in Schritt 10 für die Open-Meteo-API gebraucht.

package de.dhbw.wetter.data

import de.dhbw.wetter.model.City
import de.dhbw.wetter.model.CurrentWeather
import de.dhbw.wetter.model.WeatherCondition

val fakeCities: List<City> = listOf(
    City(name = "Lörrach", latitude = 47.6156, longitude = 7.6614),
    City(name = "Freiburg", latitude = 47.9990, longitude = 7.8421),
    City(name = "Basel", latitude = 47.5596, longitude = 7.5886),
)

val fakeCurrentWeather: Map<String, CurrentWeather> = mapOf(
    "Lörrach" to CurrentWeather(
        temperature = 14.2,
        windSpeed = 8.5,
        condition = WeatherCondition.PARTLY_CLOUDY,
    ),
    "Freiburg" to CurrentWeather(
        temperature = 15.0,
        windSpeed = 6.1,
        condition = WeatherCondition.CLEAR,
    ),
    "Basel" to CurrentWeather(
        temperature = 13.6,
        windSpeed = 11.2,
        condition = WeatherCondition.RAIN,
    ),
)
