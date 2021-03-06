import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// screens being imported
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import AddJobScreen from './screens/AddJobScreen'
import JobDetailsScreen from './screens/JobDetailsScreen'
import UpdateJobScreen from './screens/UpdateJobScreen'
import UpdateProgressionScreen from './screens/UpdateProgressionScreen'
import UpdateNotesScreen from './screens/UpdateNotesScreen'
import MyProfileScreen from './screens/MyProfileScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {/* Routes */}
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/addjob" component={AddJobScreen} />
          <Route path="/addnotes/:id" component={UpdateNotesScreen} />
          <Route path="/updateprogress/:id" component={UpdateProgressionScreen} />
          <Route path="/updatejob/:id" component={UpdateJobScreen} />
          <Route path="/myjobs/:id" component={JobDetailsScreen} exact />
          <Route path="/search/:keywords/pageSize/:pageSize/pageNumber/:pageNumber/sort/:sortBy" component={HomeScreen} exact />
          <Route path="/pageSize/:pageSize/pageNumber/:pageNumber/sort/:sortBy" component={HomeScreen} exact />
          <Route path="/myjobs" component={HomeScreen} exact />
          <Route path="/profile" component={MyProfileScreen} />
          <Route exact path='/'><Redirect to='/myjobs' /></Route>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
