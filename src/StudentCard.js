import "./StudentCard.css";
import { useEffect, useState } from "react";
const StudentCard = (props) => {
  const [grades, setGrades] = useState([]);
  const [id, setID] = useState(null);
  const [avgGrade, setAvgGrade] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [img, setImg] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [skill, setSkill] = useState("");
  const [showGrades, setShowGrades] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setGrades(buildGrades(props.grades));
    setAvgGrade(calcAvgGrade(props.grades));
    setID(props.id);
    setFirstName(props.firstName);
    setLastName(props.lastName);
    setImg(props.img);
    setCompany(props.company);
    setEmail(props.email);
    setSkill(props.skill);
    setTags(props.tags);
  }, [props]);

  const calcAvgGrade = (propGrades) => {
    let total = 0;
    for (let grade of propGrades) {
      total += parseInt(grade);
    }
    return total / propGrades.length;
  };

  const buildGrades = (propGrades) => {
    let builtGrades = [];
    for (let i = 0; i < propGrades.length; i++) {
      builtGrades.push(
        <div key={i} className="grade">
          {"Test " + (i + 1) + ":"}
          <span className="grade-point">{propGrades[i] + "%"}</span>
        </div>
      );
    }
    return builtGrades;
  };

  const handleClick = () => {
    setShowGrades(!showGrades);
  };

  const handleTagEnter = (event) => {
    if (
      event.key === "Enter" &&
      event.target.value.length > 0 &&
      event.target.value[0] !== " "
    ) {
      setTags([...tags, tagInput]);
      props.setTags(id, [...tags, tagInput], );
      setTagInput("");
    }
  };

  const buildTags = () => {
      console.log(tags);
      let builtTags = []
      tags.map(tag => {
        builtTags.push(<div className="tag">{tag}</div>);
    })
    return builtTags;
  };

  return (
    <div className="student-card">
      <div className="row">
        <div className="student-left">
          <img src={img} width="100%" className="student-img"></img>
        </div>
        <div className="student-info col">
          <div className="name">
            {(firstName + " " + lastName).toLocaleUpperCase()}
          </div>
          <div className="sub-info">
            <div className="email">Email: {email}</div>
            <div className="company">Company: {company}</div>
            <div className="skill">Skill: {skill}</div>
            <div className="avg-grade">Average: {avgGrade.toFixed(2)} %</div>
            <div className={(showGrades ? "open" : "closed") + " grades col"}>
              {grades}
            </div>
            <div className="tag-search">
              <div className="tags">{tags ? buildTags() : null}</div>
              <input
                type="text"
                onChange={(event) => {
                  setTagInput(event.target.value);
                }}
                value={tagInput}
                onKeyPress={handleTagEnter}
                placeholder="Add tag"
              ></input>
            </div>
          </div>
        </div>
        <div className="col">
          <button onClick={handleClick} className="expand-button">
            {showGrades ? "-" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
