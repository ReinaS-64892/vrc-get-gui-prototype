import { DataGrid, GridColDef, } from '@mui/x-data-grid';
import { invoke } from "@tauri-apps/api/tauri";
import style from "./MenuPage.module.css";
import { Button } from "@mui/material"
import { Link } from "react-router-dom";

interface ProjectInfo {
    id: number;
    name: string;
    path: string;
    type: string;
    unityVersion: string;
    lastModified: string;
}
export function openProject(id: number) {
    invoke('editor_open_command', { path: projectList[id].path })
}
export const projectList: ProjectInfo[] = [
    {
        id: 1,
        name: "Milk - TTT Develop",
        path: "F:/unityproject/Milk - TTT Develop",
        type: "Avatar",
        unityVersion: "2022.3.6f1",
        lastModified: "NYAANYANAYA"
    },
    {
        id: 2,
        name: "Lime - ReinaSEdit",
        path: "F:/unityproject/Lime - ReinaSEdit",
        type: "Avatar",
        unityVersion: "2022.3.6f1",
        lastModified: "NYAANYANAYA"
    },
    {
        id: 3,
        name: "Kikyo - ReinaSEdit",
        path: "F:/unityproject/Kikyo - ReinaSEdit",
        type: "Avatar",
        unityVersion: "2022.3.6f1",
        lastModified: "NYAANYANAYA"
    },
    {
        id: 4,
        name: "PackageManagerUITest",
        path: "F:/unityproject/PackageManagerUITest",
        type: "Avatar",
        unityVersion: "2022.3.6f1",
        lastModified: "NYAANYANAYA"
    },
    {
        id: 5,
        name: "NYANYANYANAYAAAAAA",
        path: "F:\\unityproject\\にゃ...?",
        type: "Avatar",
        unityVersion: "2022.3.6f1",
        lastModified: "NYAANYANAYA"
    },

]


export default function ProjectList() {

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', minWidth: 250, editable: false, sortable: false, },
        { field: 'path', headerName: 'Path', minWidth: 250, editable: false, sortable: false, },
        { field: 'type', headerName: 'Type', width: 100, editable: false, sortable: false, },
        { field: 'unityVersion', headerName: 'UnityVersion', width: 120, editable: false, sortable: false, },
        // { field: 'lastModified', headerName: 'LastModified', width: 150, editable: false,  sortable: false},
        {
            field: 'projectOpne',
            headerName: 'Open',
            sortable: false,
            width: 90,
            renderCell: (params) => <Button className={style.ProjectManageButton} onClick={() => { openProject((params.id as number) - 1) }}>Open</Button>
        },
        {
            field: 'manage',
            headerName: 'Manage',
            sortable: false,
            width: 90,
            renderCell: (params) => <Link to={"/ProjectManage" + '?' + "projectID=" + ((params.id as number) - 1).toString()}><Button className={style.ProjectManageButton}   >Manage</Button ></Link>
        },
    ]

    return (
        <div className={style.ProjectListRoot}>
            <DataGrid
                rows={projectList}
                columns={columns}

                disableRowSelectionOnClick
                density="compact"
                rowSelection={false}


            />
        </div>
    )
}