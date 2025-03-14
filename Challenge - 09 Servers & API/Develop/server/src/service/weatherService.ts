import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
interface Weather {
  city: string;
  currentTemp: number;
  currentConditions: string;
  forecast: Array<{ day: string; temp: number; conditions: string }>;
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.WEATHER_API_URL || '';
    this.apiKey = process.env.WEATHER_API_KEY || '';
  }


  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(this.buildGeocodeQuery(query));
    return response.json();
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData[0].lat,
      lon: locationData[0].lon,
    };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return response.json();
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    return {
      city: response.name,
      currentTemp: response.main.temp,
      currentConditions: response.weather[0].description,
      forecast: [], // Initialize with an empty array, will be populated later
    };
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    return weatherData.map((day: any) => ({
      day: day.dt,
      temp: day.temp.day,
      conditions: day.weather[0].description,
    }));
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    const locationData = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(locationData);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecast = this.buildForecastArray(currentWeather, weatherData.daily);
    return {
      ...currentWeather,
      forecast,
    };
  }
}

export default new WeatherService();
