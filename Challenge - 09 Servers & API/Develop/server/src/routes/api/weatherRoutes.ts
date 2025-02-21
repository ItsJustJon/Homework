import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
    // TODO: GET weather data from city name
    const weatherData = WeatherService.getWeatherData(req.body.cityName);
    res.json(weatherData);
    // TODO: save city to search history
    HistoryService.addCity(req.body.cityName);
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
    const history = HistoryService.getCities();
    res.json(history);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
    HistoryService.removeCity(req.params.id);
    res.json({ message: 'City deleted' });
});

export default router;
