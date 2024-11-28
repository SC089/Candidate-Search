import React, { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  if (savedCandidates.length === 0) {
    return <p>No candidates have been saved yet.</p>;
  }

  return (
    <div>
      <h1>Saved Candidates</h1>
      <ul>
        {savedCandidates.map((candidate) => (
          <li key={candidate.id} style={{ margin: '10px 0' }}>
            <img
              src={candidate.avatar_url}
              alt={`${candidate.login}'s avatar`}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
            <p><strong>Name:</strong> {candidate.name || candidate.login}</p>
            <p>
              <strong>Profile:</strong>{' '}
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                {candidate.html_url}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
