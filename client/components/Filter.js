//this componenet is not being used....we might just be able to delete it all together

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import '../../public/AllPlants.css';
// import '../../public/Filter.css';

// export class Filter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filteredPlants: [],
//       sizeFilterSmall: '',
//       sizeFIlterSmallisChecked: false,
//       lightFilter: '',
//       difficultyFilter: '',
//       priceFilter: '',
//     };

//     this.onChange = this.onChange.bind(this);
//   }

//   async componentDidMount() {
//     await this.props.getPlants();
//     this.setState({
//       filteredPlants: this.props.plants,
//     });
//     console.log('props', this.props);
//   }

//   // async componentDidUpdate() {
//   //   await this.setState({
//   //     filteredPlants: this.props.plants,
//   //   });
//   // }

//   onChange(ev) {
//     let change = {};
//     change[ev.target.name] = ev.target.value;

//     console.log('onChange: ', change);
//     this.setState(change);
//   }

//   render() {
//     return (
//       <form className="filter-form">
//         <h1>Shop All Plants</h1>
//         <h3>Size</h3>
//         <label>
//           <input
//             type="checkbox"
//             name="sizeFilter"
//             value="small"
//             onChange={this.onChange}
//           />{' '}
//           Small
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="sizeFilter"
//             value="medium"
//             onChange={this.onChange}
//           />{' '}
//           Medium
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="sizeFilter"
//             value="large"
//             onChange={this.onChange}
//           />{' '}
//           Large
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="sizeFilter"
//             value="extraLarge"
//             onChange={this.onChange}
//           />{' '}
//           Extra Large
//         </label>
//         <br></br>

//         <h3>Light</h3>
//         <label>
//           <input
//             type="checkbox"
//             name="lightFilter"
//             value="lowLight"
//             onChange={this.onChange}
//           />{' '}
//           Low to Partial
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="lightFilter"
//             value="mediumLight"
//             onChange={this.onChange}
//           />{' '}
//           Medium - Bright (Indirect)
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="lightFilter"
//             value="brightLight"
//             onChange={this.onChange}
//           />{' '}
//           Large
//         </label>
//         <br></br>

//         <h3>Difficulty</h3>
//         <label>
//           <input
//             type="checkbox"
//             name="difficultyFilter"
//             value="noFuss"
//             onChange={this.onChange}
//           />{' '}
//           No Fuss - Carefree
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="difficultyFilter"
//             value="easy"
//             onChange={this.onChange}
//           />{' '}
//           Easy
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="difficultyFilter"
//             value="moderate"
//             onChange={this.onChange}
//           />{' '}
//           Moderate
//         </label>
//         <br></br>
//         <h3>Price</h3>
//         <label>
//           <input
//             type="checkbox"
//             name="priceFilter"
//             value="lowToHigh"
//             onChange={this.onChange}
//           />{' '}
//           Low to High
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="priceFilter"
//             value="highToLow"
//             onChange={this.onChange}
//           />{' '}
//           High to Low
//         </label>
//       </form>
//     );
//   }
// }
