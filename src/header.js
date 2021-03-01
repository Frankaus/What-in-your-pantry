import {Link} from "react-router-dom"

let Header = () => {


    return (
        <Link to="/">
        <div className="bg-yellow-700" >
            <h1
            className="text-2xl p-4"
            >Search</h1>
        </div>
        </Link>
    );
}

export default Header;