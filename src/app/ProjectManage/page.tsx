import * as React from 'react';
import { openProject, projectList } from "../MenuPage/ProjectList";
import ProjectInfo, { PackageInfo } from './ProjectInfo';
import style from "./ProjectManage.module.css";
import { invoke } from '@tauri-apps/api';
import { useSearchParams } from "react-router-dom";
import { Button } from '@mui/material';



async function GetProjectInfo(id: number): Promise<any | void> {
    return invoke('get_project_info', { path: projectList[id].path }).then((val) => {
        console.log(val);
        return JSON.parse(val as string);
    }).catch(() => { return; })
}

async function GetPackages(id: number): Promise<PackageInfo[] | void> {
    const infoObject = await GetProjectInfo(id);

    if (infoObject === undefined) { return; }
    if (infoObject["packages"] === undefined) { return; }

    const packages = infoObject["packages"] as any[];
    const packageArray = Array.from(packages, (x) => {
        const packageInfoValue: PackageInfo = {
            id: x.name,
            name: x.name,
            installed: x.installed,
            locked: x.locked,
            requested: x.requested,
        }
        return packageInfoValue;
    });
    return packageArray;
}

// async function GetProjectUnityVersion(id: number): Promise<string | void> {
//     const infoObject = await GetProjectInfo(id);
//     if (infoObject.unity_version === undefined) { return; }
//     return infoObject.unity_version as string;
// }

async function UpdatePackageAll(id: number) {
    return invoke('update_package_all', { path: projectList[id].path }).then(() => { return; }).catch(() => { return; })
}

export default function ManageProject() {
    const param = useSearchParams();
    const queryID = Number.parseInt(param[0].get("projectID") as string);

    const [packages, setPackages] = React.useState<PackageInfo[] | void>();

    const asyncUpdatePackage = async () => {
        const pks = await GetPackages(queryID);
        setPackages(pks);
    };
    const updatePackage = () => {
        asyncUpdatePackage();
    };

    React.useEffect(updatePackage, [queryID]);

    return (
        <div className={style.ProjectManageRoot}>
            <div className={style.ProjectManageTopBar}>
                <div className=" text-nowrap mx-1">{projectList[queryID].name}</div>
                <div className="mx-1" ><Button onClick={async () => { updatePackage() }} >Refresh</Button></div>
                <div className={style.ProjectManageTopBarRight}>
                    <Button onClick={async () => { await UpdatePackageAll(queryID); updatePackage() }}>UpdatePackageAll</Button>
                    <Button onClick={async () => { openProject(queryID) }}>ProjectOpen</Button>
                </ div>
            </div>
            <ProjectInfo projectID={queryID} packages={packages} packageUpdate={updatePackage} />
        </div >
    )
}
