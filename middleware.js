export { default } from "next-auth/middleware"

export const config = { matcher: 
    [
        "/dashboard",
        "/create-profile",
        "/create-daycare-profile",

    ] 
}