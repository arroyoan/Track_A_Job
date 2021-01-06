import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          {/* <Route /> */}
          <h1>WELCOME TO THE WEBSITE BITCHHHHH</h1>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
