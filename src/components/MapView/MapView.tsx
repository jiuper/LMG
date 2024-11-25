import { useEffect, useState } from "react";
import { Clusterer, Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import cnBind from "classnames/bind";

import styles from "./MapView.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    build: {
        id: string;
        categoryId?: string;
        categoryAreaId?: string;
        name?: string;
        coordinates?: [number, number][];
        list?: { title?: string; value?: string }[];
    }[];
    list?: { title?: string; value?: string }[];
    zoom?: number;
    maxZoom?: number;
    minZoom?: number;
    center?: [number, number];
    name?: string;
    onClick?: () => void;
    handleLink?: (id: string) => void;
};
export const MapView = ({
    build,
    zoom = 9,
    maxZoom = 15,
    minZoom = 3,
    center = [59.930738, 30.311577],
    list,
    name,
    onClick,
    handleLink,
}: Props) => {
    const [buildings, setBuildings] = useState(build);
    useEffect(() => {
        setBuildings(build);
    }, [build]);

    return (
        <div className={cx("map")}>
            <YMaps query={{ apikey: "4d365d2d-b723-461d-b441-c61107452f60" }}>
                <div className={cx("map-container")}>
                    {list?.length ? (
                        <div className={cx("modal")}>
                            <div className={cx("modal-wrapper")}>
                                <div className={cx("list")}>
                                    <div className={cx("list-item")}>
                                        <span className={cx("title-list")}>Название</span>
                                        <span className={cx("value-list")}>{name}</span>
                                    </div>
                                    {list?.map((el, i) => (
                                        <div key={i} className={cx("list-item")}>
                                            <span className={cx("title-list")}>{el.title}</span>
                                            <span className={cx("value-list")}>{el.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <Map
                        options={{ suppressMapOpenBlock: true, maxZoom, minZoom }}
                        modules={["control.ZoomControl"]}
                        className={cx("map-wrapper")}
                        defaultState={{ center, zoom }}
                    >
                        <Clusterer
                            options={{
                                preset: "islands#invertedVioletClusterIcons",
                                groupByCoordinates: false,
                            }}
                        >
                            {buildings?.map((building, buildingIndex) =>
                                building.coordinates?.map((coord, index) => {
                                    const link = building.categoryId
                                        ? `/${building.categoryId}/${building.categoryAreaId}/${building.id}`
                                        : `${building.id}`;

                                    return (
                                        <Placemark
                                            key={index}
                                            geometry={coord}
                                            onClick={() => handleLink?.(link) || onClick}
                                            properties={{
                                                iconContent: `${buildingIndex + 1}`,
                                                balloonContent: `Building number ${buildingIndex + 1}`,
                                            }}
                                            options={{ preset: "islands#blueCircleIconWithNumber" }}
                                        />
                                    );
                                }),
                            )}
                        </Clusterer>
                    </Map>
                </div>
            </YMaps>
        </div>
    );
};
