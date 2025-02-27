// import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// TODO: The Truck class should extend the Vehicle class and should implement the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  // TODO: Declare properties of the Truck class
  // TODO: The properties should include vin, color, make, model, year, weight, top speed, wheels, and towing capacity
  // TODO: The types should be as follows: vin (string), color (string), make (string), model (string), year (number), weight (number), topSpeed (number), wheels (Wheel[]), towingCapacity (number)
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;

  // TODO: Create a constructor that accepts the properties of the Truck class
  constructor(vin: string, color: string, make: string, model: string, year: number, weight: number, topSpeed: number, wheels: Wheel[], towingCapacity: number) {
    // TODO: The constructor should call the constructor of the parent class, Vehicle
    super();
    // TODO: The constructor should initialize the properties of the Truck class
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.wheels = wheels;

    this.towingCapacity = towingCapacity;
    
    // TODO: The constructor should check if the wheels array has 4 elements and create 4 new default Wheel objects if it does not
    if (this.wheels.length !== 4) {
      // this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
      this.wheels = [new Wheel(18, 'Good Year'), new Wheel(18, 'Good Year'), new Wheel(18, 'Good Year'), new Wheel(18, 'Good Year')];
    };
  }

    get getVin(): string {
      return this.vin;
    };

    get getMake(): string {
      return this.make;
    };

    get getModel(): string {
      return this.model;
    };

    get getWeight(): number {
      return this.weight;
    };
  
  // TODO: Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    // TODO: Get the make an model of the vehicle if it exists
    if (vehicle.getMake && vehicle.getModel) {
      // TODO: Check if the vehicle's weight is less than or equal to the truck's towing capacity
      if (vehicle.getWeight <= this.towingCapacity) {
        // TODO: If it is, log that the vehicle is being towed
        console.log(`Towing ${vehicle.getMake} ${vehicle.getModel}`);
      } else {
        // TODO: If it is not, log that the vehicle is too heavy to be towed
        console.log(`The ${vehicle.getMake} ${vehicle.getModel} is too heavy to be towed`);
      }
    }
  }

  // TODO: Override the printDetails method from the Vehicle class
          // // Method to print vehicle details
          // printDetails(): void {
          //   console.log(`Vehicle started: ${this.started}`);
          //   console.log(`Vehicle current speed: ${this.currentSpeed} mph`);
          // }
  // TODO: The method should call the printDetails method of the parent class
    // TODO: The method should log the details of the Truck
    // TODO: The details should include the VIN, make, model, year, weight, top speed, color, towing capacity, and wheels
  override printDetails(): void {
    super.printDetails();
    console.log(`${this.year} Make/Model: ${this.make}/${this.model}, Color: ${this.color} (VIN: ${this.vin}): Weight: ${this.weight}#, Top Speed: ${this.topSpeed}mph, Towing Capacity: ${this.towingCapacity}#, Wheels: ${this.wheels.length}`);
  }  
}

// Export the Truck class as the default export
export default Truck;
