import {Paths} from '../routes/paths'
import React from 'react'
import {AvailableModes} from "../store/actions/modeActions"
import {departmentMapper, rolesMapper} from "../lang/rus"

export type RouteType = {
    path: Paths,
    component: React.FC
}

export type modeType = {
    mode: AvailableModes
}

export interface IAuthState {
    isAuth: boolean;
    user?: IUser;
    authError?: string;
}

export interface IDepartment {
    id: number,
    name: string,
    created_at: string,
    updated_at: string
}

export interface IError {
    message: string
}

export type AuthResponse = {
    user: IUser
}

type Roles = keyof typeof rolesMapper
type Departments = keyof typeof departmentMapper

export interface IUser {
    id: number,
    email: string,
    name: string,
    lastName: string,
    department: typeof departmentMapper[Departments],
    role: typeof rolesMapper[Roles]
}
