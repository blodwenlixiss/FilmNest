const ProfileInfo: React.FC<{ input: string }> = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">Full Name</p>
          <p className="text-white">John Doe</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-sm text-white px-4 py-1 rounded">
          Change
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
