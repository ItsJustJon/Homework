import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
  class Weather {
    city: string;
    date: string;
    icon: string;
    iconDescription: string;
    temperature: number;
    windspeed: number;
    humidity: number;

    constructor(weather: any) {
      this.city = weather.city;
      this.date = weather.date;
      this.icon = weather.icon;
      this.iconDescription = weather.iconDescription;
      this.temperature = weather.tempF;
      this.windspeed = weather.windSpeed;
      this.humidity = weather.humidity;
    }
  }


// TODO: Complete the WeatherService class
class WeatherService {
    // TODO: Define the baseURL, API key, and city name properties
    private baseURL: string = process.env.BASE_URL || '';
    private apiKey: string = process.env.API_KEY || '';
    private cityName: string = '';

    // TODO: Create fetchLocationData method
    private async fetchLocationData(query: string) {
        const response = await fetch(query);
        const data = await response.json();
        return data;
    }

    // TODO: Create destructureLocationData method
    private destructureLocationData(locationData: Coordinates): Coordinates {
        const { lat, lon } = locationData;
        // return locationData;
        return { lat, lon };
    }
    // TODO: Create buildGeocodeQuery method
    private buildGeocodeQuery(): string {
        return `${this.baseURL}/geocode/v1/json?q=${this.cityName}&key=${this.apiKey}`;
    }
    // TODO: Create buildWeatherQuery method
    private buildWeatherQuery(coordinates: Coordinates): string {
        return `${this.baseURL}/weather/1.0/report.json?product=current&latitude=${coordinates.lat}&longitude=${coordinates.lon}&key=${this.apiKey}`;
    }
    // TODO: Create fetchAndDestructureLocationData method
    private async fetchAndDestructureLocationData() {
        const query = this.buildGeocodeQuery();
        const locationData = await this.fetchLocationData(query);
        return this.destructureLocationData(locationData);
    }
    // TODO: Create fetchWeatherData method
    private async fetchWeatherData(coordinates: Coordinates) {
        const query = this.buildWeatherQuery(coordinates);
        const response = await fetch(query);
        const data = await response.json();
        return data;
    }
    // TODO: Build parseCurrentWeather method
    private parseCurrentWeather(response: any) {
        const currentWeather = response.data.current[0];
        return currentWeather;
    }
    // TODO: Complete buildForecastArray method
    private buildForecastArray(_currentWeather: Weather, weatherData: any[]) {
        const forecast = weatherData.map((weather) => {
            return new Weather(weather);
        });
        return forecast;
    }
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city: string) {
        this.cityName = city;
        const coordinates = await this.fetchAndDestructureLocationData();
        const weatherData = await this.fetchWeatherData(coordinates);
        const currentWeather = this.parseCurrentWeather(weatherData);
        const forecast = this.buildForecastArray(currentWeather, weatherData);
        return [currentWeather, ...forecast];
    }
    get getWeatherData(): any {
        return this.getWeatherForCity;
    }
}

export default new WeatherService();
