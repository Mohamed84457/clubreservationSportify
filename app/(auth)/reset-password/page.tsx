// app/email-verification/page.tsx
import { Suspense } from "react";
import ResetPassword from "./ResetPassword"; 

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}