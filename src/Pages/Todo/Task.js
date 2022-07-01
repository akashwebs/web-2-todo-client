import React from 'react';
import edit from '../../Assets/edit.png'
import del from '../../Assets/delete.png'
import swal from 'sweetalert';

const Task = ({ task, refetch,setUpdateId }) => {
    const handleCompelete = (id) => {

        if (id) {

            const url = `https://arcane-gorge-26682.herokuapp.com/updateTask/${id}`
            fetch(url, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ isCompelete: true })
            }).then(res => res.json())
                .then(data => {
                    if (data) {
                        refetch()
                        swal('Task Completed', ' ', "success")
                    }
                })
        }
    }

    const handleDelete=(delteTask)=>{
        swal({
            title: "Are you sure?",
            text: `Delete the "${delteTask.taskName}".`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                if(delteTask._id){
                    fetch(`https://arcane-gorge-26682.herokuapp.com/deleteTask/${delteTask._id}`,{
                        method:'DELETE',
                        headers:{
                            'content-type':'application/json'
                        }
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data){
                            refetch()
                            swal("Successfully deleted", {
                                icon: "success",
                              });
                        }
                       
                    })
                }
              
            } else {
              swal(`"${delteTask.taskName}" is safe!`);
            }
          });
        
      
    }
    

    return (
        <tr>
            <td className=''>
                <input type="checkbox" style={{position:'relative', top:'7px'}} onClick={() => handleCompelete(task._id)} className="checkbox mr-3" />
                {task.taskName}
            </td>

            <td>
                <label onClick={()=>setUpdateId(task)} for="update-task" className="btn btn-square mr-3"><img className='w-8 h-8' src={edit} alt="" /></label>
             
                <button onClick={()=>handleDelete(task)} className="btn btn-square"><img className='w-8 h-8' src={del} alt="" /></button>
            </td>

        </tr>

    );
};

export default Task;