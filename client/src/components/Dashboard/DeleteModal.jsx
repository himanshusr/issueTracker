import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteIssue } from '../../actions/issue';

const DeleteModal = ({
  closeDeleteModal,
  deleteModalRef,
  deleteIssue,
  issueIdToDelete,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    //delete Issue
    deleteIssue(issueIdToDelete);
    closeDeleteModal();
  };
  return (
    <div className='modal small-modal' ref={deleteModalRef}>
      <form
        className='modal-content animate form'
        onSubmit={onSubmit}
        style={{ width: '25%' }}
      >
        <span
          onClick={(e) => {
            closeDeleteModal();
          }}
          className='close'
          title='Close Modal'
        >
          ×
        </span>
        <div className='whole-dashboard'>
          <h1
            className='add-team-member-heading center-me'
            style={{ fontSize: '1.5rem', textAlign: 'center' }}
          >
            Are you sure you wanna delete?
          </h1>

          <div className='clearfix' style={{ margin: '20px' }}>
            <button
              type='button'
              onClick={(e) => {
                closeDeleteModal();
              }}
              className='btn cancel-team-member-button center-me'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btn add-team-member-button center-me'
            >
              Delete Issue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

DeleteModal.propTypes = {
  closeDeleteModal: PropTypes.func.isRequired,
  deleteIssue: PropTypes.func.isRequired,
  issueIdToDelete: PropTypes.string.isRequired,
};

export default connect(null, { deleteIssue })(DeleteModal);
