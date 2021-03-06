import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handleStripeToken } from "../app/actions";

class Payments extends React.Component {
  onToken = (token) => {
    this.props.handleStripeToken(token);
  };

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        name="Emaily App"
        description="$5 for 5 email credits."
        amount={500}
        token={this.onToken}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, { handleStripeToken })(Payments);
