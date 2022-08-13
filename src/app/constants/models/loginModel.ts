export interface loginRequestModel{
    username : string | null | undefined,
    password : string | null | undefined
}

export interface loginResponseModel{
    username : string,
    password: string
}