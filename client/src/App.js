import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './Pages/Chat/Chat';
import Login from './Pages/Login/Login';

const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </Router>
  </div>
);

export default App;
