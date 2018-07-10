////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - Save the state of the form and restore it when the page first loads, in
//   case the user accidentally closes the tab before the form is submitted
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class CheckoutForm extends React.Component {

    constructor(props) {
        super(props);

        const formState = localStorage.formState;

        if (formState) {
            this.state = JSON.parse(formState);
        } else {
            this.state = {
                billingName: '',
                billingState: '',
                isShippingSameAsBilling: true,
                shippingName: '',
                shippingState: '',
            };
        }
    }

  handlebeforeUnload = () => {
      localStorage.formState = JSON.stringify(this.state);
  };

  componentDidMount() {
      window.addEventListener("beforeunload", this.handlebeforeUnload);
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={event => {
          event.preventDefault();
          console.log(serializeForm(event.target, { hash: true }));
        }}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name: <input type="text"
                                     name="billingName"
                                     defaultValue={this.state.billingName}
                                     onChange={event => this.setState({billingName: event.target.value})}/>
              </label>
            </p>
            <p>
              <label>
                Billing State: <input type="text"
                                      size="3"
                                      name="billingState"
                                      defaultValue={this.state.billingState}
                                      onChange={event => this.setState({billingState: event.target.value})}/>
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input type="checkbox"
                     name="isShippingSameAsBilling"
                     defaultChecked={this.state.isShippingSameAsBilling}
                     onChange={event => {
                         if (event.target.checked) {
                             this.setState({
                                 isShippingSameAsBilling: true,
                                 shippingName: this.state.billingName,
                                 shippingState: this.state.billingState,
                             })
                         } else {
                             this.setState({
                                 isShippingSameAsBilling: false,
                             });
                         }
                     }}/> Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name: <input type="text"
                                      name="shippingName"
                                      onChange={event => {this.setState({shippingName: event.target.value})}}
                                      value={(this.state.isShippingSameAsBilling) ? this.state.billingName : this.state.shippingName}
                                      readOnly={this.state.isShippingSameAsBilling}/>
              </label>
            </p>
            <p>
              <label>
                Shipping State: <input type="text"
                                       size="3"
                                       name="shippingState"
                                       onChange={event => {this.setState({shippingState: event.target.value})}}
                                       value={(this.state.isShippingSameAsBilling) ? this.state.billingState : this.state.shippingState}
                                       readOnly={this.state.isShippingSameAsBilling}/>
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
