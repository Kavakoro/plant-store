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
  }
  async componentDidMount() {
    await this.props.getPlants();
  }

  render() {
    const { plants } = this.props;

    const orderId = this.props.cart.id;

    if (!this.props.plants) {
      return null;
    } else {
      return (
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
      );
    }
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getPlants: () => dispatch(fetchPlants()),
  };
};

export default connect((state) => state, mapDispatch)(AllPlants);

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
//     // this.state = {
//     //   plants: [],
//     //   count: 0,
//     // };
//   }

//   componentDidUpdate(prevProps) {
//     if(!prevProps.match.params.idx !== this.props.match.params.idx) {
//       thius.props.getPlants()
//     }
//   }
//   componentDidMount() {
//     // const { plants, count } = (await axios.get(`/api/plants`)).data;
//     await this.props.getPlants();
//   }

//   render() {
//     const { plants, count } = this.props;
//     const pageCount = Match.ceil(count / 10);
//     const links = new Array(pageCount).fill('-').map((_, idx) => {
//       return {
//         text: idx + 1,
//         idx,
//         selected: !this.props.match.idx && idx === 0 || this.props.match.params.idx*1 === idx
//       }
//     });

//     // console.log(count);

//     const orderId = this.props.cart.id;

//     if (!this.props.plants) {
//       return null;
//     } else {
//       return (
//         <div id="all-plants">
//           {plants.map((plant, idx) => (
//             <div key={idx}>
//               <AddToCart orderId={orderId} plantId={plant.id} />
//               <Link to={`/plants/${plant.id}`}>
//                 <div id="plant-div">
//                   <img src={plant.img} />
//                   <div>
//                     <span>{plant.name}</span>
//                     <span>{plant.price}</span>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       );
//     }
//   }
// }

// const mapToState = (state, ownProps) => {
//   return {
//     count: state.count,
//     plants: state.plants[ownProps.match.params.id] || [],
//   };
// };

// const mapDispatch = (dispatch, ownProps) => {
//   return {
//     getPlants: () => dispatch(fetchPlants(ownProps.match.params.idx || 0)),
//   };
// };

// export default connect((state) => state, mapDispatch)(AllPlants);
// export default AllPlants;
