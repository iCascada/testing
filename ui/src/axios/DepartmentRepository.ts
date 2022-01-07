import {IDepartment} from "../types/appTypes"
import {request} from "./config"
import {availableRoutes} from "./serviceRoutes"

export const fetchDepartments = async (): Promise<Array<IDepartment>> => {
    const res = await request.get(availableRoutes.getDepartments)

    return res.data
}