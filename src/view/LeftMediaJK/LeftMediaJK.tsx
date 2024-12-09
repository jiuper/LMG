import cnBind from "classnames/bind";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { MapView } from "@/components/MapView";
import type { GetBuildDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./LeftMediaJK.module.scss";

const cx = cnBind.bind(styles);

type Props = {
    units: GetBuildDto;
};
export const LeftMediaJk = ({ units }: Props) => {
    const [isOpen, open, close] = useBooleanState(false);

    return (
        <div className={cx("left-media-jk")}>
            <div className={cx("wrapper-map")}>
                <div className={cx("wrapper", "container")}>
                    <div className={cx("header")}>
                        <h3>{units.name}</h3>
                    </div>
                    <div className={cx("map-content")}>
                        <MapView
                            list={units.list}
                            center={units?.coordinates[0]}
                            zoom={17}
                            build={[units].map((item) => ({
                                id: item.id,
                                name: item.name,
                                coordinates: item.coordinates,
                                list: item.list,
                            }))}
                            name={units.name}
                            maxZoom={17}
                            minZoom={17}
                        />
                    </div>
                    <div className={cx("footer")}>
                        <p>{units.wDescription}</p>
                    </div>
                    <Button label="Оставить заявку" onClick={open} className={cx("button")} />
                </div>
            </div>
            <div className={cx("container-lift")}>
                <div className={cx("wrapper", "container")}>
                    <CustomImage
                        className={cx("image")}
                        width={1200}
                        height={423}
                        src={`${API_BASE}/picture/${units?.pictureId}`}
                        alt={units.name}
                    />

                    <div className={cx("description")}>
                        <h2>{units.gTitle}</h2>
                        <span>{units.gSubTitle}</span>
                    </div>
                </div>
            </div>
            <div className={cx("form")}>
                <FormFeedback />
            </div>
            <ModalFeedBack isOpen={isOpen} onClose={close} />
        </div>
    );
};
