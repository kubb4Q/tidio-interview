import React, { useEffect } from 'react';
import { apiData } from 'infrastructure/persistence/api';
import { Person } from 'types/Person';
import { PersonInfo } from './PersonInfo';
import './ContactsList.css';

export const ContactsList: React.FC = () => {
  const [data, setData] = React.useState<Person[]>([]);
  const [selected] = React.useState<Person[]>([]);

  const fetchAndSaveData = async () => {
    apiData()
      .then((newData) => {
        setData(data.concat(newData));
      })
      .catch(() => {
        console.log('Error!');
      });
  };

  useEffect(() => {
    fetchAndSaveData();
  }, []);
  //  TODO fetch contacts using apiData function, handle loading and error states

  return (
    <div>
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {data.map((personInfo) => (
          <PersonInfo key={personInfo.id} data={personInfo} />
        ))}
      </div>
    </div>
  );
};
