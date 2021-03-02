import { useState, useEffect } from "react";
import {uploadComment, getComments} from "./redux/actions";
import {useDispatch, useSelector} from "react-redux";

const Comments = (props) => {
    const recipeId = props.match.params.id;
    const dispatch = useDispatch();
    const [comment, setComment] = useState({ recipeId: recipeId });
    console.log("id in comment: ", recipeId);

    const comments = useSelector(state => state.comments);

    let handleChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
        });

    };

    useEffect(() => {
        dispatch(getComments(recipeId));
    }, [comments]);

    return (
        <div>
            <div>
                {/* FORM */}
                <div>
                    <h1>
                        Do you have your personal version of that recipe? Please
                        tell use about it.
                    </h1>
                </div>
                <div>
                    <span>Leave us your email</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <span>Give it a title</span>
                    <input
                        type="text"
                        name="title"
                        placeholder="Give it a title"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <span>You may tell us where it is from (optional)</span>
                    <input
                        type="text"
                        name="country"
                        placeholder="Country (optional)"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <span>We're all hear:</span>
                    <textarea
                        type="text"
                        name="text"
                        placeholder="Tell us all about it"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button onClick={() => dispatch(uploadComment(comment))}>Submit</button>
            </div>
            {/* COMMENTS */}
            {!!comments.length && comments.map((elem, index) => {
                return (
                    <div>
                        <div>
                            <span>{elem.email}</span>
                        </div>
                        {elem.country && (
                            <div>
                                <span>From {elem.country}</span>
                            </div>
                        )}
                        <div>
                            <span>{elem.title}</span>
                        </div>
                        <div>
                            <span>{elem.text}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Comments;
