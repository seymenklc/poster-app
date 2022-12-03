const { UserInputError } = require("apollo-server");
const isAuthenticated = require("../../middleware/isAuthenticated");
const Post = require("../../models/Post");

module.exports = {
    Mutation: {
        createComment: async (parent, args, context, info) => {
            const { id, content } = args;
            const user = isAuthenticated(context);

            if (content.trim().length === 0) {
                throw new UserInputError('Comment content must not be empty');
            }

            try {
                const post = await Post.findById({ _id: id });
                if (post) {
                    // add new comment to the beginning of the comments array
                    post.comments.unshift({
                        content,
                        username: user.username,
                        createdAt: new Date().toISOString()
                    });
                    await post.save();
                    return post;
                } else {
                    throw new UserInputError('No post found with that id');
                }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        deleteComment: async (parent, args, context, info) => {
            const { id, commentId } = args;
            const user = isAuthenticated(context);
            try {
                const post = await Post.findById({ _id: id });

                if (post) {
                    const comments = post.comments;
                    const commentIdx = comments.findIndex(c => c.id === commentId);
                    // check if the delete request is equal to comment owner
                    if (user.username === comments[commentIdx].username) {
                        post.comments.splice(commentIdx, 1);

                        await post.save();
                        return 'Action Completed';
                    }
                } else {
                    throw new UserInputError('No comment found with that id');
                }
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
};