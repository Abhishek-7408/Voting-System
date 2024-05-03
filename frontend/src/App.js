
import './App.css';
import { Route , Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import Error from './pages/Error'

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          
          <Route path='/dashboard' element={<Dashboard/>}/> 
          <Route path='*' element={<Error/>}/>
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
