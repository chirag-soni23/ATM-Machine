import { Camera, Mail, Phone, User } from "lucide-react";
import { UserData } from "../context/UserContext";
import { useState } from "react";
import avatar from '../assets/avatar.png'

// Modal Component with Animations and Styling
const Modal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed p-4 inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-100 p-4 rounded-lg relative max-w-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="absolute top-0 right-0 text-2xl text-gray-600 hover:text-black transition-all"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Profile"
          className="w-full h-auto max-h-96 object-cover rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, updateProfilePic, btnLoading } = UserData();
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await updateProfilePic(file); 
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false); 

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={user.image?.url || avatar}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 cursor-pointer transition-transform transform hover:scale-110"
                onClick={openModal} // Open modal on image click
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${uploading || btnLoading ? "opacity-50 pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading || btnLoading}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {uploading || btnLoading
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User information */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {user.name || "N/A"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {user.email || "N/A"}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Mobile Number
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {user.mobileNumber || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to display profile picture */}
      <Modal isOpen={isModalOpen} onClose={closeModal} imageUrl={user.image?.url || "/default-avatar.png"} />
    </div>
  );
};

export default Profile;
