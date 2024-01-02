import { Button } from "@mui/material"
import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";

export default function SideBar() {



    return (
        <>
            <div className={styles.sideBarAria}>

                <div className="" >
                    <Link to={"/"}>
                        <Button className={styles.sideBarButton}>Home</Button>
                    </Link>
                </div>
                <div className="absolute bottom-0 w-full">
                    <Button className={styles.sideBarButton}  >Log</Button>
                    <Button className={styles.sideBarButton}  >Setting</Button>
                </div>

            </div >
        </>
    )
}