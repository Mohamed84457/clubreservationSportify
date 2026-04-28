// app/email-verification/page.tsx
import { Suspense } from "react";
import EmailverificationClient from "./EmailverificationClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailverificationClient />
    </Suspense>
  );
}