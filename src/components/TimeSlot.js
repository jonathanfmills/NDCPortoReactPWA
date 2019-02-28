import React from 'react';
import Talk from './Talk';

const TimeSlot = ({ slot, ...props }) => {
    const { time, talks } = slot;
    return (<div>
        <div className="row">
            <div className="col-md-1 col-sm-3 text-center"></div>
            <div className="col-md-2 col-sm-3">
                <h3>{time}</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-1 col-sm-3 text-center"></div>
            {talks.map((talk, key) =>
                <Talk key={key} talk={talk}></Talk>
            )}
        </div>
        </div>
  )
};

export default TimeSlot;