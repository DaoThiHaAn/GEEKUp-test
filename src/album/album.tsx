import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Title } from "react-head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './album.css';
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

    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const currentPage = parseInt(searchParams.get('current') || '1');
    const totalAlbums = 100; // Assuming a total of 100 albums (replace with actual total if available)
    const totalPages = Math.ceil(totalAlbums / pageSize);

    const [startPage, setStartPage] = useState(1); // Tracks the start of the visible page range

    useEffect(() => {
        // Set default query parameters if not present
        if (!searchParams.get('pageSize') || !searchParams.get('current')) {
            setSearchParams({ pageSize: '20', current: '1' });
        }
    }, [searchParams, setSearchParams]);

    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/albums?_limit=${pageSize}&_page=${currentPage}`
                );
                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                console.error("Failed to fetch albums:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchAlbums();
        fetchUsers();
    }, [pageSize, currentPage]);

    const handlePageChange = (newPage: number) => {
        setSearchParams({ pageSize: pageSize.toString(), current: newPage.toString() });
    };

    const handleViewClick = (albumId: number) => {
        navigate(`/albums/${albumId}`); // Navigate to the album details page
    };

    const getUserById = (userId: number) => {
        return users.find((user) => user.id === userId);
    };

    const handleNextPageSet = () => {
        setStartPage((prev) => Math.min(prev + 5, totalPages - 5));
    };

    const handlePreviousPageSet = () => {
        setStartPage((prev) => Math.max(prev - 5, 1));
    };

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
                                <th>Title</th>
                                <th>User</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {albums.map((album) => {
                                const user = getUserById(album.userId);
                                const avatarUrl = user
                                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                          user.name
                                      )}&background=random`
                                    : '';
                                return (
                                    <tr key={album.id}>
                                        <td>{album.id}</td>
                                        <td className="title-cell">{album.title}</td>
                                        <td className="user-cell">
                                            {user ? (
                                                <div className="user-info">
                                                    <img
                                                        src={avatarUrl}
                                                        alt={user.name}
                                                        className="avatar"
                                                    />
                                                    <span>
                                                        <Link to={`/users/${user.id}`}>
                                                        {user.name}
                                                        </Link>
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="spinner-container">
                                                    <div className="spinner"></div> {/* Spinner animation */}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="action-btn"
                                                onClick={() => handleViewClick(album.id)}
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                                Show
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="pagination-filter">
                        <button
                            className="direct-btn"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        {/* Pagination logic */}
                        {startPage > 1 && (
                            <button
                                className="page-btn"
                                onClick={handlePreviousPageSet}
                                onMouseEnter={() => setStartPage(startPage - 5)}
                            >
                                ...
                            </button>
                        )}

                        {Array.from({ length: Math.min(5, totalPages - startPage + 1) }, (_, index) => {
                            const page = startPage + index;
                            return (
                                <button
                                    key={page}
                                    className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        {startPage + 5 <= totalPages && (
                            <button
                                className="page-btn"
                                onClick={handleNextPageSet}
                                onMouseEnter={() => setStartPage(startPage + 5)}
                            >
                                ...
                            </button>
                        )}

                        <button
                            className="direct-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>

                        <select
                            value={pageSize}
                            onChange={(e) =>
                                setSearchParams({ pageSize: e.target.value, current: '1' })
                            }
                        >
                            <option value={10}>10 / page</option>
                            <option value={20}>20 / page</option>
                            <option value={50}>50 / page</option>
                            <option value={100}>100 / page</option>
                        </select>
                    </div>
                </>
            )}
        </>
    );
}

export default Album;