import { useParams } from "react-router-dom"
import { Title } from "react-head"


function User() {
    const { userId } = useParams<{userId: string}>();
    return (
        <>
            <Title>User Profile | Refine</Title>
            <h2>User Profile</h2>
            <p>This is the user profile page for {userId}.</p>
        </>
    )
}

export default User