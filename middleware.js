export { default } from "next-auth/middleware"

export const config = { matcher: 
    [
        "/dashboard/:path*",
        "/create-profile",
        "/create-daycare-profile",

    ] 
}