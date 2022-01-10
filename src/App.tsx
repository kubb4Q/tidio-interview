import React from 'react';
import PersonInfo from './PersonInfo';

function App() {
  const [data] = React.useState([]);
  const [selected] = React.useState([]);

  //  TODO fetch contacts using apiData function, handle loading and error states

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {data.map((personInfo) => (
          <PersonInfo key={personInfo.id} data={personInfo} />
        ))}
      </div>
    </div>
  );
}

export default App;
