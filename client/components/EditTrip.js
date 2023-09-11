import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTrip, updateSingleTrip } from '../store/singleTripStore';
import { useParams, useHistory } from 'react-router-dom';
import { fetchUsers } from '../store/allUsersStore';

function EditTrip() {
    const dispatch = useDispatch();
    const { id } = useSelector((state) => state.auth);
    const trip = useSelector((state) => state.singleTrip);
    const users = useSelector((state) => state.allUsers);
    const { tripId } = useParams();
    const history = useHistory()

    // Local state for form inputs
    const [formData, setFormData] = useState({
        name: trip.name,
        location: trip.location,
        length: trip.length,
        startDate: trip.startDate,
        endDate: trip.endDate,
        responseDate: trip.responseDate,
        limit: trip.limit,
        createdBy: trip.createdBy
    });

    useEffect(() => {
        dispatch(fetchTrip(tripId));
    }, []);

    useEffect(() => {
        setFormData({
            ...formData,
            ...trip
        });
    }, [trip]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = () => {
        dispatch(updateSingleTrip(formData));
        history.push('/list');
    };

    const getNamesFromIds = (ids) => {
        if (!ids || ids.length === 0) return [];
        return users.filter(user => ids.includes(user.id)).map(user => user.username);
    };

    return (
        <div>
            <b><u>Edit TRIP</u></b>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div>
                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
            </div>
            <div>
                <label>Start Date:</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
            </div>
            <div>
                <label>Response Date:</label>
                <input type="date" name="responseDate" value={formData.responseDate} onChange={handleInputChange} />
            </div>
            <div>
                <label>Limit:</label>
                <input type="limit" name="limit" value={formData.limit} onChange={handleInputChange} />
            </div>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default EditTrip;
