import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useQuery } from 'react-query';
import swal from 'sweetalert';
import 'react-calendar/dist/Calendar.css';


const Calendars = () => {
  const [value, setValue] = useState(new Date());
  const dataFormat = format(value, 'PP')
const [events, setEvents]=useState([])
 const [reFeach, setRefetch]=useState(true)
  useEffect(()=>{
    fetch(` https://arcane-gorge-26682.herokuapp.com/${dataFormat}`)
    .then(res=>res.json())
    .then(data=>{
      if(data){
        setEvents(data)
      }
    })
  },[dataFormat,value,reFeach])
console.log(events)

  const handleTask = (e) => {
    e.preventDefault()
    const taskValue = e.target.task.value;
    if(taskValue.length>0){
        const tasks={taskName:taskValue, isCompelete:false, date:dataFormat}
        
        fetch(' https://arcane-gorge-26682.herokuapp.com/events',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(tasks)
        }).then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
               e.target.task.value=''
               setRefetch(!reFeach)
                swal("Successfully Task Added", "", "success");
            }
        })
    }
}

  

  return (
    <div className='px-2 md:px-16'>
      <h2 className='text-4xl md:text-5xl mt-8 mb-3 font-extrabold'>Todo Calender</h2>
      <hr />
      <div className='md:flex'>
        <div className='inline-block my-5'>

          <Calendar className={'rounded'} onChange={setValue} value={value} />
        </div>

        <div className=' w-full md:w-[450px] md:mt-5 md:ml-10'>
          <div>
            <input className='w-full focus:outline-0 py-5 px-3 text-2xl bg-white input-bordered input' readOnly value={dataFormat} />
            <div className="collapse collapse-arrow">
              <input type="checkbox" className="peer" />
              <div className="collapse-title bg-[#F44336]  text-white peer-checked:bg-secondary peer-checked:text-secondary-content">
                <p className='text-3xl font-bold'>Add Event</p>
              </div>
              <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                <form onSubmit={handleTask}>
                  <input name='task' type="text" placeholder='type your event' className='input block mt-2 input-bordered w-full mb-2' />
                  <input type="submit" value={'Add'} className='btn text-white border-0' />
                </form>
              </div>
            </div>
          </div>

          {/* date wise event */}
          <div>
            <div className="collapse collapse-arrow">
              <input type="checkbox" className="peer" />
              <div className="collapse-title bg-[#1087FF]  text-white peer-checked:bg-secondary peer-checked:text-secondary-content">
                <p className='text-3xl font-bold'>Events <sup className='bg-black text-white rounded-lg p-3 text-sm'>{events?.length}</sup> </p>
              </div>
              <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                <div>
                    {
                      events?.map(event=><div key={event?._id} className='p-3 shadow my-2 bg-white'>{event?.taskName}</div>)
                    }
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Calendars;