import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "./redux/userSlice";
import { Link } from "react-router-dom";


function Users() {
    
    const users= useSelector(state=> state.users.users)
    const dispatch=useDispatch();

    const handleDelete=(id)=>{
        axios.delete(`http://localhost:9000/users/${id}`)
        .then(res =>{
            dispatch(deleteUser({id}))
            console.log(useSelector(state=> state.users.users))
        }).catch(err=>console.log(err))
    }
    

    return ( 
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-100 w-md-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success btn-sm mb-3">
                    Add+
                </Link>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user =>{
                                    return <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <Link to={`/edit/${user.id}`} className="btn btn-sm btn-success me-2">Update</Link>
                                            <button onClick={()=>handleDelete(user.id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users ;