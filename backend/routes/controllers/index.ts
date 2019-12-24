module.exports = {

    //Auth Handlers
    RegisterUser : require('./auth/registerUser'),
    RegisterPage : require('./auth/registerPage'),
    LoginUser : require('./auth/loginUser'),
    LogoutUser : require('./auth/logoutUser'),
    LoginPage : require('./auth/loginPage'),

    //Metrics Handlers
    CreateMetric : require('./metrics/Create'),
    ReadMetric : require('./metrics/Read'),
    UpdateMetric : require('./metrics/Update'),
    DeleteMetric : require('./metrics/Delete'),
    Index : require('./metrics/index')
}