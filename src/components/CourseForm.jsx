import React, { useState } from "react";
import useCourseStore from "../store/CourseStore";

const CourseForm = () => {
  const addCourse = useCourseStore((state) => state.addCourse);

  const [courseTitle, setcourseTitle] = useState();

  console.log("Hello");

  const handleCallSubmit = () => {
    if (!courseTitle) {
      alert("Please enter a course title");
      return;
    }

    addCourse({
      id: Date.now(),
      title: courseTitle,
      status: false,
    });
  };

  return (
    <div className="form-container">
      <input type="text" className="form-input" 
      value={courseTitle} 
      onChange={(e) => setcourseTitle(e.target.value)}

      />

        <button className="form-button" onClick={handleCallSubmit}>
            Add Course
        </button>
    </div>
  );
};

export default CourseForm;
