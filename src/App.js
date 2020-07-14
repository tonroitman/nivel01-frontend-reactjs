import React from "react";

import "./styles.css";
import { useState } from "react";
import api from "./services/api";
import { useEffect } from "react";

function App() {

   const [repositories, setRepositories] = useState([]);

   useEffect(() =>{
      api.get('repositories').then(response => {
         setRepositories(response.data);
      });
   }, []);

   async function handleAddRepository() {
      const response = await api.post('repositories', {
         title: `Novo repositório ${Date.now()}`
      });

      const repository = response.data;

      setRepositories([...repositories, repository]);
   }

   async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`);

      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      repositories.splice(repositoryIndex, 1);

      setRepositories([...repositories]);
   }

   return (
      <div>
         <ul data-testid="repository-list">
            {
               repositories.map(repository =>
                  <li key={repository.id}>
                     {repository.title}
                     <button onClick={() => handleRemoveRepository(repository.id)}>
                        Remover
                     </button>
                  </li>
               )
            }
         </ul>

         <button onClick={handleAddRepository}>Adicionar</button>
      </div>
   );
}

export default App;
