import Image from "next/image";

export default async function Navbar() {
  return (
    <nav>
      {/* logo */}
      <div>
        <Image src="favicon.ico" width={10} height={10} alt="Logo" />
      </div>
      <h1>This is Navbar</h1>
    </nav>
  );
}
