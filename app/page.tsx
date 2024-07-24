import Image from "next/image";
import Groups from "./groups";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Groups />
    </main>
  );
}
