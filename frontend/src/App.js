import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// screens being imported
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {/* Routes */}
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
