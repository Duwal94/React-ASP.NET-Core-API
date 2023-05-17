import React, { useState } from 'react';
import Constants from '../Utilities/Constants';

export default function PostCreateForm(props) {
  const initialFormData = Object.freeze({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postToCreate = {
      id: 0,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      region: formData.region,
    };

    const url = Constants.API_URL_CREATE_POST;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postToCreate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.onPostCreated(postToCreate);
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Create new Contact</h1>

      <div className="mt-5">
        <label className="h3 form-label">Name</label>
        <input
          value={formData.name}
          name="name"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Email</label>
        <input
          value={formData.email}
          name="email"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <label className="h3 form-label">Phone</label>
        <input
          value={formData.phone}
          name="phone"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <label className="h3 form-label">Address</label>
        <input
          value={formData.address}
          name="address"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <label className="h3 form-label">City</label>
        <input
          value={formData.city}
          name="city"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <label className="h3 form-label">Region</label>
        <input
          value={formData.region}
          name="region"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      {/* Rest of the input fields */}

      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">
        Submit
      </button>
      <button
        onClick={() => props.onPostCreated(null)}
        className="btn btn-secondary btn-lg w-100 mt-3"
      >
        Cancel
      </button>
    </form>
  );
}
