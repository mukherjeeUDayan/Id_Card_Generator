
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
//state variables for form inputs and ID card data
const [fullName, setFullName] = useState("");
const [rollNo, setRollNo] = useState("");
const [course, setCourse] = useState("");
const [vali, setVali] = useState("");
const [photo, setPhoto] = useState("");
const [idCard, setIdCard] = useState("");
const [college, setCollege] = useState("");
//form submission
const handleSubmit = async (e) => {
e.preventDefault(); // Prevent default form submission
// FormData object to send form data and file
const formData = new FormData();
formData.append("fullName", fullName);
formData.append("rollNo", rollNo);
formData.append("course", course);
formData.append("vali", vali);
formData.append("photo", photo);
formData.append("college", college);
try {
// Send POST request to the backend to generate ID card
const response = await axios.post(
"http://localhost:5000/generate-id-card",
formData,
{
headers: {
"Content-Type": "multipart/form-data",
},
}
);
//state update with the generated ID card data
setIdCard(response.data);
} catch (error) {
//error handling during the request
console.error("Error generating ID card:", error);
}
};
return (
<div className="App">
<h1>ID Card & QR code Generator</h1>
<form onSubmit={handleSubmit}>
<div>
<label>Full Name:</label>
<input
type="text"
value={fullName}
onChange={(e) => setFullName(e.target.value)}
required
/>
</div>
<div>
<label>Roll Number:</label>
<input
type="text"
value={rollNo}
onChange={(e) => setRollNo(e.target.value)}
required
/>
</div>
<div>
<label>Course:</label>
<input
type="text"
value={course}
onChange={(e) => setCourse(e.target.value)}
required
/>
</div>
<div>
<label>College:</label>
<input
type="text"
value={college}
onChange={(e) => setCollege(e.target.value)}
required
/>
</div>
<div>
<label>Valid upto:</label>
<input
type="text"
value={vali}
onChange={(e) => setVali(e.target.value)}
required
/>
</div>
<div>
<label>Photo:</label>
<input
type="file"
onChange={(e) => setPhoto(e.target.files[0])}
required
/>
</div>
<button type="submit">Generate ID Card</button>
</form>
{idCard && (
<div className="id-card">
<h2>{college} </h2>
<h3><u>Student ID Card</u></h3>
<div className="id-card-content">
<div className="id-card-section photo-section">
{idCard.photo && (
<img
src={`http://localhost:5000/uploads/${idCard.photo}`}
alt="Student Photo"
/>
)}
</div>
<div className="id-card-section info-section">
<p>
<b>Name:</b> {idCard.fullName}
</p>
<p>
<b>Roll Number:</b> {idCard.rollNo}
</p>
<p>
<b>Course:</b> {idCard.course}
</p>
<p>
<b>Valid upto:</b> {idCard.vali}
</p>
</div>
<div className="id-card-section qr-section">
{idCard.qrCode && <img src={idCard.qrCode} alt="QR Code" />}
</div>
</div>
</div>
)}
</div>
);
}
export default App;
