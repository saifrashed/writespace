import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchSubmissionData = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [fileNotes, setFileNotes] = useState('');

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/submission/findSpecificSubmission', {
          params: {
            userId: 'ales1708',
            assignmentId: 'LeukeShit'
          }
        });

        if (response.status === 200) {
          const data = response.data;
          const binaryData = new Uint8Array(data[0].fileData.data);
          const fileBlob = new Blob([binaryData], { type: 'application/pdf' });
          const fileUrl = URL.createObjectURL(fileBlob);

          setFileUrl(fileUrl);
          setFileNotes(data[0].fileNotes);
        } else {
          console.error('Failed to fetch submission data');
        }
      } catch (error) {
        console.error('Error fetching submission data:', error);
      }
    };

    fetchSubmissionData();
  }, []);

  return { fileUrl, fileNotes };
};

export default useFetchSubmissionData;
