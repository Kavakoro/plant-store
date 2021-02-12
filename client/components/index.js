/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { default as Navbar } from './Navbar';
export { default as Home } from './Home';
export { Login, Signup } from './AuthForm';
export { default as AllPlants } from './AllPlants';
export { default as SinglePlant } from './SinglePlant';
export { default as Cart } from './Cart.js';
export { default as Checkout } from "./Checkout";
export { AdminPanel } from './AdminPanel';
export { PlantAdmin } from './PlantAdmin';
// export { default as UpdatePlant } from './UpdatePlant';
//when i uncomment this, it messes up all the styles for some reason???
