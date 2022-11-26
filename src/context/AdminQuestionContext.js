import { createContext, useState } from "react";
import _ from "lodash";

export const AdminQuestionCtx = createContext();

export const AdminQuestionCtxProvider = ({ children }) => {
  
  const [needUpdate, setNeedUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
