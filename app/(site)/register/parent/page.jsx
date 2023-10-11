import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import RegisterForm from "../RegisterForm";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { redirect } from 'next/navigation'
import Link from "next/link";



export default async function Register() {
  const session = await getServerSession(authOptions);

  console.log(`Session before redirect: ${session}`)
 

  //redirrect to dashboard if user is logged in
  if (session) {

    console.log("redirecting")
    redirect("/dashboard");
  }

  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create an Account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Want to list your Daycare?{" "}
                <Link
                  href="/create-daycare-profile"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Register for Free Here.
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <RegisterForm />
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-900">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <GoogleLoginButton callbackUrl={"/"}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
