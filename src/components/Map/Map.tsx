import { useEffect, useState } from "react";
import { Clusterer, Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import cnBind from "classnames/bind";
import type { MapEvent } from "yandex-maps";

import styles from "./Map.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    onChange?: (e: [number, number][]) => void;
    coordinates?: [number, number][];
};

export const MapWrapper = ({ onChange, coordinates = [] }: Props) => {
    const [buildings, setBuildings] = useState<[number, number][]>([]);
    const handleMapClick = (e: MapEvent<any, { coords: number[] }>) => {
        const coords = e.get("coords") as [number, number];
        const newBuilding = { coordinates: coords };
        setBuildings([...buildings, coords]);
        onChange?.([...buildings, coords]);
    };
    const handlePlacemarkRightClick = (index: number) => {
        setBuildings((prevBuildings) => {
            const newBuildings = prevBuildings.filter((_, i) => i !== index);
            onChange?.(newBuildings);

            return newBuildings;
        });
    };
    const handlePlacemarkDragEnd = (index: number, event: any) => {
        const newCoords = event.get("target").geometry.getCoordinates();
        setBuildings((prevBuildings) => {
            const newBuildings = prevBuildings.map((building, i) => (i === index ? newCoords : building));
            onChange?.(newBuildings);

            return newBuildings;
        });
    };
    useEffect(() => {
        if (coordinates) setBuildings(coordinates);
    }, [coordinates]);

    return (
        <div className={cx("map")}>
            <YMaps query={{ apikey: "4d365d2d-b723-461d-b441-c61107452f60" }}>
                <div className={cx("map-container")}>
                    <Map
                        onClick={handleMapClick}
                        onLoad={() => {}}
                        className={cx("map-wrapper")}
                        defaultState={{ center: [59.751574, 30.573856], zoom: 9 }}
                    >
                        <Clusterer
                            options={{
                                preset: "islands#invertedVioletClusterIcons",
                                groupByCoordinates: false,
                            }}
                        >
                            {buildings.map((building, index) => (
                                <Placemark
                                    key={index}
                                    geometry={building}
                                    options={{ draggable: true }}
                                    onClick={() => handlePlacemarkRightClick(index)}
                                    onDragEnd={(event: any) => handlePlacemarkDragEnd(index, event)}
                                />
                            ))}
                        </Clusterer>
                    </Map>
                </div>
            </YMaps>
        </div>
    );
};
