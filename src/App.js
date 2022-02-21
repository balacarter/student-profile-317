import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import StudentCard from "./StudentCard";

import "./App.css";
import { fil } from "date-fns/locale";

function App() {
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("Loading");
  const [searchText, setSearchText] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const fetchData = async () => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then(function (response) {
        let students = response.data.students.map((stu) => ({
          ...stu,
          tags: [],
        }));
        setData(students);
        setFilteredList(students);
      })
      .catch(function (error) {
        setError(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const buildStudent = (student) => {
    return (
      <StudentCard
        key={student.id}
        id={student.id}
        firstName={student.firstName}
        lastName={student.lastName}
        grades={student.grades}
        img={student.pic}
        company={student.company}
        email={student.email}
        skill={student.skill}
        tags={student.tags}
        setTags={setStudentTags}
      />
    );
  };

  const buildStudents = (studentList) => {
    return studentList.map((student) => {
      return buildStudent(student);
    });
  };

  const setStudentTags = (studentID, tags) => {
    data
      .filter((stu) => stu.id === studentID)
      .map((filteredStu) => (filteredStu.tags = tags));
    console.log(data);
  };

  const handleInputChange = (event) => {
    searchStudents();
    setSearchText(event.target.value);
  };
  const handleTagsInput = (event) => {
    searchStudents();
    setTagsText(event.target.value);
  };

  const searchName = (list) => {
    let filtered = [];
    list
      .filter(
        (student) =>
          student.firstName
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          student.lastName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      )
      .map((filteredStudent) => filtered.push(filteredStudent));
    return filtered;
  };

  const searchTags = (list) => {
    let filtered = [];
    list
      .filter((student) =>
        student.tags.toString().includes(tagsText.toLocaleLowerCase())
      )
      .map((filteredStudent) => filtered.push(filteredStudent));
    return filtered;
  };

  const searchStudents = () => {
    let list = data;
    if (searchText) {
      list = searchName(list);
    }
    if (tagsText) {
      list = searchTags(list);
    }
    return list;
  };

  return (
    <div className="app">
      <div className="search-bars">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="Search by name"
        />
        <input
          type="text"
          value={tagsText}
          onChange={handleTagsInput}
          placeholder="Search by tags"
        />
      </div>
      <div>{data ? buildStudents(searchStudents()) : "No data"}</div>
    </div>
  );
}

export default App;
