import React from 'react';
import '../../../styles/adminStyles/EventForm.css';

const EventForm = ({
  formData,
  setFormData,
  images,
  setImages,
  onSubmit,
  onCancel,
  isEditing,
  submitting
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data" className="event-form">
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />

      <input
        name="eventDate"
        type="date"
        value={formData.eventDate}
        onChange={handleChange}
      />

      <input
        type="file"
        name="images"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : isEditing ? 'Update Event' : 'Add Event'}
      </button>

      {isEditing && (
        <button type="button" onClick={onCancel}>
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default EventForm;
