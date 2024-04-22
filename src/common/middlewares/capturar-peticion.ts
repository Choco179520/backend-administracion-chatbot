import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    NotFoundException,
} from "@nestjs/common";
import {Observable, catchError, map, throwError} from "rxjs";
import {cifrarInformacionResponse, descifrarInformacionRequest} from "./encrypt-decrypt";
import {NextFunction} from "express";

export function CapturarPeticion(req: any, res: any, next: NextFunction) {
    const esPostOrPut = req.method === "POST" || req.method === "PUT";

    if (Object.keys(req.body).length && esPostOrPut) {
        req.body = JSON.parse(descifrarInformacionRequest(req.body.d));
        next();
    } else {
        next();
    }
}

@Injectable()
export class EncryptInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                // Si data es un Error, devolvemos una respuesta encriptada con información de error
                if (data instanceof Error) {
                    throw new NotFoundException({
                        d: cifrarInformacionResponse(JSON.stringify(data.message)),
                    });
                }

                // Si data no es un Error, devolvemos una respuesta encriptada con los datos
                return {d: cifrarInformacionResponse(JSON.stringify(data))};
            }),
            // catchError((error) => {
            //     // Si ocurre un error durante el flujo del observable, manejamos el error aquí
            //     // Devolvemos una respuesta encriptada con información de error
            //     return throwError({
            //         d: cifrarInformacionResponse(
            //             JSON.stringify(error.response.message)
            //         ),
            //     });
            // })
        );
    }
}
