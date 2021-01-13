import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// screens being imported
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import AddJobScreen from './screens/AddJobScreen'

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
          <Route path="/myjobs" component={HomeScreen} exact />
          <Route exact path='/'><Redirect to='/myjobs' /></Route>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
