import { useParams } from "react-router-dom";
import { Title } from "react-head";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './album.css';


function Album() {
    const [searchParams, setSearchParams] = useSearchParams();

  // Get query parameters
    const pageSize = searchParams.get('pageSize') || 20; // Default to 20
    const currentPage = searchParams.get('current') || 1; // Default to 1

    useEffect(() => {
        const fetchAlbums = async () => {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/albums?_limit=${pageSize}&_page=${currentPage}`
            );
            const data = await response.json();
            setAlbums(data);
        };

        fetchAlbums();
    }, [pageSize, currentPage]);

    // update url
    const handlePageChange = (newPage: number) => {
        setSearchParams({ pageSize, current: newPage.toString() });
    };
    return (
        <>
            <Title>Album | Refine</Title>
            <h2>Albums</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </>
    );
}

export default Album;