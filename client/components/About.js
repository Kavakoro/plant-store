import React from "react";
import "../../public/About.css";

const engineers = {
  rommel: {
    name: "Rommel Demano",
    about: "",
    role: "TBD hahhah",
    img: "/images/rommel.jpg",
  },
  kate: {
    name: "Kate Quinn",
    about: "",
    role: "securing routes, front/backend",
    img: "/images/kate.jpg",
  },
  kokko: {
    name: "Kokko Tso",
    about: "best smile hahhah",
    role: "checkout page, front/backend",
    img: "/images/kokko.jpg",
  },
  vanessa: {
    name: "Vanessa Lima",
    about: "",
    role: "admin bar front/backend",
    img: "/images/vanessa.jpg",
  },
};

function About(props) {
  return (
    <div id="about">
      <div id="about-kate">
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
      <div id="about-vanessa">
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
      <div id="about-Kokko">
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
      <div id="about-rommel">
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
    </div>
  );
}

export default About;
