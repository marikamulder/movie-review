
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Search from './components/Search/Search';
//import Body from './components/Body/body';


function App() {
  return (
    <div className="App">
      <Header/>
        <Search />
        {/*<Body />*/}
      <Footer/>
    </div>
  );
}

export default App;
