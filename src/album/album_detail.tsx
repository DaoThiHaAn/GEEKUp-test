import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Title } from "react-head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList, faEye } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import './album.css';

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

interface PhotoType {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

function AlbumDetails() {
    const { id } = useParams<{ id: string }>();
    const [album, setAlbum] = useState<AlbumType | null>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [photos, setPhotos] = useState<PhotoType[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalPhoto, setModalPhoto] = useState<PhotoType | null>(null); // State for modal

    useEffect(() => {
        const fetchAlbumAndUser = async () => {
            setLoading(true);
            try {
                // Fetch album details
                const albumResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/albums/${id}`
                );
                const albumData = await albumResponse.json();
                setAlbum(albumData);

                // Fetch user details based on album's userId
                const userResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${albumData.userId}`
                );
                const userData = await userResponse.json();
                setUser(userData);

                // Fetch photos for the album
                const photosResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
                );
                const photosData = await photosResponse.json();
                setPhotos(photosData);
            } catch (error) {
                console.error("Failed to fetch album, user, or photos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbumAndUser();
    }, [id]);

    // Close modal when Escape key is pressed
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setModalPhoto(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div> {/* Spinner animation */}
                </div>
            ) : album && user ? (
                <>
                <Title>Show Album | Refine</Title>
                <div className="nav-header">
                    <Link to="/albums" className="nav-btn">
                        <FontAwesomeIcon icon={faRectangleList} />
                        Albums
                    </Link>
                    <p> / &nbsp; Show</p>
                </div>

                <div className="back-btn">
                    <Link to="/albums">
                        <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
                    </Link>
                    <h2>Show Album</h2>
                </div>

                <section className="card">
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

                    <div className="album-info">
                        <h2>{album.title}</h2>

                        <div className="album-items">
                            {photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className="photo-item"
                                    onClick={() => setModalPhoto(photo)} // Open modal on click
                                >
                                    <img
                                        src={photo.thumbnailUrl}
                                        alt={photo.title}
                                        className="photo-thumbnail"
                                    />
                                    <div className="photo-overlay">
                                        <button className="preview-btn">
                                            <FontAwesomeIcon icon={faEye} />
                                            &nbsp;Preview</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Modal for full-size image */}
                {modalPhoto && (
                    <div className="modal" onClick={() => setModalPhoto(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <img src={modalPhoto.url} alt={modalPhoto.title} />
                        </div>
                    </div>
                )}
            </>
        ) : (
            <p>Album not found.</p>
        )}
        </>
    );
}

export default AlbumDetails;