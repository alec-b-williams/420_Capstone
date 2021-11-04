import logo from './logo.svg';
import './App.css';
import MyComponent from "./MyComponent.js"

function App() {

  let response = fetch("/greeting")
  .then(response => response.text())
  .then(data => console.log(data));

  var html;

  return (
    <div className="App">
      <header className="App-header">
        <MyComponent text="blahblahblah" />
      </header>
    </div>
  );
}

export default App;
