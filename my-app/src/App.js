import { Switch, Redirect, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ProductFeature from './features/Product';

function App() {
  return (
    <div className="app">
      <Header/>

      <BrowserRouter>
            <Switch>
              <Redirect from="/home" to="/" exact />

              <Route path="/products" component={ProductFeature} />
            </Switch>
      </BrowserRouter>
    </div>

  );
}

export default App;
