
import './App.css';
import DominoFall from './DominoFall';

function App() {
	return (
	  <div style={{ 
		height: '100vh',
		overflow: 'hidden',
		background: 'radial-gradient(circle at center, #2a2a2a, #0a0a0a)'
	  }}>
		<DominoFall count={5} />
	  </div>
	);
  }
export default App;
