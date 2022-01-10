import React from 'react';
import { Person } from 'types/Person';
import './PersonInfo.css';

export type PersonInfoProps = {
  data: Person;
};

export function PersonInfo(props: PersonInfoProps) {
  const { data } = props;

  return (
    <div data-testid="person-info" className="person-info">
      <div className="top-part">
        <div className="initials">{data.initials}</div>
        <div className="name-title">
          <div className="firstNameLastName">{data.firstNameLastName}</div>
          <div className="jobTitle">{data.jobTitle}</div>
        </div>
      </div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}
