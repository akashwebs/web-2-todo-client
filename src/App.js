import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Shared/Header';
import Home from './Pages/Home';
import Todo from './Pages/Todo';
import CompletedTasks from './Pages/CompletedTasks';

function App() {
  return (
    <div className="">

      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/todo' element={<Todo></Todo>}></Route>
        <Route path='/completedtasks' element={<CompletedTasks></CompletedTasks>}></Route>
      </Routes>
    
    </div>
  );
}

export default App;
