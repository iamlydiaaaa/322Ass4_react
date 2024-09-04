import React from "react";
import Moment from 'react-moment';

const ProjectList = (props) => {
    return (
        <div className="project_list">
            {props.projects.map(item => (

                <div id="wrap" key={item.projectIdentifier}>

                    <div className="list_wrap">
                        <ul>
                            <li className="p_name">{item.projectName}</li>
                            <li className="p_date">
                                <span className="p_start_date">
                                    <strong>FROM</strong>
                                    <Moment
                                        date={item.start_date}
                                        parse="YYYY-MM-DD HH:mm"
                                        format="YYYY/MM/DD HH:mm"
                                    />
                                </span>
                                <span className="p_end_date">
                                    <strong>TO</strong>
                                    <Moment
                                        date={item.end_date}
                                        parse="YYYY-MM-DD HH:mm"
                                        format="YYYY/MM/DD HH:mm"
                                    />
                                </span>
                            </li>
                            <li className="p_desc">{item.description}</li>
                            <li className="p_delete">
                                <button onClick={() => props.deleteProject(item)}>x</button>
                            </li>
                        </ul>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default ProjectList;