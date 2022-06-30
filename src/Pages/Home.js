import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import add from '../Assets/add.png'
import { useQuery } from 'react-query';
import Loading from './Loading';


const Home = () => {
   
    
    const {data: task, isLoading, refetch}=useQuery('loadTask',()=>fetch('http://localhost:5000/task').then(res=>res.json()))

    const handleTask = (e) => {
        e.preventDefault()
        const taskValue = e.target.task.value;
        if(taskValue.length>0){
            const tasks={taskName:taskValue, isCompelete:false}
            
            fetch('http://localhost:5000/addTask',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(tasks)
            }).then(res=>res.json())
            .then(data=>{
                if(data.insertedId){
                    refetch()
                    swal("Successfully Task Added", "", "success");
                }
            })
        }
    }

    if(isLoading){
        return <Loading></Loading>
    }


    


    const handleCompelete=(id)=>{
        
        if(id){
            
            const url=`http://localhost:5000/updateTask/${id}`
            fetch(url,{
                method:"PUT",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({isCompelete:true})
            }).then(res=>res.json())
            .then(data=>{
                if(data){
                    refetch()
                    swal('Task Completed',' ',"success")
                }
            })
        }
    }


    return (
        <div>
            <div className='flex items-center mt-12 flex-col'>
                <h3 className='text-3xl uppercase mb-2'>Add Task</h3>
                <div class="form-control w-full md:w-1/2">
                    <form  onSubmit={handleTask} class="input-group ">
                        <input type="text" name='task' placeholder="Write your task" class="input w-full text-2xl focus:outline-0 input-bordered" />
                        <button type='submit' class="btn btn-square input-bordered bg-white hover:bg-[#F44336] hover:input-bordered">
                            <img src={add} className='w-10 h-10' alt="" />
                        </button>
                    </form>
                </div>
            </div>
            <div className='px-2 md:px-16'>
                <h2 className='text-3xl my-3 font-semibold'>My ToDo</h2>
                <hr className='h-2' />
                <div>
                    <div class="overflow-x-auto">
                        <table class="table w-full">

                            <thead>
                                <tr>
                                    <th>Task List</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    task?.map(t=>{
                                        return  <tr className='flex items-center py-2 shadow-md my-2 gap-2'>
                                        <input type="checkbox" onClick={()=>handleCompelete(t._id)} class="checkbox" /> {t.taskName}
                                    </tr>
                                    })
                                }
                                   
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;