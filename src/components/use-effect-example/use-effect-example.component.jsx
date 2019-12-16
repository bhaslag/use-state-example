import React, { useState, useEffect } from 'react';

import Card from '../card/card.component';

const UseEffectExample = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Bret');

  //useEffect does not return a value
  //takes a function which gets called when the component updates/re-renders/changes
  //mimicks component-did-mount method
  //also used for any update lifecycle methods when setstate gets called
  useEffect(() => {
    //To use an async function inside a useEffect, must create function that holds the async
    const fetchFunc = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?username=${searchQuery}`
      );
      const resJson = await response.json();
      setUser(resJson[0]);
    };

    fetchFunc();
    //Takes a 2nd parameter as an array. Value set inside this array are the ones that will trigger the re-render
    //Empty array signals that no effect us triggered after the first time the component mounts
  }, [searchQuery]);

  return (
    <Card>
      <input
        type='search'
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      {user ? (
        <div>
          <h3>{user.name}</h3>
          <h3> {user.username} </h3>
          <h3> {user.email} </h3>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </Card>
  );
};

export default UseEffectExample;
