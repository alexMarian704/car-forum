import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav';
import FirstPage from './components/firstPage';
import SingleProject from './components/SingleProject';
import SingIn from './components/SingIn';
import SingUp from './components/SingUp';
import { CreateProject } from './components/CreateProject';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={FirstPage}/>
          <Route path="/project/:id" component={SingleProject}/>
          <Route path="/singin" component={SingIn}/>
          <Route path="/singup" component={SingUp}/>
          <Route path="/newproject" component={CreateProject}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
