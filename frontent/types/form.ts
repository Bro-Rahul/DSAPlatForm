export type LoginForm = {
    email : string,
    password : string
}

export type RegisterForm = {
    username : string,
    email : string,
    password : string,
}

export type SocialLoginType = {
    username : string,
    email : string,
    providers : "G"|"GH" // G->Google,GH->GITHUB
    image : string | null | undefined,
    password : string
}