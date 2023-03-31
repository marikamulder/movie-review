import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Search from './components/Search/Search';
import Home from './components/Home/Home';
import Title from './components/Title/Title';
import NotFound from './components/NotFound/NotFound';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Header/>
        {/*<Search />
        {/*<Body />*/}
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/explore" element={ <Search /> } />
        <Route path="/title" element={ <Title /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
