const express = require('express');

const actions = require('./data/helpers/actionModel.js');
//const users = require('./data/helpers/mappers.js');
const projects = require('./data/helpers/projectModel.js');

const port = 5555;
const server = express();
server.use(express.json());
server.get('/api/projects');
server.get('/api/actions');


server.get('/api/projects', (req, res) => {
    projects
    .get()
    .then(projects => {
        res.json(projects) ;
    })
    .catch(error => {
        sendUserError(500, 'The posts information could not be retrieved.', res);
        return;
    });
});

server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projects
    .get(id)
    .then(projects=> {
        if (projects.length === 0) {
            sendUserError(404, 'The project with the specified ID does not exist.', res);
            return;
        }
        res.json(projects); 
    })
        .catch(error => {
            sendUserError(500, 'The project information could not be retrieved.', res);
    });
});


server.get('/api/actions', (req, res) => {
    actions
    .get()
    .then(actions => {
        res.json(actions) ;
    })
    .catch(error => {
        sendUserError(500, 'The posts information could not be retrieved.', res);
        return;
    });
});
server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    actions
    .get(id)
    .then(actions=> {
        if (actions.length === 0) {
            sendUserError(404, 'The project with the specified ID does not exist.', res);
            return;
        }
        res.json(actions); 
    })
        .catch(error => {
            sendUserError(500, 'The project information could not be retrieved.', res);
    });
});






server.listen(port, () => console.log(`Server running on port ${port}`));