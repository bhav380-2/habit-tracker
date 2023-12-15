const express = require('express');
const router = express.Router();

const HabitsController =  require('../controllers/habitsController');

// get requests
router.get('/',HabitsController.habits);  

router.get('/week-view',HabitsController.weekview);

router.get('/delete-habit',HabitsController.deleteHabit);

// post requests
router.post('/add-habit',HabitsController.addHabit);

// put requests
router.put('/update-habit-status',HabitsController.updateHabitStatus);

router.put("/favorite-habit",HabitsController.addToFavorites);

module.exports = router;