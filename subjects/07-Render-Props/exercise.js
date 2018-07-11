////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a <GeoPosition> component that encapsulates the geo state and
//   watching logic and uses a render prop to pass the coordinates back to
//   the <App>
//
// Got extra time?
//
// - Create a <GeoAddress> component that translates the geo coordinates to a
//   physical address and prints it to the screen (hint: use
//   `getAddressFromCoords`)
// - You should be able to compose <GeoPosition> and <GeoAddress> beneath it to
//   naturally compose both the UI and the state needed to render it
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";

import getAddressFromCoords from "./utils/getAddressFromCoords";
import LoadingDots from "./LoadingDots";

class GeoAddress extends React.Component {
    state = {
        address: null,
    };

    componentDidMount() {
        this.fetchAddress();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.longitude !== this.props.longitude && prevProps.latitude !== this.props.latitude) {
            this.fetchAddress();
        }
    }

    fetchAddress() {
        const {latitude, longitude} = this.props;
        if (latitude && longitude) {
            console.log("calling getAddressFromCoords", this.props, this.state);
            getAddressFromCoords(latitude, longitude)
               .then(address => this.setState({address: address}));
        } else {
            this.setState({address: null});
        }
    }

    render() {
        return this.props.children(this.state.address);
    }
}

class GeoPosition extends React.Component {
    state = {
        coords: {
            latitude: null,
            longitude: null
        },
        error: null
    };

    componentDidMount() {
        this.geoId = navigator.geolocation.watchPosition(
            position => {
                this.setState({
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            },
            error => {
                this.setState({error});
            }
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.geoId);
    }

    render() {
        return this.props.children(this.state)
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Geolocation</h1>
                <GeoPosition>
                    {geoPosition =>
                        geoPosition.error ? (
                            <div>Error: {geoPosition.error.message}</div>
                        ) : (
                            <dl>
                                <dt>Latitude</dt>
                                <dd>{geoPosition.coords.latitude || <LoadingDots/>}</dd>
                                <dt>Longitude</dt>
                                <dd>{geoPosition.coords.longitude || <LoadingDots/>}</dd>
                                <dt>Address</dt>
                                <GeoAddress latitude={geoPosition.coords.latitude}
                                            longitude={geoPosition.coords.longitude}>
                                    {(address) => <dd>{address || <LoadingDots/>}</dd>}
                                </GeoAddress>
                            </dl>
                        )
                    }
                </GeoPosition>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));
