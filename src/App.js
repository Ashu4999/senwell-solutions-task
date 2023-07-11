import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [nameCountData, setNameCountData] = useState(null);

  async function getData() {
    try {
      let response = await axios.get(
        "https://api.slingacademy.com/v1/sample-data/users?&limit=50"
      );
      setData(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  function makeDublicateData() {
    let limit = 150;
    let dublicateData = data;
    for (let i = 0; i < limit; i++) {
      let randomIndex = Math.floor(Math.random() * 20);
      dublicateData.push({...data[randomIndex], id: dublicateData.length + 1});
    }

    let nameCountObj = {};
    dublicateData.forEach(obj => {
      let name = obj.first_name;
      nameCountObj[name] = nameCountObj[name] ? nameCountObj[name] + 1 : 1;
    })
    setNameCountData(nameCountObj)
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    data.length > 0 && makeDublicateData();
  }, [data]);

  const getRowBackground = count => {
    if (count > 0 && count < 3) {
      return "red";
    } else if (count >= 3 && count < 10) {
      return "yellow";
    } else if (count >= 10) {
      return "green";
    }
    return "";
  };

  return (
    <div className="App">
      <p>Task</p>
      {
        nameCountData && 
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Count</th>
              </tr>
              {
                Object.keys(nameCountData).map((name, index) => {
                  return(
                    <tr key={index} style={{ backgroundColor: getRowBackground(nameCountData[name]) }}>
                      <td>{name}</td>
                      <td>{nameCountData[name]}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
      }
    </div>
  );
}

export default App;
