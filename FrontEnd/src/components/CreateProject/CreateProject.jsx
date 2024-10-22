import React, { useState, useEffect } from "react";
import "./CreateProject.scss";
import api from "../../api/apiconfig";

const CreateProject = ({ currentProject, addProject, fetchProjects }) => {
    const [project, setProject] = useState({
        name: "",
        description: "",
        collaborators: [],
    });
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users/");
            setUsers(response.data);
        } catch (err) {
            console.error("Error fetching users: ", err);
        }
    };

    const searchUsers = async (searchTerm) => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }
        const results = users.filter((user) =>
            user.username.includes(searchTerm)
        );
        setSearchResults(results);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        searchUsers(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        if (currentProject) {
            setProject(currentProject);
        }
    }, [currentProject]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const addCollaborator = (user) => {
        setProject({
            ...project,
            collaborators: [...project.collaborators, user],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const req = {
                ...project,
                collaborators: project.collaborators.map(
                    (colaborator) => colaborator.id
                ),
            };
            if (currentProject) {
                // Update existing project
                const response = await api.put(
                    `/project/${currentProject.id}/`,
                    req
                );
                fetchProjects();
            } else {
                // Create new project
                const response = await api.post("/project/", req);
                addProject(response.data);
            }
        } catch (err) {
            console.error("Error creating project: ", err);
        }
    };

    return (
        <div className="create-project-container">
            <h2>{currentProject ? "Edit Project" : "Create New Project"}</h2>
            {/* {error && <p className="error">{error}</p>} */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Project Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={project.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Project Description:</label>
                    <textarea
                        name="description"
                        value={project.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Collaborators:</label>
                    <input
                        placeholder="search username ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="search-results">
                        {searchResults.map((user) => (
                            <div
                                key={user.username}
                                onClick={() => addCollaborator(user)}
                                style={{
                                    cursor: "pointer",
                                    border: "5px",
                                    padding: "5px 10px",
                                }}
                            >
                                {user.username}
                            </div>
                        ))}
                    </div>
                    {project.collaborators.map((colaborator) => {
                        return (
                            <div
                                key={colaborator.id}
                                className="colaborator"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>{colaborator.username}</span>
                                <div
                                    style={{
                                        backgroundColor: "#f0f0f0",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setProject({
                                            ...project,
                                            collaborators:
                                                project.collaborators.filter(
                                                    (c) =>
                                                        c.id !== colaborator.id
                                                ),
                                        });
                                        setSearchTerm("");
                                    }}
                                >
                                    x
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button type="submit">Save Project</button>
            </form>
        </div>
    );
};

export default CreateProject;
