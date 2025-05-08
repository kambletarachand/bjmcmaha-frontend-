import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import EventModal from './EventModal'; // optional

const AdminEventsManager = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    eventDate: ''
  });
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8989/api/admin/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Failed to load events");
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description, location, eventDate } = formData;
    if (!title || !description || !location || !eventDate) {
      setMessage("All fields are required.");
      return;
    }

    setSubmitting(true);

    if (editId) {
      // Updating existing event (without image handling)
      fetch(`http://localhost:8989/api/admin/events/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(updated => {
          setEvents(events.map(ev => ev.id === editId ? updated : ev));
          setMessage("Event updated");
          resetForm();
        })
        .catch(() => setMessage("Error updating event"))
        .finally(() => setSubmitting(false));
    } else {
      // Creating new event with images
      const data = new FormData();
      data.append("event", new Blob([JSON.stringify(formData)], { type: "application/json" }));
      images.forEach((file) => data.append("images", file));

      fetch("http://localhost:8989/api/admin/events", {
        method: "POST",
        body: data,
      })
        .then(res => res.json())
        .then(created => {
          setEvents([...events, created]);
          setMessage("Event added with images");
          resetForm();
        })
        .catch(() => setMessage("Error saving event"))
        .finally(() => setSubmitting(false));
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', location: '', eventDate: '' });
    setImages([]);
    setEditId(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8989/api/admin/events/${id}`, { method: 'DELETE' })
      .then(() => {
        setEvents(events.filter(ev => ev.id !== id));
        setMessage("Event deleted");
      })
      .catch(() => setMessage("Error deleting event"));
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      eventDate: event.eventDate
    });
    setEditId(event.id);
    setShowModal(true);
  };

  return (
    <div>
      <h3>Manage Events</h3>
      {message && <p>{message}</p>}
      {loading ? <p>Loading...</p> : (
        <>
          <EventForm
            formData={formData}
            setFormData={setFormData}
            images={images}
            setImages={setImages}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isEditing={!!editId}
            submitting={submitting}
          />

          <EventModal isOpen={showModal} onClose={resetForm}>
            <EventForm
              formData={formData}
              setFormData={setFormData}
              images={images}
              setImages={setImages}
              onSubmit={handleSubmit}
              onCancel={resetForm}
              isEditing={!!editId}
              submitting={submitting}
            />
          </EventModal>

          <ul>
            {events.map(ev => (
              <li key={ev.id}>
                <strong>{ev.title}</strong> - {ev.eventDate}
                <button onClick={() => handleEdit(ev)}>Edit</button>
                <button onClick={() => handleDelete(ev.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AdminEventsManager;
