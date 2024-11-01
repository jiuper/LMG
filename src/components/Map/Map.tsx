import { Map, YMaps } from "@pbe/react-yandex-maps";
import cnBind from "classnames/bind";

import styles from "./Map.module.scss";

const cx = cnBind.bind(styles);
type Props = {};
export const MapWrapper = ({}: Props) => {
    return (
        <div className={cx("map")}>
            <YMaps query={{ apikey: "4d365d2d-b723-461d-b441-c61107452f60" }}>
                <div className={cx("map-container")}>
                    <Map onLoad={() => {}} className={cx("map-wrapper")} state={{ center: [59.57, 30.19], zoom: 9 }} />
                </div>
            </YMaps>
        </div>
    );
};
