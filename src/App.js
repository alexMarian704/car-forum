import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav';
import FirstPage from './components/firstPage';
import SingleProject from './components/SingleProject';
import SingIn from './components/SingIn';
import SingUp from './components/SingUp';
import CreateProject from './components/CreateProject';
import Footer from './components/footer';
import Profile from './components/Profile';
import ErrorPage from './components/404';
import ProfileUser from './components/ProfileUser';
import YourFriends from './components/YourFriends';
import MessageApp from './components/MessageApp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div id="footerRender">
        <Nav />
        <Switch>
          <Route path="/" exact component={FirstPage}/>
          <Route path="/project/:id" component={SingleProject}/>
          <Route path="/signin" component={SingIn}/>
          <Route path="/signup" component={SingUp}/>
          <Route path="/newproject" component={CreateProject}/>
          <Route path="/your/profile" component={Profile}/>
          <Route path="/profile/:id" component={ProfileUser}/>
          <Route path="/your/follow" component={YourFriends}/>
          <Route path="/message/:id" component={MessageApp}/>
          <Route  path="*" component={ErrorPage}/>
        </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
