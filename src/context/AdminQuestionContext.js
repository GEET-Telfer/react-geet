import { createContext, useState } from "react";

export const AdminQuestionCtx = createContext();

export const AdminQuestionCtxProvider = ({ children }) => {
  
  const [needUpdate, setNeedUpdate] = useState(false); // flag for calling re-rendering assessment questions
  const [showDelete, setShowDelete] = useState(false); // toggle toast on successful deleting a question
  const [showEdit, setShowEdit] = useState(false); // toggle toast on successful updating a question

  return (
    <AdminQuestionCtx.Provider
      value={{
        needUpdate,
        setNeedUpdate,
        showDelete,
        setShowDelete,
        showEdit,
        setShowEdit,
      }}
    >
      {" "}
      {children}
    </AdminQuestionCtx.Provider>
  );
};
