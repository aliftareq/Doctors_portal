import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">

        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={
              user?.photoURL ||
              "https://i.ibb.co/2kR7dQH/default-avatar.png"
            }
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-primary object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold mt-4">
          {user?.displayName || "Anonymous User"}
        </h2>

        {/* Email */}
        <p className="text-gray-500">{user?.email}</p>

        <div className="divider"></div>

        {/* Extra Info Section */}
        <div className="text-left space-y-2">
          <p>
            <span className="font-semibold">User ID:</span>{" "}
            {user?.uid}
          </p>

          <p>
            <span className="font-semibold">Email Verified:</span>{" "}
            {user?.emailVerified ? "Yes ✅" : "No ❌"}
          </p>

          <p>
            <span className="font-semibold">Provider:</span>{" "}
            {user?.providerData?.[0]?.providerId}
          </p>
        </div>

        {/* Button */}
        <div className="mt-5">
          <button className="btn btn-primary w-full">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;