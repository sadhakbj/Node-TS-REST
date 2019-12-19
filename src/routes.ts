import {UserController} from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},
 {
     method: "post",
     route: "/auth/login",
     controller: AuthController,
     action: "login"
 },
 {
     method: "get",
     route: "/auth/profile",
     controller: AuthController,
     action: "currentUser"
 }
];