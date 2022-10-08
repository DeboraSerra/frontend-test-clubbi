import Router from './routes/routes';
import Container from './components/common/Container';
import AOS from 'aos';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1,

    })
  }, [])
  return (
    <Container>
      <Router />
    </Container>
  );
}

export default App;
