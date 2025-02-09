import React from 'react';
import { toast } from 'react-toastify';

function ExamplePage() {
  const showSuccessToast = () => {
    toast.success('Operation was successful!');
  };

  const showErrorToast = () => {
    toast.error('Something went wrong!');
  };

  return (
    <div>
      <h1>Toast Notifications in Next.js</h1>
      <button onClick={showSuccessToast}>Show Success Toast</button>
      <button onClick={showErrorToast}>Show Error Toast</button>
    </div>
  );
}

export default ExamplePage;
