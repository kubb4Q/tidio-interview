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
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}
