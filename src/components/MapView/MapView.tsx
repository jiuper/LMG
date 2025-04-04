import React, { useCallback, useEffect, useRef, useState } from "react";
import { Map, Placemark, Polygon, SearchControl, YMaps } from "@pbe/react-yandex-maps";
import cnBind from "classnames/bind";
import type ymaps from "yandex-maps";

import defaultMarker from "@/shared/assests/иконка лифт.png";
import { API_BASE } from "@/shared/constants/private";
import { Button } from "@/shared/ui/Button";

import styles from "./MapView.module.scss";

const cx = cnBind.bind(styles);
type HandleLinkArgs = { id: string; urlTitle: string };
type Building = {
    id: string;
    categoryId?: string;
    categoryAreaId?: string;
    urlBuild?: string;
    urlCategory?: string;
    urlCategoryArea?: string;
    coordinates?: [number, number][];
    buildAreaCoordinates?: [number, number][];
    iconPictureId?: string;
    name: string;
    list: { title: string; value: string }[];
    district?: string;
};

type Props = {
    build: Building[];
    list?: { title?: string; value?: string }[];
    zoom?: number;
    maxZoom?: number;
    minZoom?: number;
    center?: [number, number];
    name?: string;
    handleLink?: (data: HandleLinkArgs) => void;
    isMain?: boolean;
    isFind?: boolean;
};

type CustomModalProps = {
    building: Building | null;
    handleLink?: (data: HandleLinkArgs) => void;
    position: [number, number];
    onClose: () => void;
};

const CustomModal: React.FC<CustomModalProps> = ({ building, handleLink, position, onClose }) => {
    if (!building) return null;

    const link = building.categoryId
        ? `/${building.urlCategory}/${building.urlCategoryArea}/${building.urlBuild}`
        : `${building.urlBuild}`;

    const linkId = building.categoryId
        ? `/${building.categoryId}/${building.categoryAreaId}/${building.id}`
        : `${building.id}`;

    return (
        <div className={styles["custom-modal-wrapper"]} onClick={onClose}>
            <div
                className={styles["custom-modal"]}
                onClick={(e) => e.stopPropagation()}
                style={{
                    top: `${position[0]}px`,
                    left: `${position[1]}px`,
                }}
            >
                <div className={styles["custom-modal-header"]}>
                    <h3>{building.name || "Unnamed Building"}</h3>
                    <button className={styles["close-button"]} onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className={styles["custom-modal-content"]}>
                    {building.district && (
                        <div className={styles["item-title-district"]}>{building.district} район</div>
                    )}
                    {building.list?.map((item, index) => (
                        <div key={index} className={styles["modal-item"]}>
                            <span className={styles["item-title"]}>{item.title}:</span>
                            <span className={styles["item-value"]}>{item.value}</span>
                        </div>
                    ))}
                    <Button
                        className={cx("button-main")}
                        mode="empty"
                        onClick={() =>
                            handleLink &&
                            handleLink?.({
                                id: linkId,
                                urlTitle: link,
                            })
                        }
                        label="Перейти"
                    />
                </div>
            </div>
        </div>
    );
};

export const MapView: React.FC<Props> = ({
    build,
    zoom = 9,
    maxZoom = 15,
    minZoom = 3,
    center = [59.930738, 30.311577],
    list,
    name,
    handleLink,
    isMain = false,
    isFind = true,
}) => {
    const [buildings, setBuildings] = useState<Building[]>(build);
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
    const [modalPosition, setModalPosition] = useState<[number, number]>([0, 0]);
    const [highlightedMarker, setHighlightedMarker] = useState<string | null>(null);
    const mapRef = useRef<ymaps.Map | undefined>(undefined);
    useEffect(() => {
        setBuildings(build);
    }, [build]);
    const handleMarkerClick = useCallback(
        (building: Building, coord: [number, number]) => {
            if (isMain) {
                setModalPosition(coord);
                setSelectedBuilding(building);
                setHighlightedMarker(building.id);

                if (mapRef.current) {
                    mapRef.current.setCenter(coord);
                }
            } else {
                handleLink?.({ id: building.id, urlTitle: building?.urlBuild ?? "" });
            }
        },
        [isMain, handleLink],
    );

    const handleModalClose = useCallback(() => {
        setSelectedBuilding(null);
        setHighlightedMarker(null);
    }, []);

    return (
        <div className={styles.map}>
            <YMaps query={{ apikey: "4d365d2d-b723-461d-b441-c61107452f60" }}>
                <div className={styles["map-container"]}>
                    {list?.length ? (
                        <div className={cx("modal-build")}>
                            <div className={cx("modal-content")}>
                                <div className={styles.list}>
                                    <div className={styles["list-item"]}>
                                        <span className={styles["title-list"]}>Название</span>
                                        <span className={styles["value-list"]}>{name}</span>
                                    </div>
                                    {list.map((el, i) => (
                                        <div key={i} className={styles["list-item"]}>
                                            <span className={styles["title-list"]}>{el.title}</span>
                                            <span className={styles["value-list"]}>{el.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <Map
                        instanceRef={mapRef}
                        width="100%"
                        height="600px"
                        defaultState={{ center, zoom }}
                        options={{ maxZoom, minZoom }}
                        modules={["control.ZoomControl", "control.FullscreenControl"]}
                    >
                        {isFind && <SearchControl options={{ float: "right" }} />}
                        {buildings.map((building, buildingIndex) => (
                            <React.Fragment key={building.id}>
                                {building.coordinates?.map((coord, index) => (
                                    <Placemark
                                        key={`placemark-${building.id}-${index}`}
                                        geometry={coord}
                                        onClick={() => handleMarkerClick(building, coord)}
                                        properties={{
                                            iconContent: `${buildingIndex + 1}`,
                                        }}
                                        options={{
                                            preset: "islands#blueCircleIconWithNumber",
                                            iconLayout: "default#image",
                                            iconImageHref: building.iconPictureId
                                                ? `${API_BASE}/picture/${building.iconPictureId}`
                                                : defaultMarker.src,
                                            iconImageSize: highlightedMarker === building.id ? [40, 56] : [30, 42],
                                            iconImageOffset: [-15, -42],
                                        }}
                                    />
                                ))}
                                {building.buildAreaCoordinates && building.buildAreaCoordinates.length > 0 && (
                                    <Polygon
                                        geometry={[building.buildAreaCoordinates]}
                                        options={{
                                            fillColor: "#b3e0fc",
                                            strokeColor: "#2683cc",
                                            strokeWidth: 4,
                                            fillOpacity: 0.75,
                                        }}
                                        onClick={() =>
                                            handleMarkerClick(building, building?.buildAreaCoordinates?.[1] || [0, 0])
                                        }
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </Map>
                    {selectedBuilding && (
                        <CustomModal
                            building={selectedBuilding}
                            handleLink={handleLink}
                            position={modalPosition}
                            onClose={handleModalClose}
                        />
                    )}
                </div>
            </YMaps>
        </div>
    );
};
