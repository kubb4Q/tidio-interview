import React from 'react';
import { apiData } from 'infrastructure/persistence/api';
import { Person, PersonDto, toPerson } from 'types/Person';
import { PersonInfo } from './PersonInfo';
import './ContactsList.css';
import { Loader } from 'ui/Loader';
import { toast } from 'react-toastify';

const useApiData = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<PersonDto[]>([]);
  const [error, setError] = React.useState(null);
  const mountedRef = React.useRef(true);

  const fetchData = React.useCallback(() => {
    setLoading(true);
    return apiData()
      .then((res) => {
        if (!mountedRef.current) return null;
        setData(res);
        setError(null);
        setLoading(false);
        return res;
      })
      .catch((err) => {
        if (!mountedRef.current) return null;
        setError(err);
        setLoading(false);
      });
  }, [apiData]);

  React.useEffect(() => {
    fetchData();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    fetchData,
    isLoading: loading,
    data,
    isError: Boolean(error)
  };
};

export const ContactsList: React.FC = () => {
  const { fetchData, isLoading, data, isError } = useApiData();
  const [people, setPeople] = React.useState<Person[]>([]);
  const [selected] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setPeople(people.concat(data.map(toPerson)));
  }, [data]);

  React.useEffect(() => {
    if (isError) {
      toast.error('Unable to fetch another data batch. Click "Load more" to try again');
    }
  }, [isError]);

  return (
    <div className="contact-list">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {people.map((personInfo) => (
          <PersonInfo key={personInfo.id} data={personInfo} />
        ))}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <button className="load-more" onClick={() => fetchData()}>
          Load more
        </button>
      )}
    </div>
  );
};
