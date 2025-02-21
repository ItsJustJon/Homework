
// ## Acceptance Criteria

// ```md
// GIVEN a command-line application that accepts user input
// WHEN I am prompted to create a new vehicle or existing vehicle
// THEN I can choose between the two options
// WHEN I am prompted to choose the vehicle type during creation
// THEN I can choose between car, truck, and motorbike
// WHEN I am prompted for details about the vehicle
// THEN I can enter the vehicle information
// WHEN I have entered all the vehicle information
// THEN I can use the created vehicle
// WHEN I select an existing vehicle
// THEN I can use the selected existing vehicle
// WHEN I have created a new vehicle or selected an existing vehicle
// THEN I can perform actions with that vehicle
// WHEN I perform an action with a vehicle
// THEN I see the result of the action in the command-line
// WHEN I complete the process of performing an action
// THEN I can perform additional actions until I choose to exit
// ```


// import classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

// create an array of vehicles
const vehicles = [];

// TODO: uncomment once trucks are implemented
// const truck1Wheels = [new Wheel(24,"BF Goodrich"), new Wheel(24,"BF Goodrich"), new Wheel(24,"BF Goodrich"), new Wheel(24,"BF Goodrich")];
const truck1 = new Truck(Cli.generateVin(),"red", "Ford", "F-150", 2021, 5000, 120, [], 10000);
vehicles.push(truck1);


// will use default wheels
const car1Wheels = [new Wheel(22,"Continental"), new Wheel(22,"Continental"), new Wheel(22,"Continental"), new Wheel(22,"Continental")];
const car1 = new Car(
  Cli.generateVin(),
  'blue',
  'Toyota',
  'Camry',
  2021,
  3000,
  130,
  []
);
vehicles.push(car1);

// push vehicles to array
// TODO: uncomment once motorbikes are implemented
const motorbike1Wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
const motorbike1 = new Motorbike(Cli.generateVin(), "black", "Harley Davidson", "Sportster", 2021, 500, 125, motorbike1Wheels);
vehicles.push(motorbike1);

// create a new instance of the Cli class
const cli = new Cli(vehicles);

// start the cli
cli.startCli();
