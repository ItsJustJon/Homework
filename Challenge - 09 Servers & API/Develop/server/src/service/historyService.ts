const fs = require('fs').promises;
const path = require('path');

// TODO: Define a City class with name and id properties
class City {
  constructor(public name: string, public id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    const filePath = path.join(__dirname, 'searchHistory.json');
    
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      } else {
        throw error;
      }
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    const filePath = path.join(__dirname, 'searchHistory.json');
    await fs.writeFile(filePath, JSON.stringify(cities, null, 2));
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read();
    return cities.map((city: { name: string; id: string }) => new City(city.name, city.id));
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.getCities();
    const newCity = new City(city, Date.now().toString());
    cities.push(newCity);
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.getCities();
    const updatedCities: City[] = cities.filter((city: City) => city.id !== id);
    await this.write(updatedCities);
  }

}

export default new HistoryService();
