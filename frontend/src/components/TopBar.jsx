import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton = ({ title }) => {
  const history = useHistory();
  return (
    <section className="topBar">
      <div className="topBar__backButton" onClick={() => history.push('/')}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <h3 className="topBar__title">{title}</h3>
    </section>
  );
};

export default BackButton;
