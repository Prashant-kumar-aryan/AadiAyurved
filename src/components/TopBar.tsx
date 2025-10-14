import getTopBar from "@/services/GetTobBar";

export default async function Topbar() {
  const title = await getTopBar();
  return (
    <header>
      <h1
        className={`text- text-center font-bold text-white py-2 ${"bg-amber-500"} w-full`}
      >
        {title}
      </h1>
    </header>
  );
}
