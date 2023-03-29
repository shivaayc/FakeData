import React, { useState } from 'react';
import faker from 'faker';
import './style.css';
import SaveButton from './saveButton';

function Data() {
  const [numOfRows, setNumOfRows] = useState();
  const [showName, setShowName] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showDateOfBirth, setShowDateOfBirth] = useState(false);

  const handleNumOfRowsChange = (event) => {
    setNumOfRows(event.target.value);
  };

  const handleShowNameChange = (event) => {
    setShowName(event.target.checked);
  };

  const handleShowUsernameChange = (event) => {
    setShowUsername(event.target.checked);
  };

  const handleShowEmailChange = (event) => {
    setShowEmail(event.target.checked);
  };

  const handleShowPhoneChange = (event) => {
    setShowPhone(event.target.checked);
  };

  const handleShowDateOfBirthChange = (event) => {
    setShowDateOfBirth(event.target.checked);
  };

  const generateFakeData = () => {
    const data = [];

    for (let i = 0; i < numOfRows; i++) {
      const row = {};

      if (showName) {
        row.name = faker.name.findName();
      }

      if (showUsername) {
        row.username = faker.internet.userName(); // add username to row
      }

      if (showEmail) {
        row.email = faker.internet.email();
      }

      if (showPhone) {
        row.phone = faker.phone.phoneNumber();
      }

      if (showDateOfBirth) {
        const dateOfBirth = faker.date.between('1950-01-01', '2003-12-31');
        row.dateOfBirth = dateOfBirth.toLocaleDateString();
      }

      data.push(row);
    }

    return data;
  };

  const fakeData = generateFakeData();

  const displayData = fakeData.slice(0, 5);

  return (
    <div>
      <h2>Fake Data</h2>
      <div>
        <label>
          Number of Rows:
          <input type="number" value={numOfRows} onChange={handleNumOfRowsChange} />
        </label>
        {/* <p>Number of Records Entered: {numOfRows}</p> Add this element */}
        <SaveButton data={fakeData} />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={showName} onChange={handleShowNameChange} />
          Name
        </label>
        <label>
          <input type="checkbox" checked={showUsername} onChange={handleShowUsernameChange} />
          Username
        </label>
        <label>
          <input type="checkbox" checked={showEmail} onChange={handleShowEmailChange} />
          Email
        </label>
        <label>
          <input type="checkbox" checked={showPhone} onChange={handleShowPhoneChange} />
          Phone Number
        </label>
        <label>
          <input type="checkbox" checked={showDateOfBirth} onChange={handleShowDateOfBirthChange} />
          Date of Birth
        </label>
      </div>
      <table>
        <thead>
          <tr>
            {showName && <th>Name</th>}
            {showUsername && <th>Username</th>} {/* add this line */}

{showEmail && <th>Email</th>}
{showPhone && <th>Phone Number</th>}
{showDateOfBirth && <th>Date of Birth</th>}

</tr>
</thead>
<tbody>
{displayData.map((row, index) => (
<tr key={index}>
{showName && <td>{row.name}</td>}
{showUsername && <td>{row.username}</td>} {/* add this line */}
{showEmail && <td>{row.email}</td>}
{showPhone && <td>{row.phone}</td>}
{showDateOfBirth && <td>{row.dateOfBirth}</td>}
</tr>
))}
</tbody>
</table>
    </div>
  );
}

export default Data;
