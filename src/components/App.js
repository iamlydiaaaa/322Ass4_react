import React, { useState, useEffect } from 'react';
import {without} from 'lodash';
import ProjectList from './ProjectList';
import ProjectAdd from './ProjectAdd';


function App() {
  const [myProject, setMyProject] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [formDisplay, setFormDisplay] = useState(false);
  const [search, setSearch] = useState("");

  //A toggle function which toggles to display the Add form
  const toggleForm = () => {
    setFormDisplay((prevDisplay) => !prevDisplay);
  };


  //Add a new project to the projectList, and also increase index.
  const addProject = (pp) => {
    pp.projectId = lastIndex;
    setMyProject((prevProjects) => [pp, ...prevProjects]);
    setLastIndex((prevIndex) => prevIndex+1);
  };


  //Delete a project which is selected, using 'without'
  const deleteProject = (pp) => {
    const temp = without(myProject, pp);
    setMyProject(temp);
    alert("Deleted");
  }


  // Get a data from a json file
  useEffect(() => {
    const getProject = async () => {
      const res = await fetch('./data.json')
      const data = await res.json()
      const temp = data.map((item) => {
        item.projectId = lastIndex;
        setLastIndex((prevIndex) => prevIndex + 1);
        return item;
      });
      setMyProject(temp);
      return data
    }

    getProject()
  }, [])


  //Updates the value whenever user types into the search text area.
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  //Display only filtered elements
  const searchList = myProject.filter((project)=>{
    return project.projectName.toLowerCase().includes(search.toLowerCase());
  });



  return (
    <div className="App">
      <div className="header">
          <div className="top"></div>
          <div className="header-wrap">
              <div className="header_bottom">
                  <h1>Projects</h1>
                  <div className="search_wrap">
                      <input 
                        type="text" 
                        id="search_area" 
                        placeholder="search" 
                        onChange={handleSearch} 
                        value={search}
                       />
                  </div>
              </div>
          </div>
          <div className="sort">
              <div className="sort_l">
                  <button className="create" onClick={toggleForm}>Create a new Project</button>
              </div>
              <div className="sort_r">
                  <p>sort by:</p>
                  <button onClick={()=>{
                    let pro1 = [...myProject]
                    pro1.sort((a,b)=> a.projectName.toUpperCase() < b.projectName.toUpperCase() ? -1 :1);
                    setMyProject(pro1);
                  }}>a-z</button>

                  <button onClick={()=>{
                    let pro1 = [...myProject]
                    pro1.sort((a,b)=> a.projectName.toUpperCase() > b.projectName.toUpperCase() ? -1 :1);
                    setMyProject(pro1);
                  }}>z-a</button>

                  <button onClick={()=>{
                    let pro1 = [...myProject]
                    pro1.sort((a,b)=> a.start_date > b.start_date ? -1 :1);
                    setMyProject(pro1);
                  }}>Latest</button>

                  <button onClick={()=>{
                    let pro1 = [...myProject]
                    pro1.sort((a,b)=> a.start_date < b.start_date ? -1 :1);
                    setMyProject(pro1);
                  }}>Oldest</button>
              </div>

          </div>
      </div>

      <div className='container'>
        {formDisplay && (
          <ProjectAdd 
          formDisplay={formDisplay} 
          toggleForm={toggleForm}
          addProject={addProject} />
        )}
        

        <ProjectList 
          projects={searchList}
          deleteProject = {deleteProject}
        />
      </div>
    </div>
  );
};

export default App;
