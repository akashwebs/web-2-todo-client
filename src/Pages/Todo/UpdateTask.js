import React from 'react';
import swal from 'sweetalert';
const UpdateTask = ({task,refetch}) => {

    
    const handleUpdate=(e)=>{
        e.preventDefault()
    
        const newTaskName=e.target.taskName.value;
        if(newTaskName){
            
            const url=`https://arcane-gorge-26682.herokuapp.com/updateTask/${task._id}`
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
           <input type="checkbox" id="update-task" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleUpdate} className="modal-box">
            <label for="update-task" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-extrabold text-3xl mb-3">Update Task</h3>
                    <input name='taskName' type="text" defaultValue={task.taskName} className="input input-bordered w-full max-w-xs" />
                    <div className="mt-3">
                        <button type='submit'><label for="update-task" className="btn border-0 hover:btn-success bg-[#F44336] text-white">Update Now</label></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;