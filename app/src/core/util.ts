import {firstValueFrom, Observable} from "rxjs";

export function getPromise(data$: Observable<any>) {
    return firstValueFrom(data$, {defaultValue: null}).catch(e => {
        console.log(e)
    });
}
