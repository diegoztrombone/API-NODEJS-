const { getProfile } = require('../../queries/user')

module.exports = db => async (req, res, next) => {
    const { email } = res.locals.user

    const userProfile = await getProfile(db, { email })

    if (userProfile === false) { 
        return next({ error: new Error('Something went wrong') })
    }
    res.status(200).json({
        success: true,
        data: userProfile
    })
}