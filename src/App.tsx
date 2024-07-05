import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import { Route, Routes } from 'react-router-dom';
import PageContent from './containers/PageContent/PageContent';

const App = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <Routes>
        <Route path="/:pageName" element={<PageContent />} />
      </Routes>
    </>
  );
};

export default App;
