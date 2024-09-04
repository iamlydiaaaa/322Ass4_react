import React, { useState } from "react";
import Moment from "moment";

const ProjectAdd = (props) => {

    const [state, setState] = useState({
        projectName: '',
        projectIdentifier: '',
        start_date: '',
        end_date: '',
        description: ''
    });

    const [errors, setErrors] = useState({});

    const handleAdd = (e) => {
        e.preventDefault();

        if(validateForm()){
            let temp = {
                projectName: state.projectName,
                projectIdentifier: state.projectIdentifier,              
                start_date: formatDate(state.start_date),
                end_date: formatDate(state.end_date),
                description: state.description
            };
    
            props.addProject(temp);
    
            setState({
                projectName: '',
                projectIdentifier: '',
                start_date: '',
                end_date: '',
                description: ''
            });
    
            alert("A new project added Successfully!");
    
            props.toggleForm();
        }
    };

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if(state.projectName.trim()===''){
            isValid = false;
            errors.projectName = "Project Name is required";
        }
        if(state.projectIdentifier.trim()===''){
            isValid = false;
            errors.projectIdentifier = "ID is required"
        } else if (!/^\d+$/.test(state.projectIdentifier)) {
            isValid = false;
            errors.projectIdentifier = "ID must be a number";
        }

        setErrors(errors);
        return isValid;
    }

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const formatDate = (dateString) => {
        const formattedDate = Moment(dateString).format('YYYY-MM-DD HH:mm');
        return formattedDate;
      };


    return (
        <div className="project_add">
            <div className="form_wrap">
                <h3 className="form_tit">Add a New Project</h3>
                <form id="projectForm" onSubmit={handleAdd}>
                    <div className="form_row_1">
                        <p>
                            <label>Name</label>
                            <input required 
                                type="text" 
                                name="projectName" 
                                value={state.projectName} 
                                onChange={handleChange}>
                            </input>
                            {errors.projectName && <span className="error">{errors.projectName}</span>}
                        </p>
                        <p>
                            <label>ID</label>
                            <input required 
                                type="text" 
                                name="projectIdentifier" 
                                value={state.projectIdentifier} 
                                onChange={handleChange}>
                            </input>
                            {errors.projectIdentifier && <span className="error">{errors.projectIdentifier}</span>}
                        </p>
                    </div>
                    <div className="form_row_2">
                        <p>
                            <label>START</label>
                            <input required 
                                type="datetime-local" 
                                name="start_date" 
                                value={state.start_date} 
                                onChange={handleChange}>
                            </input>
                        </p>
                        <p>
                            <label>END</label>
                            <input required 
                                type="datetime-local" 
                                name="end_date" 
                                value={state.end_date} 
                                onChange={handleChange}>
                            </input>
                        </p>
                    </div>
                    <div className="form_row_3">
                        <p>
                            <label>Description</label>
                            <textarea required 
                                name="description" 
                                value={state.description} 
                                onChange={handleChange}/>
                        </p>
                    </div>
                    <div className="form_row_4">
                        <p>
                            <button type="submit" className="form_submit">Add Project</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectAdd;