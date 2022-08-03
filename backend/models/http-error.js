class HttpError extends Error{
    constructor(message, errorCode){
        super(message);/*to call the constructer of the base class i.e. Error class*/
        this.code = errorCode;
        console.log(this);
    }
}
module.exports = HttpError