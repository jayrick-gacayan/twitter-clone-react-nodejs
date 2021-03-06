import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/* Components */
import FollowerList from "../Follower/FollowerList";
import Loader from "./Loader";

/* Services */
import UserService from "../../services/user_service";

const RightSideContent = () => {
    let navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, isLoading] = useState(false);

    const [searchParams] = useSearchParams();
    let query = searchParams.get("email");

    useEffect(
        () => {
            isLoading(true);

            const fetchAllUsersTimeout = setTimeout(() => {
                fetchAllUsers();
                isLoading(false);
            }, 2000);

            setSearchText(query !== null ? query: "");
            
            return () => {
                clearTimeout(fetchAllUsersTimeout);
            }
        }
        ,[ query ]
    );

    const fetchAllUsers = () => {
        UserService.getAllUsers()
            .then(
                (response) => {
                    setUsers(response.data);
                },
                (error) => {
                    console.log("Error ---- ",error);
                    
                }
            );
    }

    const handleSearchInputChange = (event) => {
        const { value } = event.target;

        setSearchText(value);
    };

    const handleSearchInputKeyDown = (event) => {
        if(event.keyCode === 13){
            navigate(`/search?email=${ searchText }`); 
        }
    }

    return (
        <aside className='col-lg-3 p-3 d-none d-lg-block'>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text bg-light"
                        style={{
                            borderTopLeftRadius: "50rem",
                            borderBottomLeftRadius: "50rem"
                        }} >
                        <i className="bi bi-search"></i>
                    </span>
                </div>
                <input type="text"
                    className="form-control bg-light border border-start-0"
                    style={{
                        borderTopRightRadius: "50rem",
                        borderBottomRightRadius: "50rem"
                    }}
                    placeholder="Search Twitter"
                    name="searchQuery"
                    value={ searchText }
                    onChange={ handleSearchInputChange }
                    onKeyDown={ handleSearchInputKeyDown }
                    
                    />
            </div>
            {
                <div className="card bg-light mb-3 rounded-3">
                    {
                        loading ? (<Loader />) : 
                        (
                            <React.Fragment>
                                <div className="card-header bg-light">
                                    <h5>Who to follow</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush d-flex">
                                        <FollowerList users={ users }/>
                                    </ul>
                                </div>
                            </React.Fragment>
                        )
                    }
                    
                </div>
            }
        </aside>
    );
}

export default RightSideContent;