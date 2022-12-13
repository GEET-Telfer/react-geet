import { createContext, useState } from "react";
import _ from 'lodash';

export const ProgressCtx = createContext();

export const ProgressCtxProvider = ({ children }) => {
  const key = "assessment-progress";

  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem(key)) || {}
  );

  /**
   * update both the progress state and LocalStorage
   */
  const updateProgress = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem(key, JSON.stringify(newProgress));
  };

  /**
   * Add item to progress state and LocalStorage, if exists, update the item.
   */
  const addItem2Progress = (item) => {
    let newProgress = structuredClone(progress);
    newProgress[item.id] = item;
    updateProgress(newProgress);
  };

  /**
   * Reset progress state and LocalStorage
   */
  const clearProgress = () => updateProgress({});

  /**
   * Compute the overall score of each component.
   * Format: {componentName : {sum:sumScore, size:number of questions in the component}}
   * @type {function(*): {}}
   */
  const calComponentScore = (progress) => {
    let result = {};

    const data = _.groupBy(progress, 'component');

    for (let key in data) {
      result[key] = data[key].reduce((sum, response) => {
        sum += parseInt(response.value);
        return sum;
      }, 0);
      result[key] = {
        sum: result[key],
        size: data[key].length,
      };
    }

    return result;
  };

  /**
   * Compute overall score of entire questionnaire.
   * Format: {sum: sumAllScore, size: number of questions in the questionnaire}
   * @type {function(*): {size: number, sum: number}}
   */
  const calOverallSore = (data) => {
    let sumScore = 0,
      length = 0;
    for (const key in data) {
      sumScore += parseInt(data[key].sum);
      length += parseInt(data[key].size);
    }
    return {
      sum: sumScore,
      size: length,
    };
  };

  /**
   * Compute average score and map to given label[WARNING, OK, PASS]
   * @param data
   * @returns {string}
   */
  const mapScoreToLabel = (data) => {
    const WARNING = 3, OK = 4;
    const average = data.sum / data.size;
    console.log(data);
    if(average < WARNING) return "Low";
    else if(WARNING <= average && average < OK) return "Moderate";
    else if(OK <= average) return "High";
    return "NaN";
  };

  return (
    <ProgressCtx.Provider
      value={{
        progress,
        setProgress,
        updateProgress,
        addItem2Progress,
        clearProgress,
        calComponentScore,
        calOverallSore,
        mapScoreToLabel
      }}
    >
      {" "}
      {children}
    </ProgressCtx.Provider>
  );
};
