"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var app = express_1.default();
var upload = multer_1.default({ dest: 'uploads/' });
app.use(cors_1.default());
app.use('/public', express_1.default.static(process.cwd() + '/public'));
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
    var file = req.file;
    if (!file) {
        res.json({
            error: 'Please upload a file to begin'
        });
    }
    else {
        res.json({
            name: file.filename,
            type: file.mimetype,
            size: file.size
        });
    }
});
app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening ...');
});
