import {z} from "zod";
//Futuramente centralizar os enums aqui e exporta-los


// #region USER ENUMS
    export const UserRoleEnum = z.enum(['ADMIN', 'ORGANIZER', 'PARTICIPANT']);
    export type UserRole = z.infer<typeof UserRoleEnum>;
// #endregion USER ENUMS