import React from 'react';
import ModalForm from './ModalForm';
import TableComp from './TableComp';
import DeleteModal from './DeleteModal';
import EditModalForm from './EditModalForm';
import { useState } from 'react';

const Dashboard = (props) => {
  const modalRef = React.useRef(null);
  const editModalRef = React.useRef(null);
  const deleteModalRef = React.useRef(null);

  const [issueIdToDelete, setIssueIdToDelete] = useState('');
  const [issueToEdit, setIssueToEdit] = useState({
    name: '',
    description: '',
    title: '',
    priority: 0,
  });

  const settingIssueIdToDelete = (id) => {
    setIssueIdToDelete(id);
    showDeleteModal();
  };

  const settingIssueToEdit = async (issue) => {
    setIssueToEdit(issue);
    showEditModal();
  };
  //Show/Close Create Modal
  const showModal = () => {
    modalRef.current.style.display = 'block';
  };
  const closeModal = () => {
    modalRef.current.style.display = 'none';
  };

  //Show/Close Delete Modal
  const showDeleteModal = () => {
    deleteModalRef.current.style.display = 'block';
  };
  const closeDeleteModal = () => {
    deleteModalRef.current.style.display = 'none';
  };

  //Show/Close Edit Modal
  const showEditModal = () => {
    editModalRef.current.style.display = 'block';
  };
  const closeEditModal = () => {
    editModalRef.current.style.display = 'none';
  };

  return (
    <div className='whole-dashboard'>
      <div>
        <button
          className='btn add-team-member-button center-me'
          onClick={showModal}
        >
          Add Issues{'   '} <i className='fa fa-plus'></i>
        </button>
        <hr />
        {/* Modal form */}
        <ModalForm closeModal={closeModal} modalRef={modalRef} />

        {/* Table */}
        <TableComp
          settingIssueIdToDelete={settingIssueIdToDelete}
          settingIssueToEdit={settingIssueToEdit}
        />
        {/* DeleteModal */}
        <DeleteModal
          deleteModalRef={deleteModalRef}
          closeDeleteModal={closeDeleteModal}
          issueIdToDelete={issueIdToDelete}
        />

        {/* Edit Modal  */}
        <EditModalForm
          editModalRef={editModalRef}
          closeEditModal={closeEditModal}
          issue={issueToEdit}
        />
      </div>
    </div>
  );
};

export default Dashboard;
