const BASE_URL = "http://localhost:8080/api/students";

// GET all students
export const getAllStudents = async () => {
  const response = await fetch(BASE_URL);
  
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return await response.json();
};

// GET student by ID
export const getStudentById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Student not found");
  }

  return await response.json();
};

// ADD student (POST)
export const addStudent = async (student) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  });

  if (!response.ok) {
    throw new Error("Failed to add student");
  }

  return await response.json();
};