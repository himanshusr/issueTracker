import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TableComp = ({ issues, settingIssueIdToDelete, settingIssueToEdit }) => {
  const handleDeleteClick = (id) => {
    settingIssueIdToDelete(id);
  };

  const handleEditClick = (issue) => {
    settingIssueToEdit(issue);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Priority</th>
            <th className='description'>Description</th>
            <th>Last Updated</th>
            <th>Added on</th>
            <th className='edit'>Edit</th>
            <th className='delete'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue._id}>
              <td>
                <div className='note'>
                  <p>{issue.name}</p>
                </div>
              </td>
              <td>
                <div className='note'>
                  <p>{issue.title}</p>
                </div>
              </td>
              <td>{issue.priority}</td>
              <td>
                <div className='note'>
                  <p>{issue.description}</p>
                </div>
              </td>
              <td>
                <div className='note'>
                  <p>
                    {new Date(issue.lastUpdated).toLocaleDateString('en-GB')}
                  </p>
                </div>
              </td>
              <td>
                <div className='note'>
                  <p>{new Date(issue.added).toLocaleDateString('en-GB')}</p>
                </div>
              </td>
              <td className='edit'>
                <button
                  type='button'
                  className='delete-icon'
                  onClick={(e) => handleEditClick(issue)}
                >
                  {' '}
                  <i className='fas fa-edit'></i>
                </button>
              </td>
              <td className='delete'>
                <div>
                  <button
                    type='button'
                    className='delete-icon'
                    onClick={(e) => handleDeleteClick(issue._id)}
                  >
                    {' '}
                    <i className='fa fa-trash'></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TableComp.propTypes = {
  issues: PropTypes.array,
  settingIssueIdToDelete: PropTypes.func.isRequired,
  settingIssueToEdit: PropTypes.func.isRequired,
};
const sortIssues = (issues) => {
  return issues.sort(function (a, b) {
    if (a.priority < b.priority) {
      return -1;
    }
    if (a.priority > b.priority) {
      return 1;
    }
    return 0;
  });
};

const mapStateToProps = (state) => ({
  issues: sortIssues(state.issue.issues),
});
export default connect(mapStateToProps, {})(TableComp);
