import { Camera, Loader2, Mail, Pencil, Phone, User } from "lucide-react";
import { UserData } from "../context/UserContext";
import { useState } from "react";
import avatar from "../assets/avatar.png";

const Profile = () => {
  const { user, editProfile, updateProfilePic, btnLoading } = UserData();
  const [uploading, setUploading] = useState(false);
  const [editField, setEditField] = useState(null); 
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    mobileNumber: user.mobileNumber || "",
  });
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

  // Handle field change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save field changes
  const saveChanges = async () => {
    try {
      await editProfile(formData);
      setEditField(null);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="h-full pt-20">
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
                onClick={() => setIsModalOpen(true)} 
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  uploading || btnLoading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {uploading
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 h-screen">
              <div className="rounded-lg bg-white p-[0.10rem] relative max-w-md w-full">
                <button
                  className="absolute top-2 right-2 text-accent"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕ 
                </button>
                <img
                  src={user.image?.url || avatar}
                  alt="Profile"
                  className="rounded-lg w-full max-h-[80vh]"
                />
              </div>
            </div>
          )}

          {/* User information */}
          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              {editField === "name" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFieldChange}
                    className="px-4 py-2 bg-base-200 rounded-lg border flex-grow"
                  />
                  <button
                    disabled={btnLoading}
                    onClick={saveChanges}
                    className="btn btn-success"
                  >
                    {btnLoading ? <Loader2 /> : "Save"}
                  </button>
                  <button
                    onClick={() => setEditField(null)}
                    className="btn btn-warning"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="flex items-center justify-between px-4 py-2.5 bg-base-200 rounded-lg border">
                  {user.name}
                  <Pencil
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setEditField("name")}
                  />
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              {editField === "email" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFieldChange}
                    className="px-4 py-2 bg-base-200 rounded-lg border flex-grow"
                  />
                  <button
                    disabled={btnLoading}
                    onClick={saveChanges}
                    className="btn btn-success"
                  >
                    {btnLoading ? <Loader2 /> : "Save"}
                  </button>
                  <button
                    onClick={() => setEditField(null)}
                    className="btn btn-warning"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="flex items-center justify-between px-4 py-2.5 bg-base-200 rounded-lg border">
                  {user.email || "N/A"}
                  <Pencil
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setEditField("email")}
                  />
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Mobile Number
              </div>
              {editField === "mobileNumber" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleFieldChange}
                    className="px-4 py-2 bg-base-200 rounded-lg border flex-grow"
                  />
                  <button
                    disabled={btnLoading}
                    onClick={saveChanges}
                    className="btn btn-success"
                  >
                    {btnLoading ? <Loader2 /> : "Save"}
                  </button>
                  <button
                    onClick={() => setEditField(null)}
                    className="btn btn-warning"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="flex items-center justify-between px-4 py-2.5 bg-base-200 rounded-lg border">
                  {user.mobileNumber || "N/A"}
                  <Pencil
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setEditField("mobileNumber")}
                  />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
