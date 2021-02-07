import React from 'react';
import '../../public/Cart.css';
import { Link } from 'react-router-dom';

//cart will be held in state (redux store) in an object. THe cart will
//reflect the cart of hhe specific user using the site, so it should be an object

//should we have a class method to calculate total on the front end as items are added?
//or should this logic be done on the backend? is it "business logic" ?
// if no items in cart, display alternate message 'there are no items in cart, etc' <return to shopping>
//need button to remove item from cart

const cart = {
  plants: [
    {
      id: 1,
      name: 'Fern',
      img: 'https://www.loremflickr.com/200/200/houseplant',
      price: 127,
    },
    {
      id: 2,
      name: 'Cactus',
      img: 'https://www.loremflickr.com/200/200/houseplant?random=1',
      price: 150,
    },
  ],
  total: 287,
};

export const Cart = (props) => {
  const { plants } = cart;
  if (!plants) {
    return (
      <div id="cart">
        <p>Your cart is empty!</p>
      </div>
    );
  } else {
    return (
      <div id="cart">
        <div id="cart-wrapper">
          <h1>Your Cart</h1>

          {plants.map((plant, idx) => (
            <div id="cart-items" key={idx}>
              <img src={plant.img} />
              <div id="cart-details" className="row">
                <div className="column space-between">
                  <div>
                    <Link to={`/plants/${plant.id}`}>
                      <h1>{plant.name}</h1>
                    </Link>
                  </div>
                  <div>
                    <strong>
                      <span>- </span>
                    </strong>
                    <input defaultValue={1} readOnly={true} type="number" />
                    <strong>
                      <span>+ </span>
                    </strong>
                  </div>
                </div>
                <div>${plant.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
          <hr></hr>
          <div className="subtotal">
            <strong>
              <span>Order Subtotal: </span>
            </strong>
            <span>${cart.total.toFixed(2)}</span>
          </div>
          <div className="checkout">
            <button>CHECKOUT</button>
          </div>
        </div>
      </div>
    );
  }
};
