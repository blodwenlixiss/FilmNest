import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { getProfileInfo, logout, updateProfileInfo } from "@/api/account";
import { userAtom } from "@/api";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { ProfileType } from "../../types/profilePage/profile.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";

const ProfilePage = () => {
  const [user] = useAtom(userAtom);
  const [profile, setProfile] = useState<ProfileType>();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditInfo = () => {
    setIsEditing((prevInfo) => !prevInfo);
  };

  const { control, handleSubmit } = useForm<ProfileType>();

  useEffect(() => {
    if (user?.user?.id) {
      getProfileInfo(user.user.id).then((res) => {
        if (res?.data && res.data.length > 0) {
          setProfile({
            avatar_url: res?.data[0].avatar_url ?? null,
            full_name: res?.data[0].full_name ?? null,
            username: res?.data[0].username ?? null,
            id: res?.data[0].id,
            updated_at: res?.data[0].updated_at,
          });
        }
      });
    }
  }, [user]);

  const { mutate: handleSignOut } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });

  const { mutate: handleUpdateProfile } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: updateProfileInfo,
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  const handleUpdate = (updateProfileValue: ProfileType) => {
    handleUpdateProfile({
      ...updateProfileValue,
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col items-start p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            {!profile?.avatar_url ? (
              <img
                className="w-24 h-24 rounded-full"
                src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix"
                alt="avatar"
              />
            ) : (
              <img
                src={profile?.avatar_url}
                className="w-24 h-24 rounded-full"
                alt="profile-image"
              />
            )}
            {isEditing ? (
              <Label
                htmlFor="input-file"
                className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-red-500  hover:bg-red-400 font-bold text-xl text-white px-2 rounded-full"
              >
                +
              </Label>
            ) : null}
            <Controller
              control={control}
              name="avatar_url"
              render={({ field }) => (
                <Input
                  {...field}
                  type="file"
                  id="input-file"
                  className="hidden"
                  value={field.value || ""}
                />
              )}
            />
          </div>
          <div>
            <p className="text-2xl font-bold">{profile?.full_name}</p>
            <p className="text-gray-400">@{profile?.username}</p>
          </div>
        </div>
        <div>
          {profile && (
            <div className="mt-4">
              <h3 className="text-lg flex gap-3 items-center font-semibold mb-10">
                Profile Details:
                <div
                  onClick={() => handleEditInfo()}
                  className="bg-red-600 hover:bg-red-500 flex items-center rounded-lg cursor-pointer p-4 font-bold h-7"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </div>
              </h3>
              {isEditing ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label>Name</Label>
                    <Controller
                      control={control}
                      name="full_name"
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Full Name"
                          className="rounded-xl h-10"
                          value={field.value || ""}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label>UserName</Label>
                    <Controller
                      control={control}
                      name="username"
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Username"
                          className="rounded-xl h-10"
                          value={field.value || ""}
                        />
                      )}
                    />
                  </div>
                </div>
              ) : (
                <ul className="list-disc flex flex-col gap-5 pl-5 space-y-1">
                  {["full_name", "username"].map((key) => (
                    <li key={key} className="text-sm">
                      <span className="font-bold capitalize">
                        {key.replace("_", " ")}:
                      </span>{" "}
                      {profile[key as keyof ProfileType] || "N/A"}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="mt-8 w-full flex justify-between">
          <Button
            type="submit"
            disabled={!isEditing}
            className={`p-4 ${
              isEditing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white py-2`}
          >
            Save Changes
          </Button>
          <Button
            onClick={() => handleSignOut()}
            className="p-4 bg-red-600 hover:bg-red-500 text-white py-2"
          >
            Log Out
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;
