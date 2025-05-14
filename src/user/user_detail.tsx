import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Title } from "react-head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faEye } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import './user.css';

interface AlbumType {
    id: number;
    title: string;
    userId: number;
}

interface UserType {
    id: number;
    name: string;
    email: string;
}

function UserDetail() {
    const { id } = useParams<{ id: string }>(); // Get user ID from URL
    const [user, setUser] = useState<UserType | null>(null); // State for user details
    const [albums, setAlbums] = useState<AlbumType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAndAlbums = async () => {
            setLoading(true);
            try {
                // Fetch user details
                const userResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${id}`
                );
                const userData = await userResponse.json();
                setUser(userData);

                // Fetch albums for the user
                const albumsResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/albums?userId=${id}`
                );
                const albumsData = await albumsResponse.json();
                setAlbums(albumsData);
            } catch (error) {
                console.error("Failed to fetch user or albums:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndAlbums();
    }, [id]);

    return (
        <>
            <Title>Show User | Refine</Title>
            <div className="nav-header">
                <Link to="/users" className="nav-btn">
                    <FontAwesomeIcon icon={faAddressCard} />
                    User
                </Link>
                <p> / &nbsp; Show</p>
            </div>

            <div className="back-btn">
                <Link to="/users">
                    <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
                </Link>
                <h2>Show User</h2>
            </div>

            <section className="card">
                {loading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                ) : user ? (
                    <>
                        <div className="album-user-info">
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user.name
                                )}&background=random`}
                                alt={user.name}
                                className="avatar"
                            />
                            <div className="avatar-name">
                                <p>{user.name}</p>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </div>
                        </div>

                        <hr></hr>

                        <h2>Albums</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {albums.map(album => (
                                    <tr key={album.id}>
                                        <td>{album.id}</td>
                                        <td className="album-title">{album.title}</td>
                                        <td>
                                            <Link to={`/albums/${album.id}`} className="action-btn">
                                                <FontAwesomeIcon icon={faEye} />
                                                Show
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p>User not found.</p>
                )}
            </section>
        </>
    );
}

export default UserDetail;