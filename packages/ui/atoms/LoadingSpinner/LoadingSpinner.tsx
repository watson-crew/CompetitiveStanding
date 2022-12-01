import ClipLoader from 'react-spinners/ClipLoader';

export default function LoadingSpinner() {
  return (
    <ClipLoader
      color="#ff3e00"
      size={75}
      speedMultiplier={0.75}
      cssOverride={{ borderWidth: '5px' }}
    />
  );
}
