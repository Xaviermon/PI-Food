import { BrowserRouter,Routes, Route } from 'react-router-dom';
import {Detail, Form, Home, Landing} from './views';


function App() {
  


  return (
    <BrowserRouter>
    
      <Routes>
      
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/create" element={<Form />} />
       
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
