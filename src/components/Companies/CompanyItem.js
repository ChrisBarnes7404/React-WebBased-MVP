import React, { Component } from 'react';
import Buildings from '../Buildings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class CompanyItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editCompanyTitle: this.props.company.companyTitle,
      editCompanyAddress: this.props.company.companyAddress,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editCompanyTitle: this.props.company.companyTitle,
      editCompanyAddress: this.props.company.companyAddress,
    }));
  };

  onChangeEditCompanyTitle = (event) => {
    this.setState({ editCompanyTitle: event.target.value });
  };

  onChangeEditCompanyAddress = (event) => {
    this.setState({ editCompanyAddress: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditCompany(
      this.props.company,
      this.state.editCompanyTitle,
      this.state.editCompanyAddress,
    );

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, company, onRemoveCompany } = this.props;
    const {
      editMode,
      editCompanyTitle,
      editCompanyAddress,
    } = this.state;

    return (
      <li>
        {editMode ? (
          <span>
            <input
              type="text"
              placeholder="Name Your Company..."
              value={editCompanyTitle}
              onChange={this.onChangeEditCompanyTitle}
            />
            <input
              type="text"
              placeholder="Where does it live?"
              value={editCompanyAddress}
              onChange={this.onChangeEditCompanyAddress}
            />

            <h3>Buildings/Facilities</h3>
            <Buildings companyID={company.uid} />
          </span>
        ) : (
          <span>
            {/* {company.ownerID} */}
            <strong>{company.companyTitle}</strong>
            {company.companyAddress}
            {company.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {authUser.uid === company.ownerID && (
          <span>
            {editMode ? (
              <span>
                <button
                  className="btn btn-secondary"
                  onClick={this.onSaveEditText}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={this.onToggleEditMode}
                >
                  Reset
                </button>
              </span>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={this.onToggleEditMode}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}

            {!editMode && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => onRemoveCompany(company.uid)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default CompanyItem;