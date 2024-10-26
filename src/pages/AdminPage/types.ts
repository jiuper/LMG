import type {
    ApartmentsEntity,
    CityEntity,
    DeveloperEntity,
    EmailEntity,
    ErrorLog,
    PropertyEntity,
    UserEntity,
} from "@/entities/types/entities";

export type AnyEntity =
    | UserEntity
    | DeveloperEntity
    | PropertyEntity
    | CityEntity
    | EmailEntity
    | ApartmentsEntity
    | ErrorLog;

export enum AdminEntityPageType {
    USERS = "users",
    DEVELOPERS = "developer",
    PROPERTIES = "properties",
    CITIES = "cities",
    EMAILS = "emails",
    ERRORS = "errors",
}
