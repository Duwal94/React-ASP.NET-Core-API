import React, { useState } from 'react';
import Constants from '../Utilities/Constants';

export default function PostUpdateForm(props) {
  const { post, onPostUpdated } = props;

  const [formData, setFormData] = useState({ ...post });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `https://localhost:7116/api/Contacts/${post.id}`;
    const postToUpdate = { ...formData };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postToUpdate),
      });

      const responseFromServer = await response.json();
      console.log(responseFromServer);

      onPostUpdated(postToUpdate);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Update Contact</h1>

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
        onClick={() => props.onPostUpdated(null)}
        className="btn btn-secondary btn-lg w-100 mt-3"
      >
        Cancel
      </button>
    </form>
  );
}
