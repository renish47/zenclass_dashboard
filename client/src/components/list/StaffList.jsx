const StaffList = ({ name, subtext, image = "/defaultProfile.jpg", email }) => {
  return (
    <div className="flex gap-5 sm:ps-5  items-center ">
      <img
        src={image}
        className="w-14 h-14 rounded-full"
        alt="default profile"
      />
      <div className="flex-col">
        <h4 className="text-lg">{name}</h4>
        <p className="text-sm text-gray-500">{subtext}</p>
        <p className="text-sm text-primary">{email}</p>
      </div>
    </div>
  );
};
export default StaffList;
