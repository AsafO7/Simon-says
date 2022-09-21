import { Routes, Route } from 'react-router-dom';
import Game from './components/Game'
import ResultTable from './components/ResultTable';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Game />}/>
      <Route path='/leaderboard' element={<ResultTable />}/>
    </Routes>
    </>
  );
}

export default App;
