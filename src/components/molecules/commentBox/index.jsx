import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
  Avatar,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";

const CommentBox = ({ open, onClose, defaultComment }) => {

  const [comments, setComments] = useState([]);

  const [inputState, setInputState] = useState({
    commentText: defaultComment || "",
    replyText: "",
    editingCommentId: null,
    editedCommentText: "",
    selectedCommentId: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error", 
  });

  useEffect(() => {
    if (open) {
      setInputState((prev) => ({ ...prev, commentText: defaultComment || "" }));
    }
  }, [open, defaultComment]);

  const handleInputChange = (e, field) => {
    setInputState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddComment = () => {
    if (!inputState.commentText.trim()) {
      setSnackbar({
        open: true,
        message: "Please write a comment!",
        severity: "error",
      });
      return;
    }

    const newComment = {
      id: Date.now(),
      text: inputState.commentText,
      username: "developer",
      createdAt: new Date().toLocaleString(),
      replies: [],
    };
    setComments((prev) => [newComment, ...prev]);
    setInputState((prev) => ({ ...prev, commentText: "" }));
  };

  const handleAddReply = (commentId) => {
    if (!inputState.replyText.trim()) {
      setSnackbar({
        open: true,
        message: "Please write a reply!",
        severity: "error",
      });
      return;
    }

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  text: inputState.replyText,
                  username: "client",
                  createdAt: new Date().toLocaleString(),
                },
              ],
            }
          : comment
      )
    );
    setInputState((prev) => ({ ...prev, replyText: "", selectedCommentId: null }));
  };

  const handleSaveEdit = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, text: inputState.editedCommentText }
          : comment
      )
    );
    setInputState((prev) => ({
      ...prev,
      editingCommentId: null,
      editedCommentText: "",
    }));
  };

  const handleCancelEdit = () => {
    setInputState((prev) => ({ ...prev, editingCommentId: null, editedCommentText: "" }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add your Comment</DialogTitle>
      <DialogContent sx={{ bgcolor: "#f7f7f7", padding: 2 }}>
        <TextField
          multiline
          rows={2}
          fullWidth
          placeholder="Write your comment..."
          value={inputState.commentText}
          onChange={(e) => handleInputChange(e, "commentText")}
          sx={{
            borderRadius: 1,
            bgcolor: "#fff",
            boxShadow: 1,
            mb: 2,
            padding: 1,
          }}
        />
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="outlined" onClick={handleAddComment}>
            Post Comment
          </Button>
        </Box>

        <Box sx={{ maxHeight: 400, overflowY: "auto", mb: 3 }}>
          <Stack spacing={2}>
            {comments.map((comment) => (
              <Box key={comment.id} sx={{ position: "relative" }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "#1976d2" }}>A</Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {comment.username}
                    </Typography>
                    {inputState.editingCommentId === comment.id ? (
                      <>
                        <TextField
                          multiline
                          fullWidth
                          value={inputState.editedCommentText}
                          onChange={(e) => handleInputChange(e, "editedCommentText")}
                          sx={{ mt: 1 }}
                        />
                        <Box display="flex" justifyContent="flex-end" gap={1} mt={1}>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleSaveEdit(comment.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                          {comment.text}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                          {comment.createdAt}
                        </Typography>
                      </>
                    )}
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setInputState((prev) => ({
                          ...prev,
                          selectedCommentId:
                            prev.selectedCommentId === comment.id ? null : comment.id,
                        }))
                      }
                      aria-label="Reply"
                    >
                      <ReplyIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setInputState((prev) => ({
                          ...prev,
                          editingCommentId: comment.id,
                          editedCommentText: comment.text,
                        }));
                      }}
                      aria-label="Edit"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <Box sx={{ mt: 2, ml: 4 }}>
                    {comment.replies.map((reply, idx) => (
                      <Box key={idx} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "#90caf9" }}>R</Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {reply.username}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                            {reply.text}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                            {reply.createdAt}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Reply Input */}
                {inputState.selectedCommentId === comment.id && (
                  <Box sx={{ mt: 2, ml: 4 }}>
                    <TextField
                      multiline
                      rows={2}
                      fullWidth
                      placeholder="Write a reply..."
                      value={inputState.replyText}
                      onChange={(e) => handleInputChange(e, "replyText")}
                      sx={{
                        bgcolor: "#fff",
                        borderRadius: 1,
                        boxShadow: 1,
                        padding: 1,
                      }}
                    />
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleAddReply(comment.id)}
                      >
                        Reply
                      </Button>
                    </Box>
                  </Box>
                )}

                <Divider sx={{ mt: 3 }} />
              </Box>
            ))}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default CommentBox;
