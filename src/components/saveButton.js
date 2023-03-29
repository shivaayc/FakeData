import React from 'react';

function SaveButton({ data }) {
  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
                       data.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const downloadJSON = () => {
    const jsonContent = "data:text/json;charset=utf-8," + JSON.stringify(data);
    const encodedUri = encodeURI(jsonContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.json");
    document.body.appendChild(link);
    link.click();
  };

  const downloadSQL = () => {
    const tableName = prompt("Enter table name:");
    if (!tableName) return; // User clicked Cancel
    const sqlContent =
      "data:text/sql;charset=utf-8," +
      data
        .map((row) => {
          const values = Object.values(row);
          const columns = Object.keys(row).join(", ");
          const escapedValues = values.map((value) => `'${value}'`);
          const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${escapedValues.join(
            ", "
          )});`;
          return sql;
        })
        .join("\n");
    const encodedUri = encodeURI(sqlContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.sql");
    document.body.appendChild(link);
    link.click();
  };

  const downloadMongoDB = () => {
    const dbName = prompt("Enter database name:");
    if (!dbName) return; // User clicked Cancel
    const collectionName = prompt("Enter collection name:");
    if (!collectionName) return; // User clicked Cancel
    const mongoDBContent = "data:text/mongodb;charset=utf-8," +
      JSON.stringify({ [collectionName]: data });
    const encodedUri = encodeURI(mongoDBContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.json");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <button onClick={downloadCSV}>Download CSV</button>
      <button onClick={downloadJSON}>Download JSON</button>
      <button onClick={downloadSQL}>Download SQL</button>
      <button onClick={downloadMongoDB}>Download MongoDB</button>
    </div>
  );
}

export default SaveButton;
