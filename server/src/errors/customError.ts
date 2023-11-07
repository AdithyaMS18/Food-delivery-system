class CustomError extends Error{
    statusCode: number;
    constructor(msg:string, statusCode:number){
        super(msg)
        this.statusCode=statusCode
    }
}

const createCustomError = (msg:string, statusCode:number)=>{
    return new CustomError(msg, statusCode)
}

export {createCustomError, CustomError}