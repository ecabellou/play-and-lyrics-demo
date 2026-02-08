import { useState } from 'react';
import { SongList } from './components/SongList';
import { SongReader } from './components/SongReader';
import { useSongs } from './hooks/useSongs';

function App() {
  const { songs, loading, importFile, updateSong, deleteSong, importBackup } = useSongs();
  const [activeSong, setActiveSong] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-[10px] font-black tracking-widest uppercase opacity-40">Cargando Biblioteca...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!activeSong ? (
        <SongList
          songs={songs}
          onSelect={setActiveSong}
          onImport={importFile}
          onDelete={deleteSong}
          onImportBackup={importBackup}
        />
      ) : (
        <SongReader
          song={activeSong}
          onBack={() => setActiveSong(null)}
          onUpdate={(updatedSong) => {
            updateSong(updatedSong);
            setActiveSong(updatedSong);
          }}
        />
      )}
    </>
  );
}

export default App;
