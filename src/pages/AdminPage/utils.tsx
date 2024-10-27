import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";

import type { CitiesSimpleListApiResponse } from "@/api/admin/citiesSimpleListApi/types";
import type { CityCreateApiParams } from "@/api/admin/cityCreateApi/cityCreateApi";
import { cityCreateApi } from "@/api/admin/cityCreateApi/cityCreateApi";
import { cityDeleteApi } from "@/api/admin/cityDeleteApi";
import type { CityUpdateApiParams } from "@/api/admin/cityUpdateApi/cityUpdateApi";
import { cityUpdateApi } from "@/api/admin/cityUpdateApi/cityUpdateApi";
import type { DeveloperCreateApiParams } from "@/api/admin/developerCreateApi/developerCreateApi";
import { developerCreateApi } from "@/api/admin/developerCreateApi/developerCreateApi";
import { developerDeleteApi } from "@/api/admin/developerDeleteApi/developerDeleteApi";
import type { DeveloperUpdateApiParams } from "@/api/admin/developerUpdateApi/developerUpdateApi";
import { developerUpdateApi } from "@/api/admin/developerUpdateApi/developerUpdateApi";
import type { DistrictsSimpleListApiResponse } from "@/api/admin/districtsSimpleListApi/types";
import type { GetCitiesSingleApiResponse } from "@/api/admin/getCitiesSingleApi/types";
import type { PropertyCreateApiParams } from "@/api/admin/propertyCreateApi/propertyCreateApi";
import { propertyCreateApi } from "@/api/admin/propertyCreateApi/propertyCreateApi";
import { propertyDeleteApi } from "@/api/admin/propertyDeleteApi/propertyDeleteApi";
import { propertyUpdateApi } from "@/api/admin/propertyUpdateApi";
import type { PropertyUpdateApiParams } from "@/api/admin/propertyUpdateApi/propertyUpdateApi";
import type { UnitCreateApiParams } from "@/api/admin/unitCreateApi/unitCreateApi";
import type { UnitUpdateApiParams } from "@/api/admin/unitUpdateApi/unitUpdateApi";
import { deleteUserApi } from "@/api/deleteUserApi/deleteUserApi";
import { toggleUserApi } from "@/api/toggleUserApi";
import type { UserCreateApiParams } from "@/api/userCreateApi/userCreateApi";
import { userCreateApi } from "@/api/userCreateApi/userCreateApi";
import { userUpdateApi } from "@/api/userUpdateApi";
import type { UserUpdateApiParams } from "@/api/userUpdateApi/userUpdateApi";
import type { ModalAdministeredCityModel } from "@/components/_Modals/ModalAdministeredCity/ModalAdministeredCity";
import type { ModalAdministeredDeveloperResult } from "@/components/_Modals/ModalAdministeredDeveloper";
import type { ModalAdministeredRealtyModel } from "@/components/_Modals/ModalAdministeredRealty";
import type { ModalAdministeredUnitModel } from "@/components/_Modals/ModalAdministeredUnit/ModalAdministeredUnit";
import type { ModalAdministeredUserResult } from "@/components/_Modals/ModalAdministeredUser";
import type { CityEntity, DeveloperEntity, EmailEntity, PropertyEntity, UserEntity } from "@/entities/types/entities";
import { queryClient } from "@/pages/_app.page";
import type { AnyEntity } from "@/view/AdminPage/types";
import { AdminEntityPageType } from "@/view/AdminPage/types";

export interface PrepareUserEditFormValuesParams {
    entity: UserEntity;
}
export const prepareUserEditFormValues = ({
    entity,
}: PrepareUserEditFormValuesParams): ModalAdministeredUserResult => ({
    id: entity.id,
    email: entity.email,
    userName: entity.userName,
    firstName: entity.firstName || "",
    lastName: entity.lastName || "",
    password: "",
    role: entity.role,
});

export interface PreparePropertyEditFormValuesParams {
    entity: PropertyEntity;
    cities: CitiesSimpleListApiResponse;
    districts: DistrictsSimpleListApiResponse;
}
export const preparePropertyEditFormValues = ({
    entity,
    cities,
    districts,
}: PreparePropertyEditFormValuesParams): ModalAdministeredRealtyModel => ({
    developerId: entity.developerId,
    cityId: cities.find((el) => el.text === entity.city)?.id,
    districtId: Number(districts.find((el) => el.text === entity.district)?.id),
    rating: entity.rating,
    readyDate: format(entity.readyDate, "yyyyMM"),
    url: entity.aboutUrl,
    description: entity.additional,
    photos: [],
    id: entity.id,
    header: entity.header,
    isHidden: entity.isHidden,
    isPreLaunch: entity.isPreLaunch,
});

export interface PrepareDevelopmentEditFormValuesParams {
    entity: DeveloperEntity;
}
export const prepareDeveloperEditFormValues = ({
    entity,
}: PrepareDevelopmentEditFormValuesParams): Partial<ModalAdministeredDeveloperResult> => ({
    id: entity.id,
    title: entity.title,
    cashback: entity.cashback,
    cashbackOwn: entity.cashbackOwn,
});
export interface PrepareCityEditFormValuesParams {
    data: GetCitiesSingleApiResponse;
}
export const prepareCityEditFormValues = ({ data }: PrepareCityEditFormValuesParams): ModalAdministeredCityModel => ({
    id: data.id,
    name: data.name || "",
    lat: data.lat,
    lng: data.lng,
    zoom: data.zoom,
});

export const prepareUserCreateData = (data: ModalAdministeredUserResult): UserCreateApiParams => ({
    email: data.email,
    userName: data.userName,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    password: data.password,
});
export const prepareUserUpdateData = (data: ModalAdministeredUserResult): UserUpdateApiParams => ({
    id: data.id || 0,
    userName: data.userName,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password || undefined,
    role: data.role,
});
export const prepareDeveloperCreateData = (data: ModalAdministeredDeveloperResult): DeveloperCreateApiParams => ({
    logo: data.logo === "" ? null : data.logo,
    title: data.title,
    cashback: data.cashback,
    cashbackOwn: data.cashbackOwn,
});
export const prepareDeveloperUpdateData = (data: ModalAdministeredDeveloperResult): DeveloperUpdateApiParams => ({
    id: data.id || NaN,
    ...prepareDeveloperCreateData(data),
});
export const preparePropertyCreateData = (data: ModalAdministeredRealtyModel): PropertyCreateApiParams => ({
    aboutUrl: data.url || null,
    additional: data.description || null,
    photos: data.photos,
    rating: data.rating || undefined,
    lng: Number(data.lng),
    lat: Number(data.lat),
    districtId: Number(data.districtId),
    cityId: Number(data.cityId),
    developerId: Number(data.developerId),
    readyDate: Number(data.readyDate) || undefined,
    videos: [],
    isHidden: data.isHidden || false,
    isPreLaunch: data.isPreLaunch || false,
    header: data.header || "",
});
export const preparePropertyUpdateData = (data: ModalAdministeredRealtyModel): PropertyUpdateApiParams => ({
    id: Number(data.id),
    ...preparePropertyCreateData(data),
});
export const prepareUnitCreateData = (data: ModalAdministeredUnitModel): UnitCreateApiParams => ({
    propertyId: data.propertyId || 0,
    floor: (data.floor && +data.floor) || 0,
    bedrooms: (data.bedrooms && +data.bedrooms) || 0,
    areaMetric: (data.areaMetric && +data.areaMetric) || 0,
    price: (data.price && +data.price) || 0,
    currency: data.currency || "USD",
    quantity: data.availableCount || undefined,
    photos: data.photos || [],
    additional: data.description,
    isHidden: data.isHidden || false,
    isReservationAvailable: data.isReservationAvailable || false,
});
export const prepareUnitUpdateData = (data: ModalAdministeredUnitModel): UnitUpdateApiParams => ({
    id: data.itemId || 0,
    ...prepareUnitCreateData(data),
});
export const prepareCityCreateData = (data: ModalAdministeredCityModel): CityCreateApiParams => ({
    name: data.name,
    zoom: +data.zoom,
    lat: data.lat || 0,
    lng: data.lng || 0,
});
export const prepareCityUpdateData = (data: ModalAdministeredCityModel): CityUpdateApiParams => ({
    id: data.id || 0,
    ...prepareCityCreateData(data),
});

export const useEntityCreate = () => {
    const userParams = useMutation({ mutationFn: userCreateApi });
    const developerParams = useMutation({ mutationFn: developerCreateApi });
    const propertyParams = useMutation({ mutationFn: propertyCreateApi });
    const cityParams = useMutation({ mutationFn: cityCreateApi });

    return {
        [AdminEntityPageType.USERS]: userParams,
        [AdminEntityPageType.DEVELOPERS]: developerParams,
        [AdminEntityPageType.PROPERTIES]: propertyParams,
        [AdminEntityPageType.CITIES]: cityParams,
        [AdminEntityPageType.EMAILS]: undefined,
        [AdminEntityPageType.ERRORS]: undefined,
    };
};
export const useEntityUpdate = () => {
    const userParams = useMutation({ mutationFn: userUpdateApi });
    const developerParams = useMutation({
        mutationFn: developerUpdateApi,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["loadDeveloperById"] });
        },
    });
    const propertyParams = useMutation({ mutationFn: propertyUpdateApi });
    const cityParams = useMutation({ mutationFn: cityUpdateApi });

    return {
        [AdminEntityPageType.USERS]: userParams,
        [AdminEntityPageType.DEVELOPERS]: developerParams,
        [AdminEntityPageType.PROPERTIES]: propertyParams,
        [AdminEntityPageType.CITIES]: cityParams,
        [AdminEntityPageType.EMAILS]: undefined,
        [AdminEntityPageType.ERRORS]: undefined,
    };
};
export const useEntityDelete = () => {
    const userParams = useMutation({ mutationFn: deleteUserApi });
    const developerParams = useMutation({ mutationFn: developerDeleteApi });
    const propertyParams = useMutation({ mutationFn: propertyDeleteApi });
    const cityParams = useMutation({ mutationFn: cityDeleteApi });

    return {
        [AdminEntityPageType.USERS]: userParams,
        [AdminEntityPageType.DEVELOPERS]: developerParams,
        [AdminEntityPageType.PROPERTIES]: propertyParams,
        [AdminEntityPageType.CITIES]: cityParams,
        [AdminEntityPageType.EMAILS]: undefined,
        [AdminEntityPageType.ERRORS]: undefined,
    };
};
export const useEntityToggle = () => {
    const userParams = useMutation({ mutationFn: toggleUserApi });

    return {
        [AdminEntityPageType.USERS]: userParams,
    };
};

export const getDeleteEntityConfirmMessage = (entity: AnyEntity, entityType: AdminEntityPageType) => {
    switch (entityType) {
        case AdminEntityPageType.USERS: {
            const { userName } = entity as UserEntity;

            return `Удаление пользователя "${userName}" может привести к необратимой потере данных`;
        }
        case AdminEntityPageType.DEVELOPERS: {
            const { title } = entity as DeveloperEntity;

            return `Удаление застройщика "${title}" может привести к необратимой потере данных`;
        }
        case AdminEntityPageType.PROPERTIES: {
            const { header } = entity as PropertyEntity;

            return `Удаление недвижимости "${header}" может привести к необратимой потере данных`;
        }
        case AdminEntityPageType.CITIES: {
            const { cityName } = entity as CityEntity;

            return `Удаление города "${cityName}" может привести к необратимой потере данных`;
        }
        case AdminEntityPageType.EMAILS: {
            const { email } = entity as EmailEntity;

            return `Удаление email "${email}" может привести к необратимой потере данных`;
        }
        default:
            return "Удаление этой сущности может привести к необратимой потере данных";
    }
};
