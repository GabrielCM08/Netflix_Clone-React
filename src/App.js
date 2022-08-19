import "./App.css";
import Row from "./components/Row";
import categories from "./api";

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      {/* Destaque */}
      {/* EmAlta */}
      {/* Filmes de cada categoria */}
      {categories.map((category, index) => {
        return (
          <Row
            key={category.name}
            title={category.title}
            path={category.path}
          />
        );
      })}
    </div>
  );
}

export default App;
