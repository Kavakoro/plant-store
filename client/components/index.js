/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { default as Navbar } from "./Navbar";
export { default as Home } from "./Home";
export { Login, Signup } from "./AuthForm";
export { default as AllPlants } from "./AllPlants";
export { default as SinglePlant } from "./SinglePlant";
export { default as Cart } from "./Cart.js";
export { default as Checkout } from "./Checkout";
export { default as UpdatePlant } from "./UpdatePlant";
export { default as UpdateUser } from "./UpdateUser";
export { AdminPanel } from "./AdminPanel";
export { PlantAdmin } from "./PlantAdmin";
export { UserAdmin } from "./UserAdmin";
export { OrderAdmin } from "./OrderAdmin";
export { default as UpdateOrder } from "./UpdateOrder";
export { default as CreatePlant } from "./CreatePlant";
export { default as UpdateProfile } from "./UpdateProfile";
