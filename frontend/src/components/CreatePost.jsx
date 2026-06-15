import { useState } from "react";
import api from "../services/api";
import "../css/CreatePost.css";

function CreatePost({ fetchPosts }) {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!message.trim() && !image) {
            return alert(
                "Add text or image"
            );
        }

        const formData = new FormData();

        formData.append(
            "message",
            message
        );

        if (image) {
            formData.append(
                "image",
                image
            );
        }

        try {

            setLoading(true);

            await api.post(
                "/",
                formData
            );

            setMessage("");
            setImage(null);

            fetchPosts();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to create post"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="create-post-card">

            <form
                className="create-post-form"
                onSubmit={submitHandler}
            >

                <textarea
                    className="post-textarea"
                    placeholder="What's on your mind?"
                    value={message}
                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }
                />

                <input
                    className="post-file-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setImage(
                            e.target.files[0]
                        )
                    }
                />

                {image && (
                    <img
                        className="preview-image"
                        src={URL.createObjectURL(image)}
                        alt="preview"
                    />
                )}

                <button
                    type="submit"
                    className="post-submit-btn"
                    disabled={loading}
                >
                    {
                        loading
                            ? "Posting..."
                            : "Create Post"
                    }
                </button>

            </form>

        </div>
    );
}

export default CreatePost;