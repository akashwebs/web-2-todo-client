import React from 'react';
import swal from 'sweetalert';
const UpdateTask = ({task,refetch}) => {

    
    const handleUpdate=(e)=>{
        e.preventDefault()
    
        const newTaskName=e.target.taskName.value;
        if(newTaskName){
            
            const url=`http://localhost:5000/updateTask/${task._id}`
            fetch(url,{
                method:"PUT",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({taskName:newTaskName})
            }).then(res=>res.json())
            .then(data=>{
                if(data){
                    e.target.taskName.value=''
                    refetch()
                    swal('Task Successfully updated',' ',"success")
                }
            })
        }
    }
    
    
    return (
        <div>
           <input type="checkbox" id="update-task" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleUpdate} class="modal-box">
                    <h3 class="font-extrabold text-3xl mb-3">Update Task</h3>
                    <input name='taskName' type="text" defaultValue={task.taskName} class="input input-bordered w-full max-w-xs" />
                    <div class="mt-3">
                        <button type='submit'><label for="update-task" class="btn border-0 hover:btn-success bg-[#F44336] text-white">Update Now</label></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;