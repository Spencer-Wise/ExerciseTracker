import * as exercises from './model.mjs';
import express from 'express';

const PORT = 3000;
const app = express();

app.use(express.json());

// Create

app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `Request failed: ${error}`});
        });
});

// Retrieve all

app.get('/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercise => {
            res.json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: `Request failed: ${error}`});
        });
});

// Update with ID

app.put('/exercises/:_id', (req, res) => {
    // const exerciseId = req.params._id
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
            } else {
                res.status(500).json({Error: 'Resource not found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Request failed'});
        });
});

// Delete

app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(500).json({Error: 'Resource not found.'});
            }
        })
        .catch(error => {
            console.error(error);
            res.send({error: 'Request failed'});
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});