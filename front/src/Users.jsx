import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser, clearToken } from "./redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Form, InputGroup } from "react-bootstrap";


function Users() {
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.users.token);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const loggedInUser = useSelector(state =>state.users.loggedInUser);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

    const [search, setSearch] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL_USERS;
    

    useEffect(() => {
        console.log("Token at mount: ", token);
        if (!token) {
            navigate('/');
            return;
        }

        axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            dispatch(getUser(res.data)); 
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.status === 403) {
                alert("Unauthorized. Please login again.");
                dispatch(clearToken());
                localStorage.removeItem("token");
                navigate("/");
            } else {
                alert("Error fetching contacts. Please try again later.");
            }
        });
    }, [dispatch, token, navigate]);

    const handleDelete = (id) => {
        if (!token) {
            console.error('No token available');
            return;
        }

        axios.delete(`${apiUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            dispatch(deleteUser({ id }));
            const totalPages = Math.ceil(users.length / postsPerPage);
            if (currentPage > totalPages) {
                setCurrentPage(totalPages);
            } else if (currentPosts.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        })
        .catch(err => console.error(err));
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch(clearToken());
        navigate('/');
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filteredUsers = users.filter(user =>
        user.fname.toLowerCase().includes(search.toLowerCase()) || 
        user.phone.toString().includes(search)
    );

    const displayedPosts = filteredUsers.slice(indexOfFirstPost, indexOfLastPost);

    return ( 
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-100 w-md-50 bg-white rounded p-3">
            {loggedInUser && (
                    <h2>Welcome, {loggedInUser.firstName}!</h2>
            )}
            <br></br>
                <Link to="/create" className="btn btn-success btn-sm mb-3">
                    Add+
                </Link>
                <Form>
                    <InputGroup className="my-3">
                        <Form.Control
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search contacts"
                        />
                    </InputGroup>
                </Form>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Company</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedPosts.length > 0 ? (
                                displayedPosts.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.fname}</td>
                                        <td>{user.lname}</td>
                                        <td>{user.address}</td>
                                        <td>{user.company}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <Link to={`/edit/${user.id}`} className="btn btn-sm btn-success me-2">Update</Link>
                                            <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No users available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination
                        totalPosts={users.length}
                        postsPerPage={postsPerPage}
                        paginate={paginate}
                    />
                </div>
                <button onClick={logout} className="btn btn-sm btn-danger mt-3">Logout</button>
            </div>
        </div>
    );
}

export default Users;
