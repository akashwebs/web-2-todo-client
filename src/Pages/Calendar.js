import { format } from 'date-fns';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Calendars = () => {
    const [value, setValue] = useState(new Date());
    const dataFormat=format(value, 'PP')
    console.log(dataFormat);

    return (
        <div className='px-2 md:px-16'>
            <h2 className='text-5xl mt-8 mb-3 font-extrabold'>Todo</h2>
            <hr />
            <div className='mt-5'>
                <input className='w-full focus:outline-0 py-5 px-3 text-2xl bg-white md:w-[350px] input-bordered input' readOnly value={dataFormat}/>
                <Calendar className={'rounded'} onChange={setValue} value={value} />
            </div>
        </div>
    );
};

export default Calendars;