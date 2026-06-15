import { useEffect, useState } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
import "../css/Feed.css";

function Feed() {

    const [posts, setPosts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const fetchPosts = async (
        pageNumber = 1
    ) => {

        try {

            setLoading(true);

            const { data } =
                await api.get(
                    `/?page=${pageNumber}`
                );

            setPosts(data.posts);

            setTotalPages(
                data.totalPages
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loader">
                Loading Posts...
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="feed-container">

                <CreatePost
                    fetchPosts={() =>
                        fetchPosts(page)
                    }
                />

                <div className="posts-container">

                    {posts.length > 0 ? (

                        posts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                                fetchPosts={() =>
                                    fetchPosts(page)
                                }
                            />
                        ))

                    ) : (

                        <div className="empty-feed">
                            No Posts Yet
                            <br />
                            Create your first post.
                        </div>

                    )}

                </div>

                {totalPages > 1 && (

                    <div className="pagination">

                        <button
                            disabled={
                                page === 1
                            }
                            onClick={() =>
                                setPage(
                                    page - 1
                                )
                            }
                        >
                            Previous
                        </button>

                        <span>
                            Page {page} of{" "}
                            {totalPages}
                        </span>

                        <button
                            disabled={
                                page ===
                                totalPages
                            }
                            onClick={() =>
                                setPage(
                                    page + 1
                                )
                            }
                        >
                            Next
                        </button>

                    </div>

                )}

            </div>
        </>
    );
}

export default Feed;