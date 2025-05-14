import { useEffect, useState } from "react";
import { Title } from "react-head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import './user.css';
import '../table.css';
import '../loading.css';

interface UserType {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

function User() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <Title>User | Refine</Title>
            <h2>User</h2>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <table>
                    <thead className="tb-header">
                        <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                                        alt={`${user.name}'s avatar`}
                                        style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                                    />
                                </td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    <a href={`tel:${user.phone}`} target="_blank" rel="noopener noreferrer">
                                        {user.phone}
                                    </a>
                                </td>
                                <td>
                                    <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                                        {user.website}
                                    </a>
                                </td>
                                <td>
                                    <button
                                        className="action-btn"
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                        Show
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default User;
