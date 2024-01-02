import { TextField } from "@mui/material";
import OpenButton from "./OpenButton";
import ProjectList from "./ProjectList";
import style from "./MenuPage.module.css";



export default function Projects() {


    return (
        <div className={style.MenuPageRoot}>

            <div className={style.MenuTopBar}>

                <div className={style.MenuTitleText}>Projects</div>
                <TextField className={style.MenuSearchBox} id="outlined-basic" label="Search" variant="outlined" size="small" fullWidth />
                <OpenButton />

            </div>



            <ProjectList />

        </div >
    )
}