import Post from "../models/post.js";
import cloudinary from "../config/cloudinary.js";

export const createPost = async (req, res) => {
    try {

        const { message } = req.body;

        let imageData = {};

        if (
            !message?.trim() &&
            !req.file
        ) {
            return res.status(400).json({
                message:
                    "Post must contain text or image"
            });
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "social_posts"
                }
            );

            imageData = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        const post = await Post.create({
            user: req.user.id,
            message,
            image: imageData
        });

        res.status(201).json({
            success: true,
            post
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const alreadyLiked = post.likes.includes(req.user.id);

        if (alreadyLiked) {
            post.likes.pull(req.user.id);

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Post unliked"
            });
        }

        post.likes.push(req.user.id);

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post liked"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        post.comments.push({
            user: req.user.id,
            text
        });

        await post.save();

        res.status(200).json({
            success: true,
            message: "Comment added"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const comment = post.comments.id(req.params.commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        comment.deleteOne();

        await post.save();

        res.status(200).json({
            success: true,
            message: "Comment deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getAllPosts = async (req, res) => {
    try {

        const page =
            Number(req.query.page) || 1;

        const limit = 5;

        const skip =
            (page - 1) * limit;

        const totalPosts =
            await Post.countDocuments();

        const posts =
            await Post.find()
                .populate("user", "name")
                .populate(
                    "comments.user",
                    "name"
                )
                .populate(
                    "likes",
                    "name"
                )
                .sort({
                    createdAt: -1
                })
                .skip(skip)
                .limit(limit);

        res.status(200).json({
            success: true,
            posts,
            currentPage: page,
            totalPages:
                Math.ceil(
                    totalPosts / limit
                )
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await post.deleteOne();

        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};