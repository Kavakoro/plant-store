// import React from "react";
// import { connect } from "react-redux";
// import "../../public/AllPlants.css";
// import { fetchPlants } from "../store/plants";
// import { Link } from "react-router-dom";
// import AddToCart from "./AddToCart";
// import axios from "axios";

// class AllPlants extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   async componentDidMount() {
//     await this.props.getPlants();
//   }

//   render() {
//     const { plants } = this.state;
//
//     const orderId = this.props.cart.id;
//     if (!this.state.plants) {
//       return null;
//     } else {
//       return (

/* <div id="all-plants">
  {plants.map((plant, idx) => (
    <div key={idx}>
      <AddToCart orderId={orderId} plantId={plant.id} />
      <Link to={`/plants/${plant.id}`}>
        <div id="plant-div">
          <img src={plant.img} />
          <div>
            <span>{plant.name}</span>
            <span>{plant.price}</span>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>; */

//       );
//     }
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     getPlants: () => dispatch(fetchPlants()),
//   };
// };

// export default connect((state) => state, mapDispatch)(AllPlants);
// export default AllPlants;

import React from "react";
import { connect } from "react-redux";
import "../../public/AllPlants.css";
import { fetchPlants } from "../store/plants";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import axios from "axios";

class AllPlants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      count: 0,
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.idx !== this.props.match.params.idx) {
      const idx = this.props.match.params.idx || 0;
      const orderId = this.props.cart.id;
      const { plants, count } = (
        await axios.get(`/api/plants?idx=${idx}`)
      ).data;
      this.setState({ plants, count });
      await this.props.getPlants();
    }
  }
  async componentDidMount() {
    const idx = this.props.match.params.idx || 0;
    const orderId = this.props.cart.id;
    const { plants, count } = (await axios.get(`/api/plants?idx=${idx}`)).data;
    this.setState({ plants, count });
    await this.props.getPlants();
  }

  render() {
    const { plants, count } = this.state;
    const pageCount = Math.ceil(count / 10);
    const links = new Array(pageCount).fill("-").map((_, idx) => {
      return {
        text: idx + 1,
        idx,
        selected:
          (!this.props.match.params.idx && idx === 0) ||
          this.props.match.params.idx * 1 === idx,
      };
    });
    const orderId = this.props.cart.id;
    console.log(orderId);

    return (
      <div>
        <h1>Plants{count}</h1>
        <nav color="black">
          {links.map(({ idx, text, selected }) => {
            return (
              <Link
                key={idx}
                to={`/${idx}`}
                className={selected ? "selected" : ""}
              >
                {text}
              </Link>
            );
          })}
        </nav>
        <div id="all-plants">
          {plants.map((plant, idx) => (
            <div key={idx}>
              <AddToCart orderId={orderId} plantId={plant.id} />
              <Link to={`/plants/${plant.id}`}>
                <div id="plant-div">
                  <img src={plant.img} />
                  <div>
                    <span>{plant.name}</span>
                    <span>{plant.price}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// {
//   /* <ul>
//           {plants.map((plant) => {
//             return (
//               <li key={plant.id}>
//                 {plant.name} <br /> {plant.price}
//               </li>
//             );
//           })}
//         </ul> */
// }

/* <div id="all-plants">
{plants.map((plant, idx) => (
  <div key={idx}>
    <AddToCart orderId={orderId} plantId={plant.id} />
    <Link to={`/plants/${plant.id}`}>
      <div id="plant-div">
        <img src={plant.img} />
        <div>
          <span>{plant.name}</span>
          <span>{plant.price}</span>
        </div>
      </div>
    </Link>
  </div>
))}
</div> */

const mapToState = (state) => {
  const { plants, count, cart } = state;

  return { plants, count, cart };
};

const mapDispatch = (dispatch) => {
  return {
    getPlants: () => dispatch(fetchPlants()),
  };
};

export default connect(mapToState, mapDispatch)(AllPlants);
