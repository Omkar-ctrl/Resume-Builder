import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

const mapDispatchToProps = (dispatch) => ({});

class Volunteer extends Component {
    render() {
        return (
            <div>
                <p>{JSON.stringify(this.props)}</p>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Volunteer);
