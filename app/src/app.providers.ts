import {HTTP_EXCEPTION_FILTER} from "./core/constants/app.app";
import {HttpExceptionFilter} from "./core/filters/http-exeception.filter";


export const appProviders = [
    {
        provide: HTTP_EXCEPTION_FILTER,
        useClass: HttpExceptionFilter,
    }
];
