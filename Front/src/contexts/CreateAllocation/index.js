import { createContext, useContext, useState } from "react";
import { AuthContext as ContextLogin } from "../login/logar";
import axios from "../../api/index";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const { logUser } = useContext(ContextLogin);
  const Navigate = useNavigate()


  const [idproject, setIdproject] = useState(null);
  const [title, setTitle] = useState();
  const [descriptions, setDescriptions] = useState();
  const [start_date, setStart_date] = useState();
  const [end_date, setEnd_date] = useState();
  const [start_time, setStart_time] = useState();
  const [end_time, setEnd_time] = useState();

  const [projects, setProjects] = useState();


    



  function findProject() {
    axios
    .get("project/", {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    })
    .then((resp) => {
      setProjects(resp.data.result.projetos);
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  function createAllocation(e) {
    e.preventDefault();
    console.log(idproject);
  
    if (idproject == null) {
        alert("select a project");
      } else if (title === "" || title == null) {
        alert("title obrigatorio");
      } else if (descriptions === "" || descriptions == null) {
        alert("title obrigatorio");
      } else if (start_date === "" || start_date == null) {
        alert("title obrigatorio");
      } else if (start_time === "" || start_time == null) {
        alert("title obrigatorio");
      } else {
        axios
        .post(
          "allocation/" + logUser + "/" + idproject + "",
          {
            title: title,
            descriptions: descriptions,
            start_date: start_date,
            end_date: end_date,
            start_time: start_time,
            end_time: end_time,
          },
          {
            headers: {
              Authorization: localStorage.getItem("Token"),
            },
          }
        )
        .then((resp)=>{
            if(resp.data.status != 201 || resp.data.success != true){
                return alert('erro.')
            }
            alert('project created successfully')
            return Navigate('/dahs_painel')
        })
        .catch((errp) => console.log(errp));
      }
    
  }

  return (
    <AuthContext.Provider
      value={{
        findProject,
        projects,
        setIdproject,
        setTitle,
        setDescriptions,
        setStart_date,
        setEnd_date,
        setStart_time,
        setStart_time,
        setEnd_time,
        createAllocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
