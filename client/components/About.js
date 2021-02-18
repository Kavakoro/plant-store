import React from "react";
import "../../public/About.css";

const engineers = {
  rommel: {
    name: "Rommel Demano",
    about: "whatever",
    role: "update-buttons",
    img: "/images/rommel.jpg",
  },
  kate: {
    name: "Kate Quinn",
    about: "whatever",
    role: "update-buttons",
    img: "/images/kate.jpg",
  },
  kokko: {
    name: "Kokko Tso",
    about: "whatever",
    role: "update-buttons",
    img: "/images/kokko.jpg",
  },
  vanessa: {
    name: "Vanessa Lima",
    about: "whatever",
    role: "update-buttons",
    img: "/images/vanessa.jpg",
  },
};

function About(props) {
  return (
    <div id="about">
      <div className="about-rommel">
        <img src={engineers.rommel.img} />
        <div className="engineer-info">
          <h2>Name: {engineers.rommel.name}</h2>
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

      <div className="about-kate">
        <img src={engineers.kate.img} />
        <div className="engineer-info">
          <h2>Name: {engineers.kate.name}</h2>
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

      <div className="about-Kokko">
        <img src={engineers.kokko.img} />
        <div className="engineer-info">
          <h2>Name: {engineers.kokko.name}</h2>
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

      <div className="about-vanessa">
        <img src={engineers.vanessa.img} />
        <div className="engineer-info">
          <h2>Name: {engineers.vanessa.name}</h2>
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
    </div>
  );
}

export default About;
