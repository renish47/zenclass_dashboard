import Card from "../ui/Card";

export default function SmallCards({ Icon, title, subtext, value }) {
  return (
    <Card className={"h-[170px] "} lightRadius={300}>
      <div className=" h-full text-white grid grid-cols-1 content-center justify-items-center gap-3 ">
        <div className="flex gap-2 justify-center items-center">
          <Icon className="text-[#55c1d9]" />
          <h4>{title}</h4>
        </div>
        <h2 className="text-3xl font-semibold">{value}</h2>
        <p className="text-xs text-gray-500">{subtext}</p>
      </div>
    </Card>
  );
}
