const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const QRCode = require("qrcode");
//instance of Express



const app = express();
//storage for Multer to handle file uploads
const storage = multer.diskStorage({
//destination directory for uploaded files
destination: (req, file, cb) => {
cb(null, "uploads/");//filename for uploaded files
},
filename: (req, file, cb) => {
cb(
null,
file.fieldname + "-" + Date.now() + path.extname(file.originalname)
);
},
});
//Multer with the storage configuration
const upload = multer({ storage: storage });
// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware to parse JSON data
app.use(bodyParser.json());
// Middleware to enable Cross-Origin Resource Sharing
app.use(cors());
// Middleware to serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//route to handle ID card generation
app.post("/generate-id-card", upload.single("photo"), async (req, res) =>
{
//form data from the request body
const { fullName, rollNo, course, vali, college } = req.body;
const photo = req.file ? req.file.filename : null;
//object to hold the ID card data
const idCardData = {
fullName,
rollNo,
course,
vali,
photo,
college
};
try {
// Generate a QR code containing the ID card data
const qrCodeDataUrl = await
QRCode.toDataURL(JSON.stringify(idCardData));
//QR code data URL added to the ID card data object
idCardData.qrCode = qrCodeDataUrl;
//ID card data sent back to the client
res.json(idCardData);
} catch (err) {
res.status(500).json({ error: "Failed to generate QR code" });
}
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));