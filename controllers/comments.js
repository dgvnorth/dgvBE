const {
  createComment,
  fetchComments,
  updateCommentVotes
} = require("../models/comments");

exports.addCommentByArticleId = (req, res, next) => {
  const comment = req.body;
  const { article_id } = req.params;
  createComment(article_id, comment)
    .then(([addedComment]) => {
      if (!addedComment.body)
        return Promise.reject({ status: 404, message: "comment not found" });
      res.status(201).send({ comment: addedComment });
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchComments(article_id)
    .then(comments => {
      if (comments.length === 0)
        return Promise.reject({ status: 404, message: "article not found" });
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const increment = req.body.inc_votes;
  const { comment_id } = req.params;
  console.log(comment_id);
  updateCommentVotes(comment_id, increment)
    .then(([comment]) => {
      if (!comment)
        return Promise.reject({ status: 404, message: "comment_id not found" });
      res.status(200).send({ comment });
    })
    .catch(next);
};
