import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import { Link, Route, Routes } from 'react-router-dom';
import PageContent from './containers/PageContent/PageContent';
import EditPage from './containers/EditPage/EditPage';
import Home from './containers/Home/Home';

const App = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/:pageName" element={<PageContent />} />
        <Route path="/admin" element={<EditPage />} />
        <Route
          path="*"
          element={
            <div>
              <h1 className={'mt-5 text-danger'}>Not found!</h1>
              <Link to="/" className={'btn btn-danger'}>
                Go back!
              </Link>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
