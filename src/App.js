import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Nav from './components/Nav';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <h1>Hello</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
