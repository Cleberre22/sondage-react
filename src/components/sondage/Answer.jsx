import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



const Answer = (props) => {
    // const question = {question};
    const [answers, setAnswer] = useState([]);
   
    useEffect(() => {;
        displayAnswer();
      }, []);

    const displayAnswer = async () => {
        await axios.get(`http://localhost:8000/api/answer-question/${props.question.id}`).then((res) => {
          setAnswer(res.data);
          
        });
      };
console.log(answers)
    return (
        <div>
            {answers.map((answer) =>


                    // <div>{answer.questions_id}, {question.id}</div>
                    <div key={answer.id}>{answer.nameAnswer}</div>
                  
                  
                )}
          
        </div>
    );
};

export default Answer;