import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      rooms: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    var userID = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.user(userID).on('value', (snapshot) => {
      const user = snapshot.val();
      const usersCompany = user.company_id;

      this.props.firebase
        .rooms()
        .orderByChild('companyID')
        .equalTo(usersCompany)
        .on('value', (snapshot) => {
          const roomsObject = snapshot.val();

          const roomsList = Object.keys(roomsObject).map((key) => ({
            ...roomsObject[key],
            uid: key,
          }));

          this.setState({
            rooms: roomsList,
            loading: false,
          });
        });
    });
  }

  componentWillUnmount() {
    this.props.firebase.rooms().off();
  }

  render() {
    const { rooms, loading } = this.state;

    return (
      <div className="add-padding-bottom">
        <h2>Room List</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              <strong>Title:</strong> {room.roomName}<br />
              <strong>Location:</strong> {room.roomLocation}<br />

              <Link to={{ pathname: `${ROUTES.ROOMS}/${room.id}`, state: { room } }}>
                Details
              </Link>

              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withFirebase(RoomList);