import axios from "axios";

function App() {

  let fn = async () => {
    let res = await axios.get('/api/test');
    console.log('res: ', res);
  }


  return (
      <div>
          <h1 className="text-6xl">Hello Francesco</h1>
          <button
          onClick={() => fn()}
          >Click me</button>
      </div>
  );
}

export default App;
