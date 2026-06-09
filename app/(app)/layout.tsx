import NavBar from "@/components/global/NavBar";
import RouteChangeWatcher from "@/components/global/RouteChangeWatcher";
import SearchBar from "@/components/global/SearchBar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
        <RouteChangeWatcher/ >
        <NavBar />
        <main className="flex md:pl-52 w-full flex-col items-center ease-in-out duration-400">
            <SearchBar />
            <div className="h-px w-full bg-gray-300"></div>
            {children}
        </main>
    </div>
  );
}