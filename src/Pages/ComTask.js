import React from 'react';
import swal from 'sweetalert';
import del from '../Assets/delete.png'


const ComTask = ({comTask, refetch}) => {
    const handleCompelete=(id)=>{
        
        if(id){
            
            const url=`http://localhost:5000/updateTask/${id}`
            fetch(url,{
                method:"PUT",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({isCompelete:false})
            }).then(res=>res.json())
            .then(data=>{
                if(data){
                    refetch()
                    swal('Task Uncompleted','Check your todo list ',"success")
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
                    fetch(`http://localhost:5000/deleteTask/${delteTask._id}`,{
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
                <input type="checkbox" checked style={{position:'relative', top:'7px'}} onClick={() => handleCompelete(comTask._id)} class="checkbox mr-3" />
                <span className='line-through'>{comTask.taskName}</span>
            </td>

            <td>
                           
                <button onClick={()=>handleDelete(comTask)} className="btn btn-square"><img className='w-8 h-8' src={del} alt="" /></button>
            </td>

        </tr>
       
    );
};

export default ComTask;