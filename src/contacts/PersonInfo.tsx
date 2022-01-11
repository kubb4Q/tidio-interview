import clsx from 'clsx';
import React from 'react';
import { Person } from 'types/Person';
import './PersonInfo.css';

export type PersonInfoProps = {
  data: Person;
  onClick?: () => void;
  selected?: boolean;
};

const BasePersonInfo: React.FC<PersonInfoProps> = ({ data, onClick, selected }) => (
  <div
    data-testid="person-info"
    className={clsx('person-info', selected && 'person-info__selected')}
    onClick={onClick}>
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

export const PersonInfo = React.memo(BasePersonInfo);
