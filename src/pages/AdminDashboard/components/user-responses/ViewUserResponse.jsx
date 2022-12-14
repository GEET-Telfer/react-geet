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

  const fetchAllUserResponse = async() => await axios.get(
    `${process.env.REACT_APP_HOST}/wp-json/user-response/v1/find-all`
  );
  const fetchMetaQuestion = async() => await axios.get(
    `${process.env.REACT_APP_HOST}/wp-json/admin/assessment/v1/find-all`
  );

  const exportType = "xls";
  const export2Excel = (data, fileName, exportType) => {  
    exportFromJSON({ data, fileName, exportType })
  }  

  useEffect(() => {
    fetchAllUserResponse().then((res) => {
      setUserResponse(res.data.data);
    }).catch(console.error);

    fetchMetaQuestion().then((res) => {
      setMetaQuestion(res.data.data);
    }).catch(console.error);
  }, []);

  return (
    <div>
      <Button className={"mb-3"}variant="primary" onClick={() => export2Excel(userResponse, "geet-user-response", exportType)}>Export User Response</Button>
      <br />
      <Button variant="primary" onClick={() => export2Excel(metaQuestion, "geet-meta-question", exportType)}>Export Meta Questions</Button>
    </div>
  );
}
