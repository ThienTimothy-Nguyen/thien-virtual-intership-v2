import NavBar from "@/components/global/NavBar";
import SearchBar from "@/components/bookSearch/SearchBar";
import AudioPlayer from "@/components/player/AudioPlayer";
import SearchPanel from "@/components/bookSearch/SearchPanel";

export default async function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
        <NavBar />
        <main 
          className="flex md:pl-52 w-full flex-col items-center ease-in-out duration-400">
            <SearchBar />
            <div className="relative w-full">
              <SearchPanel />
              {children}
            </div>
        </main>
        <AudioPlayer />
    </div>
  );
}