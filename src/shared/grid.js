import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEntries, setLoading } from '../store/actions';

const Grid = ({ location, fetchInitialData }) => {
  const dispatch = useDispatch();
  const { entries, pathname, loading } = useSelector((state) => state);

  useEffect(() => {
    if (entries.length === 0 || location.pathname !== pathname) {
      dispatch(setLoading());
      fetchInitialData(location.pathname).then((data) => {
        dispatch(setEntries({ entries: data, pathname: location.pathname }));
      })
    }
  }, [location.pathname]);

  return (
    <div>
      { loading && <div>loading...</div> }    
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        { entries.map(({ name, owner, stargazers_count, html_url }, index) => {
          return(
            <li key={index} style={{ margin: 30 }}>
              <ul>
                <li><a href={html_url}>{name}</a></li>
                <li>{owner.login}</li>
                <li>{stargazers_count} stars</li>
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default Grid;