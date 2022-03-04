import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addIssue } from '../../actions/issue';

const ModalForm = ({ modalRef, closeModal, addIssue }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    priority: 0,
  });
  const { name, title, description, priority } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //add Issue

    addIssue(formData);

    //clear form data
    setFormData({
      name: '',
      title: '',
      description: '',
      priority: 0,
    });
    closeModal();
  };
  return (
    <div className='modal' ref={modalRef}>
      <form className='modal-content animate form' onSubmit={onSubmit}>
        <span
          onClick={(e) => {
            setFormData({
              name: '',
              title: '',
              description: '',
              priority: 0,
            });
            closeModal();
          }}
          className='close'
          title='Close Modal'
        >
          ×
        </span>
        <div className='whole-dashboard'>
          <h1 className='add-team-member-heading'>Add Issues</h1>

          <label>
            <b>Name</b>
          </label>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              value={name}
              required
              onChange={(e) => onChange(e)}
            />
          </div>

          <label>
            <b>Title</b>
          </label>
          <div className='form-group'>
            <input
              type='text'
              name='title'
              value={title}
              required
              onChange={(e) => onChange(e)}
            />
          </div>

          <label>
            <b>Description</b>
          </label>
          <div className='form-group'>
            <input
              type='text'
              name='description'
              value={description}
              required
              onChange={(e) => onChange(e)}
            />
          </div>

          <label>
            <b>Priority</b>
          </label>
          <div className='form-group'>
            <input
              type='number'
              name='priority'
              value={priority}
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='clearfix'>
            <button
              type='button'
              onClick={(e) => {
                setFormData({
                  name: '',
                  title: '',
                  description: '',
                  priority: 0,
                });
                closeModal();
              }}
              className='btn cancel-team-member-button'
            >
              Cancel
            </button>
            <button type='submit' className='btn add-team-member-button'>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

ModalForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  addIssue: PropTypes.func.isRequired,
};

export default connect(null, { addIssue })(ModalForm);
