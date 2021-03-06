import React, { useState } from 'react';
import ComTask from './ComTask';
import { useQuery } from 'react-query';
import Loading from './Loading';

const CompletedTasks = () => {

    const {data:completedTasks, isLoading, refetch}=useQuery('completedTask',()=>fetch('https://arcane-gorge-26682.herokuapp.com/compeltetask').then(res=>res.json()))
    

    if(isLoading){return <Loading></Loading>}
    
    
    return (
        <div className='md:px-16 px-2'>
            <h2 className='text-4xl md:text-5xl mt-8 mb-3 font-extrabold'>Completed Tasks</h2>
            <hr />

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>

                            <th>Task List</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            completedTasks?.map((comTask) =><ComTask
                            comTask={comTask}
                            key={comTask._id}
                            refetch={refetch}
                            ></ComTask> )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedTasks;