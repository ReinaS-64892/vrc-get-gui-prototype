import style from "./ProjectManage.module.css";
import { projectList } from "../MenuPage/ProjectList";
import { Button } from "@mui/material"
import { DataGrid, GridColDef, } from '@mui/x-data-grid';
import { invoke } from "@tauri-apps/api";
import React from "react";

export interface PackageInfo {
    id: string;
    name: string;
    installed: string;
    locked: string | null;
    requested: string[];
}


async function RemovePackage(id: number, packageName: string) {
    console.log(id);
    console.log(packageName);
    await invoke("remove_package", { path: projectList[id].path, packageName: packageName }) as string;
}

interface prop {
    projectID: number;
    packages: void | PackageInfo[] | undefined;
    packageUpdate: React.Dispatch<React.SetStateAction<void | PackageInfo[] | undefined>>;
}

export default function ProjectInfo(prop: prop) {



    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', minWidth: 450, editable: false, sortable: false, },
        { field: 'installed', headerName: 'Version', minWidth: 250, editable: false, sortable: false, },
        {
            field: 'remove',
            headerName: 'Remove',
            sortable: false,
            width: 90,
            renderCell: (params) => <Button onClick={async () => { await RemovePackage(prop.projectID, params.id as string); prop.packageUpdate(); }}>Remove</Button>
        },
    ]

    return (
        <div className={style.ProjectInfoRoot}>
            {prop.packages !== undefined && typeof prop.packages !== "undefined" &&
                <DataGrid
                    rows={prop.packages}
                    columns={columns}

                    disableRowSelectionOnClick
                    density="compact"
                    rowSelection={false}
                />}
        </div>
    );
}
