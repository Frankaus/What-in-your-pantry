import { useState, useEffect } from "react";
import {uploadComment, getComments} from "./redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";

const Comments = (props) => {
    const dispatch = useDispatch();
    
    const recipeId = props.id;
    console.log(recipeId);
    const [comment, setComment] = useState({ recipeId: recipeId });
    const [reload, setReload] = useState(false)

    const comments = useSelector(state => state.comments);

    let handleChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
        });

    };

    useEffect(() => {
        dispatch(getComments(recipeId));
    }, [reload]);

    return (
        <div className="bg-white">
            <div className="text-4xl font-semibold p-4 text-gray-600 text-center">
                <h1>Reviews & Local Adaptation</h1>
            </div>
            <div>
                {/* FORM */}
                <div>
                    <h1 className="text-xl font-semibold px-4 text-gray-600">
                        Do you have your personal version of that recipe? Please
                        tell us about it.
                    </h1>
                </div>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <span className="block text-gray-700 text-sm font-bold mb-2">
                            Leave us your email:
                        </span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => handleChange(e)}
                            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 text-sm font-bold mb-2">
                            Give it a title:
                        </span>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={(e) => handleChange(e)}
                            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 text-sm font-bold mb-2">
                            You may tell us where it is from:
                        </span>
                        <input
                            type="text"
                            name="country"
                            placeholder="Country (optional)"
                            onChange={(e) => handleChange(e)}
                            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700 text-sm font-bold mb-2">
                            We're all hear:
                        </span>
                        <textarea
                            type="text"
                            name="text"
                            placeholder="Tell us all about it"
                            onChange={(e) => handleChange(e)}
                            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        className="bg-yellow-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => {
                            dispatch(uploadComment(comment));
                            setReload(!reload);
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
            {/* COMMENTS */}
            {!!comments.length &&
                comments.map((elem, index) => {
                    let date = new Date(elem.created_at);
                    return (
                        <motion.div
                            key={index}
                            className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            initial={{x: '-100vw'}}
                            animate={{x: 0}}
                            transition={{delay: 2, type: 'spring', stiffness: 200, duration: 2}}
                        >
                            <div className="mb-2">
                                <span className="text-gray-700 font-bold">
                                    Email:{" "}
                                </span>
                                <span>{elem.email}</span>
                            </div>
                            {elem.country && (
                                <div className="mb-2">
                                    <span className="text-gray-700 font-bold">
                                        From:{" "}
                                    </span>
                                    <span>{elem.country}</span>
                                </div>
                            )}
                            <div className="mb-2">
                                <span className="text-gray-700 font-bold">
                                    Title:{" "}
                                </span>
                                <span>{elem.title}</span>
                            </div>
                            <div className="mb-2">
                                <span>{elem.text}</span>
                            </div>
                            <div className="mb-2">
                                <span>
                                    Posted on the {date.toLocaleDateString()}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
        </div>
    );
};

export default Comments;
