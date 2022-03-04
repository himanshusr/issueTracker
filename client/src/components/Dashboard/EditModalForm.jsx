import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { updateIssue } from '../../actions/issue';

const EditModalForm = ({
  editModalRef,
  closeEditModal,
  issue,
  updateIssue,
}) => {
  const [formData, setFormData] = useState({
    name: issue.name,
    title: issue.title,
    description: issue.description,
    priority: issue.priority,
  });
  const { name, title, description, priority } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //The Delay problem is solved using UseEffect
  useEffect(() => {
    setFormData({
      name: issue.name,
      title: issue.title,
      description: issue.description,
      priority: issue.priority,
    });
  }, [issue]);

  const onSubmit = (e) => {
    e.preventDefault();
    //Update the Issue
    updateIssue(issue._id, formData);
    //clear form data
    setFormData({
      name: issue.name,
      title: issue.title,
      description: issue.description,
      priority: issue.priority,
    });
    closeEditModal();
  };
  return (
    <div className='modal' ref={editModalRef}>
      <form className='modal-content animate form' onSubmit={onSubmit}>
        <span
          onClick={(e) => {
            setFormData({
              name: issue.name,
              title: issue.title,
              description: issue.description,
              priority: issue.priority,
            });
            closeEditModal();
          }}
          className='close'
          title='Close Modal'
        >
          ×
        </span>
        <div className='whole-dashboard'>
          <h1 className='add-team-member-heading'>Edit the issue</h1>

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
                  name: issue.name,
                  title: issue.title,
                  description: issue.description,
                  priority: issue.priority,
                });
                closeEditModal();
              }}
              className='btn cancel-team-member-button'
            >
              Cancel
            </button>
            <button type='submit' className='btn add-team-member-button'>
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

EditModalForm.propTypes = {
  closeEditModal: PropTypes.func.isRequired,
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

export default connect(null, { updateIssue })(EditModalForm);
