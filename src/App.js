import Form from "./components/Form";
import ChartLine from "./components/ChartLine";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="bg-purple-700 !bg-indigo-500">
        <h1 className="text-white p-3 px-0 text-3xl container mx-auto mb-3 w-5/6">
          Monitor the progress - <span className="text-2xl">Contraction</span>
        </h1>
      </header>
      <main>
        <Form />
        <ChartLine />
      </main>
    </div>
  );
}

export default App;
