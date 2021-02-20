import React from 'react';
import '../../public/About.css';

const engineers = {
  rommel: {
    name: 'Rommel Demano',
    about: 'eh',
    role:
      'Account Profile, Single Plant, Return Policy, Shipping FAQ, About, Front & Backend',
    img: '/images/rommel.jpg',
  },
  kate: {
    name: 'Kate Quinn',
    about: 'supermom',
    role:
      'Securing Routes, All Plants View,  isAdmin?, Admin Database Tables/Panel, Front & Backend',
    img: '/images/kate.jpg',
  },
  kokko: {
    name: 'Kokko Tso',
    about: 'doesnt he look so happy? ',
    role: 'Checkout Page, Add To Cart, Cart, Payment Page, Front &Backend',
    img: '/images/kokko.jpg',
  },
  vanessa: {
    name: 'Vanessa Lima',
    about: 'hmmmmm',
    role:
      'Filter, Update Forms, Create/Delete Plant, Database Data, Admin Bar, Front & Backend',
    img: '/images/vanessa.jpg',
  },
};

function About(props) {
  return (
    <div id="about">
      <div id="about-section">
        <img src={engineers.kate.img} />
        <div className="engineer-info">
          <h2>Name: {engineers.kate.name}</h2>
          <a>Contact Info</a>
          <div>
            <p>
              <b> About: {engineers.kate.about}</b>
            </p>
            <p>
              <b> Role: {engineers.kate.role}</b>
            </p>
          </div>
          <div>
            <p className="info">{props.info}</p>
          </div>
        </div>
      </div>
      <div id="about-section">
        <img src={engineers.vanessa.img} />
        <div className="engineer-info">
          <h2>Name: {engineers.vanessa.name}</h2>
          <a>Contact Info</a>
          <div>
            <p>
              <b> About: {engineers.vanessa.about}</b>
            </p>
            <p>
              <b> Role: {engineers.vanessa.role}</b>
            </p>
          </div>
          <div>
            <p className="info">{props.info}</p>
          </div>
        </div>
      </div>
      <div id="about-section">
        <img src={engineers.kokko.img} />
        <div className="engineer-info">
          <h2>Name: {engineers.kokko.name}</h2>
          <a>Contact Info</a>
          <div>
            <p>
              <b> About: {engineers.kokko.about}</b>
            </p>
            <p>
              <b> Role: {engineers.kokko.role}</b>
            </p>
          </div>
          <div>
            <p className="info">{props.info}</p>
          </div>
        </div>
      </div>
      <div id="about-section">
        <img src={engineers.rommel.img} />
        <div className="engineer-info">
          <h2>Name: {engineers.rommel.name}</h2>
          <a>Contact Info</a>
          <div>
            <p>
              <b> About: {engineers.rommel.about}</b>
            </p>
            <p>
              <b> Role: {engineers.rommel.role}</b>
            </p>
          </div>
          <div>
            <p className="info">{props.info}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
