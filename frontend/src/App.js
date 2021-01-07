import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// screens being imported
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          {/* <Route /> */}
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/" render={() => (<h1>WELCOME TO THE WEBSITE BITCHHHHH</h1>)} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
