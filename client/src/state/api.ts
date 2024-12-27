import { Project, SearchResults, Task, Team, User } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // required field
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  // Tên định danh reducer API này trong Redux store
  reducerPath: "api",
  // Danh sách các "tags" dùng để theo dõi dữ liệu và hỗ trợ các tính năng như cache hoặc invalidate (làm mới)
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  // Định nghĩa các endpoint API
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => "projects", // Tương ứng với API: GET /projects
      providesTags: ["Projects"], // Đánh dấu dữ liệu lấy về liên quan đến "Projects"
    }),
    // POST, PUT, DELETE (Các method thay đổi dữ liệu trên Server) là mutation
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects", // Tương ứng với API: POST /projects
        method: "POST",
        body: project,
      }),
      // Xác định tag nào sẽ bị invalidate (làm mới cache) sau khi mutation này được thực hiện
      // Giúp đồng bộ hóa dữ liệu
      invalidatesTags: ["Projects"],
    }),
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    getUserTasks: build.query<Task[], number>({
      query: (userId) => `tasks/user/${userId}`, // Tương ứng với API: GET /tasks/user/${userId}
      providesTags: (result, error, userId) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks", id }))
          : [{ type: "Tasks", id: userId }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useCreateTaskMutation,
  useGetTasksQuery,
  useGetUserTasksQuery,
  useUpdateTaskStatusMutation,
} = api;
