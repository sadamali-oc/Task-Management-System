import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      developers: [],

      // Create a new task
      createTask: (newTask) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { ...newTask, comments: [] }, 
          ],
        })),

      // Assign developer to task
      assignDeveloper: (taskId, developerId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            String(task.id) === String(taskId)
              ? { ...task, assigned_to: developerId } // only store the ID
              : task
          ),
        })),
      
      

      // Update task status
      updateStatus: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            String(task.id) === String(taskId)
              ? { ...task, status: newStatus }
              : task
          ),
        })),

      // Update task comments
      updateTaskComment: (taskId, commentText) =>
        set((state) => {
          const updatedTasks = state.tasks.map((task) => {
            if (String(task.id) === String(taskId)) {
              const newComment = {
                id: `comment-${Date.now()}`, // Ensure each comment has a unique id
                user: "developer",
                text: commentText,
                replies: [],
              };
              const updatedComments = [...(task.comments || []), newComment];
              return { ...task, comments: updatedComments };
            }
            return task;
          });
          return { tasks: updatedTasks };
        }),

      // Add reply to a comment
      addReply: (taskId, commentId, replyText) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (String(task.id) === String(taskId)) {
              const updatedComments = (task.comments || []).map((comment) =>
                String(comment.id) === String(commentId)
                  ? {
                      ...comment,
                      replies: [
                        ...(comment.replies || []),
                        { user: "client", text: replyText },
                      ],
                    }
                  : comment
              );
              return { ...task, comments: updatedComments };
            }
            return task;
          }),
        })),
    }),
    {
      name: "task-storage", // Key in localStorage for persistence
    }
  )
);

export default useTaskStore;
