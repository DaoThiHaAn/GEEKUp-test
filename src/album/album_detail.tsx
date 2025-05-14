import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface AlbumType {
    id: number;
    title: string;
    userId: number;
}

function AlbumDetails() {
    const { id } = useParams<{ id: string }>();
    const [album, setAlbum] = useState<AlbumType | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAlbum = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/albums/${id}`
                );
                const data = await response.json();
                setAlbum(data);
            } catch (error) {
                console.error("Failed to fetch album:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbum();
    }, [id]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : album ? (
                <>
                    <h2>Album Details</h2>
                    <p><strong>ID:</strong> {album.id}</p>
                    <p><strong>Title:</strong> {album.title}</p>
                    <p><strong>User ID:</strong> {album.userId}</p>
                </>
            ) : (
                <p>Album not found.</p>
            )}
        </div>
    );
}

export default AlbumDetails;