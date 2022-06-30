import React from 'react';
import add from '../Assets/add.png'


const Home = () => {
    return (
        <div>
            <div className='flex items-center mt-12 flex-col'>
                <h3 className='text-3xl uppercase mb-2'>Add Task</h3>
                <div class="form-control w-full md:w-1/2">
                    <div class="input-group ">
                        <input type="text" placeholder="Write your task" class="input w-full text-2xl focus:outline-0 input-bordered" />
                        <button class="btn btn-square input-bordered bg-white hover:bg-[#F44336] hover:input-bordered">
                            <img src={add} className='w-10 h-10' alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;