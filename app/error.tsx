'use client';

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log(error);
  // In a real application (production ) the error should be logged to a logging service e.g sentry
  return (
    <div>
      An unexpected error has occured
      <p>
        <button
          type='button'
          onClick={() => reset()}
          className='btn btn-success'
        >
          Retry
        </button>
      </p>
    </div>
  );
};

export default ErrorPage;
