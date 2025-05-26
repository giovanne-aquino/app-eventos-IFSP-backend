/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/userController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventFieldResponseController } from './../controllers/event/eventFieldResponseController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventController } from './../controllers/event/eventController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventFieldController } from './../controllers/event/EventFieldController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "CPFCNPJ": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "CRM": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "nationalId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "cpf": {"dataType":"string"},
            "cnpj": {"dataType":"string"},
            "crm": {"dataType":"string"},
            "nationalId": {"dataType":"string"},
            "userRole": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ADMIN"]},{"dataType":"enum","enums":["ORGANIZER"]},{"dataType":"enum","enums":["PARTICIPANT"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CreateUserDto_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"email":{"dataType":"string"},"password":{"dataType":"string"},"cpf":{"dataType":"string"},"cnpj":{"dataType":"string"},"crm":{"dataType":"string"},"nationalId":{"dataType":"string"},"userRole":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ADMIN"]},{"dataType":"enum","enums":["ORGANIZER"]},{"dataType":"enum","enums":["PARTICIPANT"]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DefaultSelection_Prisma._36_EventFieldResponsePayload_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true},"eventFieldId":{"dataType":"double","required":true},"eventRegistrationId":{"dataType":"double","required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EventFieldResponse": {
        "dataType": "refAlias",
        "type": {"ref":"DefaultSelection_Prisma._36_EventFieldResponsePayload_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FieldErrors": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"any"},"message":{"dataType":"string","required":true}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "status": {"dataType":"double","required":true},
            "fields": {"ref":"FieldErrors","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateEventFieldResponseDto": {
        "dataType": "refObject",
        "properties": {
            "eventRegistrationId": {"dataType":"double","required":true},
            "eventFieldId": {"dataType":"double","required":true},
            "value": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EventFieldResponse2Dto": {
        "dataType": "refObject",
        "properties": {
            "eventRegistrationId": {"dataType":"double","required":true},
            "eventFieldId": {"dataType":"double","required":true},
            "value": {"dataType":"string","required":true},
            "id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CreateEventFieldResponseDto_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"eventRegistrationId":{"dataType":"double"},"eventFieldId":{"dataType":"double"},"value":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EventResponseDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "organizerId": {"dataType":"double","required":true},
            "format": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["PRESENTIAL"]},{"dataType":"enum","enums":["ONLINE"]},{"dataType":"enum","enums":["HYBRID"]}],"required":true},
            "location": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "userDocument": {"dataType":"boolean","required":true},
            "banner": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "eventType": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["SIMPLE"]},{"dataType":"enum","enums":["LARGE"]}],"required":true},
            "startDate": {"dataType":"datetime","required":true},
            "endDate": {"dataType":"datetime","required":true},
            "maxCapacity": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "complementaryHours": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["PENDING"]},{"dataType":"enum","enums":["CONFIRMED"]},{"dataType":"enum","enums":["CANCELED"]}],"required":true},
            "category": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["TALK"]},{"dataType":"enum","enums":["LECTURE"]},{"dataType":"enum","enums":["WORKSHOP"]},{"dataType":"enum","enums":["SEMINAR"]},{"dataType":"enum","enums":["SHORT_COURSE"]},{"dataType":"enum","enums":["OTHER"]},{"dataType":"enum","enums":[null]}]},
            "id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateEventDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "organizerId": {"dataType":"double","required":true},
            "format": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["PRESENTIAL"]},{"dataType":"enum","enums":["ONLINE"]},{"dataType":"enum","enums":["HYBRID"]}],"required":true},
            "location": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "userDocument": {"dataType":"boolean","required":true},
            "banner": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "eventType": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["SIMPLE"]},{"dataType":"enum","enums":["LARGE"]}],"required":true},
            "startDate": {"dataType":"datetime","required":true},
            "endDate": {"dataType":"datetime","required":true},
            "maxCapacity": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "complementaryHours": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["PENDING"]},{"dataType":"enum","enums":["CONFIRMED"]},{"dataType":"enum","enums":["CANCELED"]}],"required":true},
            "category": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["TALK"]},{"dataType":"enum","enums":["LECTURE"]},{"dataType":"enum","enums":["WORKSHOP"]},{"dataType":"enum","enums":["SEMINAR"]},{"dataType":"enum","enums":["SHORT_COURSE"]},{"dataType":"enum","enums":["OTHER"]},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CreateEventDto_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"description":{"dataType":"string"},"organizerId":{"dataType":"double"},"format":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["PRESENTIAL"]},{"dataType":"enum","enums":["ONLINE"]},{"dataType":"enum","enums":["HYBRID"]}]},"location":{"dataType":"string"},"userDocument":{"dataType":"boolean"},"banner":{"dataType":"string"},"eventType":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["SIMPLE"]},{"dataType":"enum","enums":["LARGE"]}]},"startDate":{"dataType":"datetime"},"endDate":{"dataType":"datetime"},"maxCapacity":{"dataType":"double"},"complementaryHours":{"dataType":"double"},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["PENDING"]},{"dataType":"enum","enums":["CONFIRMED"]},{"dataType":"enum","enums":["CANCELED"]}]},"category":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["TALK"]},{"dataType":"enum","enums":["LECTURE"]},{"dataType":"enum","enums":["WORKSHOP"]},{"dataType":"enum","enums":["SEMINAR"]},{"dataType":"enum","enums":["SHORT_COURSE"]},{"dataType":"enum","enums":["OTHER"]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateEventDto": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_CreateEventDto_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "_36_Enums.FieldType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["STRING"]},{"dataType":"enum","enums":["NUMBER"]},{"dataType":"enum","enums":["DATE"]},{"dataType":"enum","enums":["BOOLEAN"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DefaultSelection_Prisma._36_EventFieldPayload_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"required":{"dataType":"boolean","required":true},"type":{"ref":"_36_Enums.FieldType","required":true},"eventId":{"dataType":"double","required":true},"id":{"dataType":"double","required":true},"name":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EventField": {
        "dataType": "refAlias",
        "type": {"ref":"DefaultSelection_Prisma._36_EventFieldPayload_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FieldType": {
        "dataType": "refAlias",
        "type": {"ref":"_36_Enums.FieldType","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateEventFieldRequestDTO": {
        "dataType": "refObject",
        "properties": {
            "eventId": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "type": {"ref":"FieldType","required":true},
            "required": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Error": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_UpdateEventFieldRequestDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"eventId":{"dataType":"double"},"name":{"dataType":"string"},"type":{"ref":"_36_Enums.FieldType"},"required":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateUserDto"},
        };
        app.post('/users',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.createUser)),

            async function UserController_createUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_createUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getUsers: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/users',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUsers)),

            async function UserController_getUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUsers, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUser)),

            async function UserController_getUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"Partial_CreateUserDto_"},
        };
        app.put('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser)),

            async function UserController_updateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUser)),

            async function UserController_deleteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_deleteUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventFieldResponseController_createEventFieldResponse: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateEventFieldResponseDto"},
        };
        app.post('/eventFieldResponses',
            ...(fetchMiddlewares<RequestHandler>(EventFieldResponseController)),
            ...(fetchMiddlewares<RequestHandler>(EventFieldResponseController.prototype.createEventFieldResponse)),

            async function EventFieldResponseController_createEventFieldResponse(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventFieldResponseController_createEventFieldResponse, request, response });

                const controller = new EventFieldResponseController();

              await templateService.apiHandler({
                methodName: 'createEventFieldResponse',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventFieldResponseController_getAllEventFieldResponses: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/eventFieldResponses',
            ...(fetchMiddlewares<RequestHandler>(EventFieldResponseController)),
            ...(fetchMiddlewares<RequestHandler>(EventFieldResponseController.prototype.getAllEventFieldResponses)),

            async function EventFieldResponseController_getAllEventFieldResponses(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventFieldResponseController_getAllEventFieldResponses, request, response });

                const controller = new EventFieldResponseController();

              await templateService.apiHandler({
                methodName: 'getAllEventFieldResponses',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventFieldResponseController_updateEventFieldResponse: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"Partial_CreateEventFieldResponseDto_"},
        };
        app.put('/eventFieldResponses/:id',
            ...(fetchMiddlewares<RequestHandler>(EventFieldResponseController)),
            ...(fetchMiddlewares<RequestHandler>(EventFieldResponseController.prototype.updateEventFieldResponse)),

            async function EventFieldResponseController_updateEventFieldResponse(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventFieldResponseController_updateEventFieldResponse, request, response });

                const controller = new EventFieldResponseController();

              await templateService.apiHandler({
                methodName: 'updateEventFieldResponse',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventFieldResponseController_deleteEventFieldResponse: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/eventFieldResponses/:id',
            ...(fetchMiddlewares<RequestHandler>(EventFieldResponseController)),
            ...(fetchMiddlewares<RequestHandler>(EventFieldResponseController.prototype.deleteEventFieldResponse)),

            async function EventFieldResponseController_deleteEventFieldResponse(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventFieldResponseController_deleteEventFieldResponse, request, response });

                const controller = new EventFieldResponseController();

              await templateService.apiHandler({
                methodName: 'deleteEventFieldResponse',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_createEvent: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateEventDto"},
        };
        app.post('/events',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.createEvent)),

            async function EventController_createEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_createEvent, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'createEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_getEvents: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"default":1,"in":"query","name":"page","dataType":"double"},
                pageSize: {"default":12,"in":"query","name":"pageSize","dataType":"double"},
                format: {"in":"query","name":"format","dataType":"string"},
                eventType: {"in":"query","name":"eventType","dataType":"string"},
                searchTerm: {"in":"query","name":"searchTerm","dataType":"string"},
        };
        app.get('/events',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getEvents)),

            async function EventController_getEvents(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_getEvents, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'getEvents',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_getEventById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/events/:id',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getEventById)),

            async function EventController_getEventById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_getEventById, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'getEventById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_getEventsByFormat: Record<string, TsoaRoute.ParameterSchema> = {
                format: {"in":"path","name":"format","required":true,"dataType":"string"},
        };
        app.get('/events/format/:format',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getEventsByFormat)),

            async function EventController_getEventsByFormat(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_getEventsByFormat, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'getEventsByFormat',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_getEventsByType: Record<string, TsoaRoute.ParameterSchema> = {
                eventType: {"in":"path","name":"eventType","required":true,"dataType":"string"},
        };
        app.get('/events/type/:eventType',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getEventsByType)),

            async function EventController_getEventsByType(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_getEventsByType, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'getEventsByType',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_updateEvent: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateEventDto"},
        };
        app.put('/events/:id',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.updateEvent)),

            async function EventController_updateEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_updateEvent, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'updateEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_deleteEvent: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/events/:id',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.deleteEvent)),

            async function EventController_deleteEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_deleteEvent, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'deleteEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventFieldController_createEventField: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateEventFieldRequestDTO"},
        };
        app.post('/eventFields',
            ...(fetchMiddlewares<RequestHandler>(EventFieldController)),
            ...(fetchMiddlewares<RequestHandler>(EventFieldController.prototype.createEventField)),

            async function EventFieldController_createEventField(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventFieldController_createEventField, request, response });

                const controller = new EventFieldController();

              await templateService.apiHandler({
                methodName: 'createEventField',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventFieldController_getAllEventFields: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/eventFields',
            ...(fetchMiddlewares<RequestHandler>(EventFieldController)),
            ...(fetchMiddlewares<RequestHandler>(EventFieldController.prototype.getAllEventFields)),

            async function EventFieldController_getAllEventFields(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventFieldController_getAllEventFields, request, response });

                const controller = new EventFieldController();

              await templateService.apiHandler({
                methodName: 'getAllEventFields',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventFieldController_updateEventField: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"Partial_UpdateEventFieldRequestDTO_"},
        };
        app.put('/eventFields/:id',
            ...(fetchMiddlewares<RequestHandler>(EventFieldController)),
            ...(fetchMiddlewares<RequestHandler>(EventFieldController.prototype.updateEventField)),

            async function EventFieldController_updateEventField(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventFieldController_updateEventField, request, response });

                const controller = new EventFieldController();

              await templateService.apiHandler({
                methodName: 'updateEventField',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventFieldController_deleteEventField: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/eventFields/:id',
            ...(fetchMiddlewares<RequestHandler>(EventFieldController)),
            ...(fetchMiddlewares<RequestHandler>(EventFieldController.prototype.deleteEventField)),

            async function EventFieldController_deleteEventField(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventFieldController_deleteEventField, request, response });

                const controller = new EventFieldController();

              await templateService.apiHandler({
                methodName: 'deleteEventField',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
