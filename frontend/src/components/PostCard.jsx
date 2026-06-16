import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import api from "../services/api";
import "../css/PostCard.css";

function PostCard({ post, fetchPosts }) {

    const [showComments, setShowComments] =
        useState(false);

    const [comment, setComment] =
        useState("");

    const likeHandler = async () => {
        try {
            await api.put(
                `/${post._id}/like`
            );

            fetchPosts();

        } catch (error) {
            console.log(error);
        }
    };

    const commentHandler = async () => {

        if (!comment.trim()) return;

        try {

            await api.post(
                `/${post._id}/comment`,
                {
                    text: comment
                }
            );

            setComment("");

            fetchPosts();

        } catch (error) {
            console.log(error);
        }
    };

    const latestComment =
        post?.comments?.[
        post?.comments?.length - 1
        ];

    return (
        <div className="post-card">

            <div className="post-header">

                <div className="avatar">
                    {post.user?.name?.charAt(0).toUpperCase()}
                </div>

                <div className="user-info">

                    <h3>{post?.user?.name}</h3>

                    <p className="post-time">
                        {formatDistanceToNow(
                            new Date(post.createdAt),
                            { addSuffix: true }
                        )}
                    </p>

                </div>

            </div>

            {post?.message && (
                <p className="post-message">
                    {post?.message}
                </p>
            )}

            {post?.image?.url && (
                <img
                    className="post-image"
                    src={post?.image?.url}
                    alt="post"
                />
            )}

            <div className="post-actions">

                <button
                    className="like-btn"
                    onClick={likeHandler}
                >
                    👍 {post?.likes?.length}

                </button>


                <span
                    className="comment-count"
                    onClick={() =>
                        setShowComments(
                            !showComments
                        )
                    }
                >
                    💬 {post?.comments?.length}
                    {" "}
                    Comments
                </span>

            </div>
            {post?.likes?.length > 0 && (
                <div className="likes-list">

                    ❤️ Liked by{" "}

                    {post?.likes
                        .slice(0, 3)
                        .map((user) => user.name)
                        .join(", ")}

                    {post?.likes.length > 3 &&
                        ` and ${post?.likes.length - 3
                        } others`}
                </div>
            )}

            <div className="comment-box">

                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) =>
                        setComment(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={commentHandler}
                >
                    Comment
                </button>

            </div>

            {!showComments &&
                latestComment && (

                    <div className="comment latest-comment">

                        <strong>
                            {latestComment.user?.name}
                        </strong>

                        : {latestComment.text}

                    </div>
                )}

            {showComments && (

                <div className="comments">

                    {post.comments.map(
                        (comment) => (

                            <div
                                key={comment._id}
                                className="comment"
                            >
                                <strong>
                                    {comment.user?.name}
                                </strong>

                                : {comment.text}
                            </div>
                        ))}
                </div>
            )}



        </div>
    );
}

export default PostCard;