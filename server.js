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

server.post('/api/projects', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400).json({ errorMessage: 'No name or description' });
        return;
    } 
    projects
        .insert({ name, description })
        .then(id => {
            res.status(201).send(id)
        })
        .catch(err => {
            console.log(err);
    })
})

server.put('/api/projects/:id', (req, res) =>{
    const { id } = req.params;
    const { name, description } = req.body;
    projects
        .update(id, { name, description })
        .then(response => {
            if (response == 0) {
                res.status(400).json({errorMessage: "Did not update"});
            } else {
                res.status(210).json({id, name, description });
            }
        })
        .catch(err => {
            console.log(err);
        })
})

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projects
        .remove(id)
        .then(count => {
            if (count === 0) {
                res.status(400).json({ errorMessage: 'Did not delete'});
            } else {
                res.status(201).json({message: 'successfully deleted'});
            }
    })
})



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

server.get('/api/projects/:userId/actions', (req, res) => {
    const { userId } = req.params;
    projects
    .getProjectActions(userId)
    .then(userActions => {
        res.json(userActions);
    })
})

server.post('/api/actions', (req, res) => {
    const { project_id, description } = req.body;
    if (!project_id || !description) {
        res.status(400).json({ errorMessage: 'No project id or descripton' });
        return;
    } 
    actions
        .insert({ project_id, description })
        .then(id => {
            res.status(201).send(id)
        })
        .catch(err => {
            console.log(err);
    })
})

server.put('/api/actions/:id', (req, res) =>{
    const { id } = req.params;
    const { project_id, description } = req.body;
    actions
        .update(id, { project_id, description })
        .then(count => {
            if (count !== 1) {
                res.status(400).json({errorMessage: "Did not update"});
            } else {
                res.status(210).json({id, project_id, description });
            }
        })
        .catch(err => {
            console.log(err);
        })
})

server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    actions
        .remove(id)
        .then(count => {
            if (count === 0) {
                res.status(400).json({ errorMessage: 'Did not delete'});
            } else {
                res.status(201).json({message: 'successfully deleted'});
            }
    })
})






server.listen(port, () => console.log(`Server running on port ${port}`));