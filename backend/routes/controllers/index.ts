module.exports = {

    //Auth Handlers
    RegisterUser : require('./auth/registerUser'),
    LoginUser : require('./auth/loginUser'),
    LogoutUser : require('./auth/logoutUser'),

    //Metrics Handlers
    CreateMetric : require('./metrics/Create'),
    ReadMetric : require('./metrics/Read'),
    UpdateMetric : require('./metrics/Update'),
    DeleteMetric : require('./metrics/Delete'),
}