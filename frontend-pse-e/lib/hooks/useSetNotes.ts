import { useEffect } from 'react';

const useSetNotesOnDocumentLoad = (isDocumentLoaded: boolean, fileNotes: Note[], setNotes: (notes: Note[]) => void) => {
  useEffect(() => {
    if (isDocumentLoaded) {
      setNotes(fileNotes);
    }
  }, [isDocumentLoaded, fileNotes]);
};

export default useSetNotesOnDocumentLoad;
