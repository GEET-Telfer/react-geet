import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import exportFromJSON from 'export-from-json'  

/**
 * View and export user responses with meta question
 */
export default function ViewUserResponse() {
  const [userResponse, setUserResponse] = useState();
  const [metaQuestion, setMetaQuestion] = useState();
  useEffect(() => {
    const fetchAllUserResponse = axios.get(
      `${process.env.REACT_APP_HOST}/wp-json/user-response/v1/find-all`
    );
    const fetchMetaQuestion = axios.get(
      `${process.env.REACT_APP_HOST}/wp-json/assessment/v1/find-all`
    );

    axios
      .all([fetchAllUserResponse, fetchMetaQuestion])
      .then(
        axios.spread((resUserResponse, resMetaQuestion) => {
          setUserResponse(resUserResponse.data.data);
          setMetaQuestion(resMetaQuestion.data.data);
        })
      )
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const export2Excel = (data, fileName, exportType) => {  
    exportFromJSON({ data, fileName, exportType })  
  }  

  const exportType = 'xls';

  return (
    <div>
      <Button className={"mb-3"}variant="primary" onClick={() => export2Excel(userResponse, "geet-user-response", exportType)}>Export User Response</Button>
      <br />
      <Button variant="primary" onClick={() => export2Excel(metaQuestion, "geet-meta-question", exportType)}>Export Meta Questions</Button>
    </div>
  );
}
