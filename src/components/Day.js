import React from 'react';
import TimeSlot from './TimeSlot';

const Day = ({ talks, days, selectedDay, changeDay, ...props }) => {
    const { times } = talks;
    return (<div>
        <div className="row">
            <div className="col-md-1 col-sm-3 text-center"></div>

            <div className="col-md-6 col-sm-3">
            <h2>{days.map((day, index)=>
                 <span id={index} key={index} onClick={changeDay} className={index === selectedDay ? 'selectedDay' : 'notSelectedDay'}>{day}</span>     
                )}
            </h2>
            </div>
            
        </div>
        {times && times.map((talks, key)=>
            <TimeSlot key={key} slot={talks}></TimeSlot>
        )}
        
        </div >
  )
};

export default Day;