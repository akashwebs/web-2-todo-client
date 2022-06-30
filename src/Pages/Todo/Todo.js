import React, { useState } from 'react';
import { useQuery } from 'react-query';


import Task from './Task';
import UpdateTask from './UpdateTask';

const Todo = () => {
    const { data: tasks, isLoading, refetch } = useQuery('loadTask', () => fetch('https://arcane-gorge-26682.herokuapp.com/task').then(res => res.json()))

    const [updateId, setUpdateId] = useState('')


    return (
        <div className='px-2 md:px-16'>
            <h2 className='text-4xl md:text-5xl mt-8 mb-3 font-extrabold'>Todo</h2>
            <hr />

            <div class="overflow-x-auto">
                <table class="table w-full">

                    <thead>
                        <tr>

                            <th>Task List</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks?.map((task) => <Task
                                task={task}
                                key={task._id}
                                refetch={refetch}
                                setUpdateId={setUpdateId}
                            ></Task>)
                        }


                    </tbody>
                </table>
            </div>
            <UpdateTask task={updateId} refetch={refetch}></UpdateTask>

        </div>
    );
};

export default Todo;