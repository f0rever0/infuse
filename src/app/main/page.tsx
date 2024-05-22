import { Suspense } from "react";
import MainLayout from "./layout";

export default function MainPage() {
  return (
    <MainLayout>
      <section>
        <Suspense fallback={<p>Loading...</p>}>
          <p>main page</p>
        </Suspense>
      </section>
    </MainLayout>
  );
}
