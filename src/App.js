import './App.css';
import './MyComponent.css';
import MyComponent from "./MyComponent.js"


function App() {

  let response = fetch("/greeting")
  .then(response => response.text())
  .then(data => console.log(data));

  return (
    <div className="App">
      <header className="App-header">
        <MyComponent text="Click Here" />
      </header>
    </div>
  );
}

export default App;
