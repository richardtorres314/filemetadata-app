import cors from 'cors';
import express from 'express';
import multer from 'multer';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
	const { file } = req;

	if (!file) {
		res.json({
			error: 'Please upload a file to begin'
		});
	} else {
		res.json({
			name: file.filename,
			type: file.mimetype,
			size: file.size
		});
	}
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Node.js listening ...');
});
