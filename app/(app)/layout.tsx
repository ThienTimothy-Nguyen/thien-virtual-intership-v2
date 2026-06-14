import NavBar from "@/components/global/NavBar";
import RouteChangeWatcher from "@/components/global/RouteChangeWatcher";
import SearchBar from "@/components/global/SearchBar";
import WatchAuthChange from "@/components/global/AuthChangeWatcher";
import AudioPlayer from "@/components/player/AudioPlayer";
import ScrollLockWatcher from "@/components/global/ScrollLockWatcher";

export default async function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
        <ScrollLockWatcher />
        <WatchAuthChange />
        <RouteChangeWatcher/ >
        <NavBar />
        <main 
          className="flex md:pl-52 w-full flex-col items-center ease-in-out duration-400">
            <SearchBar />
            {children}
        </main>
        <AudioPlayer />
    </div>
  );
}