import {Link} from "react-router-dom"
import {useDispatch} from "react-redux";
import {loading} from "./redux/actions";

let Header = () => {
    const dispatch = useDispatch();

    return (
        <Link to="/">
        <div onClick={() => dispatch(loading())} className="bg-yellow-700" >
            <h1
            className="text-2xl p-4"
            >Search</h1>
        </div>
        </Link>
    );
}

export default Header;