const Post = require('../../models/Post');
const isAuthenticated = require('../../middleware/isAuthenticated');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        getPost: async (parent, args, context, info) => {
            const { id } = args;
            // get post by id
            try {
                return await Post.findById({ _id: id });
            } catch (error) {
                throw new Error(error.message);
            }
        },
        getPosts: async (parent, args, context, info) => {
            // get all posts
            try {
                return await Post.find({});
            } catch (error) {
                throw new Error(error.message);
            }
        }
    },
    Mutation: {
        createPost: async (parent, args, context, info) => {
            const { content } = args;
            // check if user authenticated
            const user = isAuthenticated(context);

            try {
                if (content.trim().length === 0) {
                    throw new Error('Content must not be empty');
                }
                // create new post
                const post = new Post({
                    content,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                    updatedAt: null
                });

                const newPost = await post.save();

                return { ...newPost._doc, id: newPost._id };
            } catch (error) {
                throw new Error(error.message);
            }
        },
        deletePost: async (parent, args, context, info) => {
            const { id } = args;
            // check auth
            const user = isAuthenticated(context);
            try {
                const post = await Post.findById({ _id: id });
                if (user.username === post.username) {
                    await post.delete();
                    return 'Action completed';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        updatePost: async (parent, args, context, info) => {
            const { id, content } = args;
            // check auth
            const user = isAuthenticated(context);

            if (content.trim().length === 0) {
                throw new UserInputError('Content must not be empty');
            }
            try {
                if (user) {
                    const post = await Post.findById({ _id: id });
                    if (!post) {
                        throw new Error('Could not find a post with that id');
                    }
                    // update post
                    post.content = content;
                    post.updatedAt = new Date().toISOString();
                    // save updated post
                    const updatedPost = await post.save();

                    return { ...updatedPost._doc, id: updatedPost._id };
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        likePost: async (parent, args, context, info) => {
            const { id } = args;
            const user = isAuthenticated(context);

            try {
                const post = await Post.findById({ _id: id });

                if (post) {
                    const isLiked = post.likes.find(like => like.username === user.username);
                    // check if post is already liked
                    if (isLiked) {
                        // unlike
                        post.likes = post.likes.filter(like => like.username !== user.username);
                    } else {
                        // like
                        post.likes.push({ username: user.username });
                    }
                    await post.save();
                    return post;
                } else {
                    throw new UserInputError('No post found with that id');
                }
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
};