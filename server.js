const express = require('express');

const posts = require('./data/helpers/actionModel.js');
const users = require('./data/helpers/mappers.js');
const tags = require('./data/helpers/projectModel.js');

const port = 5555;
const server = express();
server.use(express.json());
//server.use(cors({ orign: 'https://localhost:3000' }));
server.get('/api/users');
server.get('/api/posts');
server.get('/api/tags');








server.listen(port, () => console.log(`Server running on port ${port}`));