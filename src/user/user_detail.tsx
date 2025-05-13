import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";


function UserDetail() {
    return (
        <>
        <div className="nav-bar">
            <button>
                <FontAwesomeIcon icon={faAddressCard} />
                Users
            </button>
            <p>/</p>
            <p>Show</p>
        </div>

        <div className="header">
            

        </div>
        </>
    );
}

export default UserDetail;