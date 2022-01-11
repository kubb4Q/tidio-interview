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
  const [selected, setSelected] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setPeople(people.concat(data.map(toPerson)));
  }, [data]);

  React.useEffect(() => {
    if (isError) {
      toast.error('Unable to fetch another data batch. Click "Load more" to try again');
    }
  }, [isError]);

  const handleSelect = (person: Person) => () => {
    const index = people.findIndex(({ id }) => id === person.id);

    if (index > 0) {
      setPeople(people.slice(0, index).concat(people.slice(index + 1)));
    } else {
      setPeople(people.slice(1));
    }

    setSelected([person].concat(selected));
    toast.success(`Card with id:${person.id} selected and moved to top of list`);
  };

  const handleUnselect = (person: Person) => () => {
    const index = selected.findIndex(({ id }) => id === person.id);

    if (index > 0) {
      setSelected(selected.slice(0, index).concat(selected.slice(index + 1)));
    } else {
      setSelected(selected.slice(1));
    }

    setPeople([person].concat(people));
    toast.success(`Card with id:${person.id} unselected and moved to top of unselected list`);
  };

  return (
    <div className="contact-list">
      <div className="selected">Selected contacts: {selected.length}</div>
      {selected.map((personInfo) => (
        <PersonInfo
          key={`${personInfo.id}-selected`}
          data={personInfo}
          onClick={handleUnselect(personInfo)}
          selected
        />
      ))}
      {people.map((personInfo) => (
        <PersonInfo key={personInfo.id} data={personInfo} onClick={handleSelect(personInfo)} />
      ))}
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
