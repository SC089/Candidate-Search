import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailedCandidate, setDetailedCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const data = await searchGithub();
        setCandidates(data);
      } catch (err) {
        setError('Failed to load candidates. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const fetchDetailedCandidate = async (username: string) => {
    try {
      const details = await searchGithubUser(username);
      setDetailedCandidate(details);
    } catch (err) {
      console.error('Failed to fetch detailed candidate info', err);
    }
  };

  useEffect(() => {
    if (candidates.length > 0) {
      fetchDetailedCandidate(candidates[currentIndex].login);
    }
  }, [currentIndex, candidates]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const handleAccept = () => {
    const acceptedCandidate = candidates[currentIndex];
    setSavedCandidates((prev) => {
      const updatedList = [...prev, acceptedCandidate];
      localStorage.setItem('savedCandidates', JSON.stringify(updatedList));
      return updatedList;
    })
    showNextCandidate();
  };

  const handleSkip = () => {
    console.log('Skipped:', candidates[currentIndex]);
    showNextCandidate();
  };

  const showNextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCandidates([]);
    }
  };

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p>{error}</p>;
  if (candidates.length === 0) return <p>No more candidates to review.</p>;

  return (
    <div>
      <h1>Candidate Search</h1>
      {detailedCandidate ? (
        <div>
          <img
            src={detailedCandidate.avatar_url}
            alt={`${detailedCandidate.login}'s avatar`}
            style={{ width: '100px', height: '100px' }}
          />
          <p><strong>Name:</strong> {detailedCandidate.name || 'Not available'}</p>
          <p><strong>Username:</strong> {detailedCandidate.login}</p>
          <p><strong>Email:</strong> {detailedCandidate.email || 'Not available'}</p>
          <p><strong>Location:</strong> {detailedCandidate.location || 'Not available'}</p>
          <p><strong>Company:</strong> {detailedCandidate.company || 'Not available'}</p>
          <p>
            <strong>GitHub URL:</strong>{' '}
            <a href={detailedCandidate.html_url} target="_blank" rel="noopener noreferrer">
              {detailedCandidate.html_url}
            </a>
          </p>
        </div>
      ) : (
        <p>Loading detailed candidate info...</p>
      )}
      <div>
        <button onClick={handleAccept}>+</button>
        <button onClick={handleSkip}>-</button>
      </div>
      <div>
        <h2>Saved Candidates</h2>
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <img
              src={candidate.avatar_url}
              alt={`${candidate.login}'s avatar`}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <p>
                {candidate.name || candidate.login} -{' '}
                <a href={candidate.html_url} target="_blank" rel="noopener roreferrer">
                  Profile
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CandidateSearch;
