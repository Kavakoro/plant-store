import React from 'react';
import '../../public/ShippingInfo.css';
import { Link } from 'react-router-dom';

const ShippingInfo = () => {
  return (
    <div className="shipping">
      <h1>Shipping FAQ</h1>
      <br />
      <div id="shipping">
        <h2>Shipping FAQ's</h2>
        <p>
          Due to previous delays and severe winter weather across the country,
          our ship times are longer than usual. Plant orders will ship within
          12–14 business days after purchase, excluding Edible Garden plants and
          care products that should ship in 6–8 business days. Once your order
          leaves our greenhouse it may take an additional 3–5 days to arrive at
          your door. A shipping confirmation email will be sent to you when your
          item(s) ship from our greenhouse with tracking information. We will
          continue to keep our site updated with the most accurate shipping
          timeline. Plant orders may be held up to 7 business days due to
          inclement weather. If, however, the weather falls below an average of
          20 degrees at the destination or on the shipping route for more than 7
          business days, we will instead ship them 2-day air at our expense.
        </p>
        <ul>
          <li>
            <b>Can I make changes to my order?</b>
          </li>
          <p>Yes. You can only add more plants.</p>
          <li>
            <b>When will my order arrive?</b>
          </li>
          <p>You get it when you get it.</p>
          <li>
            <b>Can I ship to multiple addresses?</b>
          </li>
          <p>Maybe.</p>
          <li>
            <b>I’d like my order to arrive on a specific date.</b>
          </li>
          <p>Well, thats too bad..</p>
          <li>
            <b>Does Bloomscape ship to Canada?</b>
          </li>
          <p>eh.</p>
          <li>
            <b>Does Bloomscape ship to Alaska {'&'} Hawaii?</b>
          </li>
          <p>Extra shipping fees may apply..</p>
        </ul>
      </div>
      <br />
      <h3>
        Still have questions? We’re here to help!{' '}
        <Link to="/about">Get in touch</Link> and we’ll get back to you as
      </h3>
    </div>
  );
};

export default ShippingInfo;
