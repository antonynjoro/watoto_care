

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import axios from "axios";
import toast from "react-hot-toast";
import CreateProfileForm from "./CreateProfileForm";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-gray-200 w-auto h-auto">
      <div className="mx-auto max-w-7xl px-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
              <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Create your Profile
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:p-6">
              <CreateProfileForm 
                session={session}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
