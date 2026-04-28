"use client";

interface IError {
  error: Error;
  reset: () => void;
}
export default function ErrorPage({ error, reset }: IError) {
  return (
    <div>
      <p>{error?.message}</p>
      <button
        onClick={() => {
          reset();
        }}
      >
        reset
      </button>
    </div>
  );
}
