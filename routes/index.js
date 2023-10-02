const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const gameRoute = require('./gameRoute')
const router = require('express').Router();

router.get('/', (_, res) =>{
    res.send('api running >>>!')
})

router.use('/users', userRoute);
router.use('/auth', authRoute)
router.use('/game', gameRoute)

module.exports = router;
