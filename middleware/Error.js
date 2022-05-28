class ApiError{
    constructor(code , message){
        this.code = code;
        this.message = message;
    };

    static badRequest(msg){
        return new ApiError(400, msg);
    };

    static unauthorize(msg){    
        return new ApiError(401, msg);
    };

    static validationError(msg){
        return new ApiError(404, msg); 
    };

    static duplicateError(msg){
        return new ApiError(409, msg)
    }
}
module.exports = ApiError;