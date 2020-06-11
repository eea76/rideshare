import React, { useEffect, useState } from 'react';
import {
    Breadcrumb, Card, Col, Row
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import TripCard from './TripCard';
import { isDriver } from '../services/AuthService';
import { getTrips } from '../services/TripService';

function Driver(props) {

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

    if (!isDriver()) {
        return <Redirect to='/' />
    }

    const getCurrentTrips = () => {
        return trips.filter(trip => {
            return trip.driver !== null && trip.status !== 'COMPLETED';
        });
    }

    const getRequestedTrips = () => {
        return trips.filter(trip => {
            return trip.status === 'REQUESTED';
        });
    }

    const getCompletedTrips = () => {
        return trips.filter(trip => {
            return trip.status === 'COMPLETED';
        });
    }

    return (
        <Row>
            <Col lg={12}>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>

                <TripCard
                    title='Current Trip'
                    trips={getCurrentTrips()}
                    group='driver'
                    otherGroup='rider'
                />


                <TripCard
                    title='Requested Trips'
                    trips={getRequestedTrips()}
                    group='driver'
                    otherGroup='rider'
                />

                <TripCard
                    title='Recent Trips'
                    trips={getCompletedTrips()}
                    group='driver'
                    otherGroup='rider'
                />
            </Col>
        </Row>
    );
}

export default Driver;
