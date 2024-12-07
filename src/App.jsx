import React, { useState } from "react";

const App = () => {
  const gradeMap = {
    Ex: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    P: 5,
    F: 0,
    I: 0, // Treat 'I' and 'X' as 0 grade points for simplicity
    X: 0,
  };

  const [subjects, setSubjects] = useState([{ credit: "", grade: "" }]);
  const [sgpa, setSgpa] = useState(null);
  const [pastSgpas, setPastSgpas] = useState([]);
  const [cgpa, setCgpa] = useState(null);

  const handleInputChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { credit: "", grade: "" }]);
  };

  const removeSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  const calculateSgpa = () => {
    let totalCredits = 0;
    let weightedGrades = 0;

    subjects.forEach(({ credit, grade }) => {
      const creditValue = parseFloat(credit);
      const gradeValue = gradeMap[grade];

      if (!isNaN(creditValue) && gradeValue !== undefined) {
        totalCredits += creditValue;
        weightedGrades += creditValue * gradeValue;
      }
    });

    const result = totalCredits ? (weightedGrades / totalCredits).toFixed(2) : 0;
    setSgpa(result);
  };

  const saveSgpa = () => {
    if (sgpa !== null) {
      setPastSgpas([...pastSgpas, parseFloat(sgpa)]);
      setSubjects([{ credit: "", grade: "" }]);
      setSgpa(null);
    }
  };

  const calculateCgpa = () => {
    if (pastSgpas.length > 0) {
      const average = (pastSgpas.reduce((sum, s) => sum + s, 0) / pastSgpas.length).toFixed(2);
      setCgpa(average);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">CGPA & SGPA Calculator</h1>

      {subjects.map((subject, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 mb-3 w-full max-w-md"
        >
          <input
            type="number"
            placeholder="Credit"
            value={subject.credit}
            onChange={(e) =>
              handleInputChange(index, "credit", e.target.value)
            }
            className="p-2 rounded bg-gray-800 text-white w-1/3"
          />
          <select
            value={subject.grade}
            onChange={(e) => handleInputChange(index, "grade", e.target.value)}
            className="p-2 rounded bg-gray-800 text-white w-1/3"
          >
            <option value="">Grade</option>
            {Object.keys(gradeMap).map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeSubject(index)}
            className="bg-red-600 px-3 py-1 rounded text-white"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addSubject}
        className="bg-blue-600 px-4 py-2 rounded mb-4"
      >
        Add Subject
      </button>
      <button
        onClick={calculateSgpa}
        className="bg-green-600 px-6 py-2 rounded mb-4"
      >
        Calculate SGPA
      </button>

      {sgpa !== null && (
        <div className="text-2xl font-semibold mb-4">
          Your SGPA is: <span className="text-green-400">{sgpa}</span>
        </div>
      )}

      <button
        onClick={saveSgpa}
        className="bg-yellow-600 px-6 py-2 rounded mb-4"
      >
        Save SGPA
      </button>
      <button
        onClick={calculateCgpa}
        className="bg-purple-600 px-6 py-2 rounded mb-4"
      >
        Calculate CGPA
      </button>

      {cgpa !== null && (
        <div className="text-2xl font-semibold">
          Your CGPA is: <span className="text-purple-400">{cgpa}</span>
        </div>
      )}
    </div>
  );
};

export default App;
