import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const courseStore = (set) => ({
  courseList: [],

  addCourse: (course) => {
    set((state) => ({
      courseList: [course, ...state.courseList],
    }));
  },

  removeCourse: (courseId) => {
    set((state) => ({
      courseList: state.courseList.filter((course) => course.id !== courseId),
    }));
  },

  toggleCourseStatus: (courseId) => {
    set((state) => ({
      courseList: state.courseList.map((course) =>
        course.id === courseId
          ? { ...course, status: !course.status }
          : course
      ),
    }));
  },
});

// Wrap with devtools and persist middleware
const useCourseStore = create(
  devtools(
    persist(courseStore, {
      name: 'course-storage', // localStorage key
    })
  )
);

export default useCourseStore;
