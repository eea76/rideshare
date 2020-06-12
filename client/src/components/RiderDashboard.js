import React, { useEffect, useState } from 'react';
import {
    Breadcrumb, Col, Row
} from 'react-bootstrap';

import TripCard from './TripCard';
import { getTrips } from '../services/TripService';

import { webSocket } from 'rxjs/webSocket';
import { getAccessToken } from '../services/AuthService';


function RiderDashboard (props) {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const loadTrips = async () => {
            const { response, isError } = await getTrips();

            if (isError) {
                setTrips([]);
            } else {
                setTrips(response.data);
            }
        }

        loadTrips();
    }, []);

    useEffect(() => {
      const token = getAccessToken();
      const ws = webSocket(`ws://localhost:8080/taxi/?token=${token}`);
      const subscription = ws.subscribe((message) => {
        setTrips(prevTrips => [
          ...prevTrips.filter(trip => trip.id !== message.data.id),
          message.data
        ]);
      });
      return () => {
        subscription.unsubscribe();
      }
    }, []);

    const getCurrentTrips = () => {
        return trips.filter(trip => {
            return (
                trip.driver !== null &&
                trip.status !== 'REQUESTED' &&
                trip.status !== 'COMPLETED'
            );
        });
    };

    const getCompletedTrips = () => {
        return trips.filter(trip => {
            return trip.status === 'COMPLETED';
        });
    };

    return (
        <Row>
            <Col lg={12}>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                </Breadcrumb>

                <TripCard
                    title='Current Trip'
                    trips={getCurrentTrips()}
                    group='rider'
                    otherGroup='driver'
                />

                <TripCard
                    title='Recent Trips'
                    trips={getCompletedTrips()}
                    group='rider'
                    otherGroup='driver'
                />
            </Col>
        </Row>
    );
}

export default RiderDashboard;
