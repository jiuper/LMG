import { useEffect, useState } from "react";
import { Map, Placemark, Polygon, YMaps } from "@pbe/react-yandex-maps";
import cnBind from "classnames/bind";

import marker from "@/shared/assests/иконка лифт.png";

import styles from "./Map.module.scss";

const cx = cnBind.bind(styles);

const ICON_PRESET = {
    iconLayout: "default#image",
    iconImageHref: marker.src,
    iconImageSize: [30, 30],
    draggable: true,
};

const DEFAULT_CENTER: [number, number] = [59.751574, 30.573856];
const DEFAULT_ZOOM = 9;

type Props = {
    onChange?: (mode: "placemark" | "polygon", coordinates: [number, number][]) => void;
    coordinates?: [number, number][];
    buildAreaCoordinates?: [number, number][];
};

export const MapWrapper = ({ onChange, coordinates = [], buildAreaCoordinates = [] }: Props) => {
    const [mode, setMode] = useState<"placemark" | "polygon">("placemark");
    const [points, setPoints] = useState<[number, number][]>(coordinates);
    const [polygon, setPolygon] = useState<[number, number][]>(buildAreaCoordinates);

    useEffect(() => {
        if (polygon.length > 0) {
            setMode("polygon");
        } else if (points.length > 0) {
            setMode("placemark");
        }
    }, [points, polygon]);

    const handleMapClick = (e: any) => {
        const coords = e.get("coords");

        if (!Array.isArray(coords) || coords.length !== 2) return;

        if (mode === "placemark") {
            const newPoints = [...points, coords as [number, number]];
            setPoints(newPoints);
            onChange?.("placemark", newPoints);
        } else {
            const newPolygon = [...polygon, coords as [number, number]];
            setPolygon(newPolygon);
            onChange?.("polygon", newPolygon);
        }
    };

    const handlePlacemarkDrag = (index: number, event: any) => {
        const newCoords = event.get("target").geometry.getCoordinates();

        if (!Array.isArray(newCoords) || newCoords.length !== 2) return;

        const updatedPoints = points.map((p, i) => (i === index ? (newCoords as [number, number]) : p));
        setPoints(updatedPoints);
        onChange?.("placemark", updatedPoints);
    };

    const handlePolygonVertexDrag = (index: number, event: any) => {
        const newCoords = event.get("target").geometry.getCoordinates();

        if (!Array.isArray(newCoords) || newCoords.length !== 2) return;

        const updatedPolygon = polygon.map((p, i) => (i === index ? (newCoords as [number, number]) : p));
        setPolygon(updatedPolygon);
        onChange?.("polygon", updatedPolygon);
    };

    return (
        <div className={cx("map-container")}>
            <div className={cx("controls")}>
                <div className={cx("radio-group")}>
                    <label>
                        <input
                            type="radio"
                            name="mode"
                            value="placemark"
                            checked={mode === "placemark"}
                            onChange={() => {
                                setMode("placemark");
                                setPolygon([]);
                                onChange?.("placemark", points);
                            }}
                        />
                        ЖК
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="mode"
                            value="polygon"
                            checked={mode === "polygon"}
                            onChange={() => {
                                setMode("polygon");
                                setPoints([]);
                                onChange?.("polygon", polygon);
                            }}
                        />
                        Обводка
                    </label>
                </div>
            </div>

            <YMaps query={{ apikey: "4d365d2d-b723-461d-b441-c61107452f60" }}>
                <Map
                    defaultState={{ center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM }}
                    className={cx("map")}
                    onClick={handleMapClick}
                >
                    {points.map((point, index) => (
                        <Placemark
                            key={index}
                            geometry={point}
                            options={ICON_PRESET}
                            draggable
                            onDragEnd={(event: any) => handlePlacemarkDrag(index, event)}
                            onClick={() => {
                                const newPoints = points.filter((_, i) => i !== index);
                                setPoints(newPoints);
                                onChange?.("placemark", newPoints);
                            }}
                        />
                    ))}

                    {polygon.length > 2 && (
                        <Polygon
                            geometry={[polygon]}
                            options={{
                                fillColor: "#b3e0fc",
                                strokeColor: "#2683cc",
                                strokeWidth: 4,
                                fillOpacity: 0.75,
                            }}
                        />
                    )}

                    {polygon.map((point, index) => (
                        <Placemark
                            key={index}
                            geometry={point}
                            options={ICON_PRESET}
                            draggable
                            onDragEnd={(event: any) => handlePolygonVertexDrag(index, event)}
                            onClick={() => {
                                const newPolygon = polygon.filter((_, i) => i !== index);
                                setPolygon(newPolygon);
                                onChange?.("polygon", newPolygon);
                            }}
                        />
                    ))}
                </Map>
            </YMaps>
        </div>
    );
};
