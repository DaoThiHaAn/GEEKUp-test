import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Title } from "react-head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import './user.css';
import '../table.css';
import '../loading.css';

interface AlbumType {
    id: number;
    title: string;
    userId: number;
}

interface UserType {
    id: number;
    name: string;
}

function Album() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [albums, setAlbums] = useState<AlbumType[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
       

        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);
    return (
        <>
            <Title>Album | Refine</Title>
            <h2>Albums</h2>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div> {/* Spinner animation */}
                </div>
            ) : (
                <>
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

                        </tbody>
                    </table>

                </>
            )}
        </>
    );
}

export default Album;