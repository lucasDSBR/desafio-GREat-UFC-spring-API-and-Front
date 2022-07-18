import './App.css';
import Register from './components/register/register';
import List from './components/list/list';
import Header from './components/header/header';
function App() {
  return (
    <div className="app">
      <Header/>
      <div className="app-container">
        <Register typeIcon="default"/>
        <List/>
      </div>
    </div>
  );
}

export default App;
