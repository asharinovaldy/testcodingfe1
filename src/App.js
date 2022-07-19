import logo from "./logo.svg";
import "./App.css";
import Select from "react-select";
import { useEffect, useState } from "react";

function App() {
  const [dataBerries, setDataBerries] = useState([]);
  const [userSelect, setUserSelect] = useState("");
  const [isShow, setIsShow] = useState(false);

  const getBerries = async () => {
    const berries = await fetch("https://pokeapi.co/api/v2/berry/");
    const value = await berries.json();
    const result = value.results.map((item) => {
      return {
        label: item.name,
        value: item.name,
      };
    });

    setDataBerries(result.sort((a, b) => a.label.localeCompare(b.label)));
  };

  useEffect(() => {
    getBerries();
  }, []);

  const handleSubmit = () => {
    setIsShow((state) => !state);
  };

  const handleChange = (value) => {
    setUserSelect(value);
  };

  return (
    <div className="App">
      <button onClick={() => handleSubmit()} disabled={!userSelect}>
        {isShow ? "Hide Button" : "Show Values"}
      </button>
      <h1> {isShow ? userSelect : ""} </h1>
      <br />
      <br />
      <Select
        options={dataBerries}
        onChange={(e) => handleChange(e.value)}
      ></Select>
    </div>
  );
}

export default App;
