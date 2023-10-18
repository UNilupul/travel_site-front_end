import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import Addplace from "./pages/addplace/addplace";
import MapRoutes from "./components/mapRoutes/mapRoutes";


//admin components

import Sidebar from './pages/dashboad/sidebar/sidebar';
import Contactus from './pages/user/contactUs/contactus';
import Tours from './pages/user/tours/tours';
import Add_place from './pages/dashboad/add_place/add_place';
import TourCategory from './pages/dashboad/Tour Catergory/tourCategory';
import Hotels from './pages/dashboad/Hotel/hotels';
import Vehicals from './pages/dashboad/vehicals/vehicals';
import Agents from './pages/dashboad/agents/agents';
import TourPackages from './pages/dashboad/tour packages/tourPackages';

import Carousel1 from './components/carousel/carousel1';


//user components
import Navbar from './components/navbar/navbar';
import Home from './pages/user/home/home';
import Cart from './pages/user/cart/cart';
import Footer from './components/footer/footer';
import About from './pages/user/about/about';
import Popular_destination from './pages/popular_destination/popular_destination';
import Profile from './pages/user/profile/profile';
import PlaceReview from './pages/user/placeReview/placeReview';



function App() {
  const currentPath = window.location.pathname;
  console.log(currentPath);
  
  return (
    <div className="App">
      {currentPath.startsWith('/dashboad') ? <Sidebar/>:<Navbar/>}
      
      
      <div className={currentPath.startsWith('/dashboad') ? "Add-sub-div":null}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>

          <Route exact path="/cart/:id" component={Cart} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contactus" component={Contactus} />
          <Route exact path="/tours" component={Tours} />
          <Route exact path="/popular_destination" component={Popular_destination} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/placeReview/:id" component={PlaceReview} />



          <Route exact path="/dashboad/addplace" component={Add_place}/>
          <Route exact path="/dashboad/tourCategory" component={TourCategory}/>
          <Route exact path="/dashboad/hotels" component={Hotels}/>
          <Route exact path="/dashboad/vehicals" component={Vehicals}/>
          <Route exact path="/dashboad/agents" component={Agents}/>
          <Route exact path="/dashboad/tourPackages" component={TourPackages}/>
        </Switch>
      </Router>

    {/* <Carousel1/> */}
      </div>

      
      {/* <Addplace /> */}
      {/* <MapRoutes /> */}

     
      {currentPath.startsWith('/dashboad') ? null: <Footer/>}
    </div>
  );
}

export default App;
