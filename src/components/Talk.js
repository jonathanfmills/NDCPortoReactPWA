import React from 'react';

const Talk = ({ talk, ...props }) => {
  const {speaker, title, room} = talk;
  return (
    <div className="col-md-2 col-sm-3 event_item">
      <div className="boxed-linear-content">
        <p className="room">{room}</p>
        <h2 className="session_title">{title}</h2>
      </div>
      <p>{speaker}</p>
    </div>
  )
};

export default Talk;