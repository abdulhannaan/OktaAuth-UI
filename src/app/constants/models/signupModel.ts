export interface SignUpRequestModel{
    
      profile:ProfileRequestModel
      credentials :CredentialModel
}

export interface  ProfileRequestModel{
    login:string,
    firstName:string,
    lastName : string,
    email:string

}  
export interface CredentialModel{
    password : PasswordModel
}

export interface PasswordModel{
    value : string
}