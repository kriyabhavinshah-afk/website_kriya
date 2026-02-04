import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col justify-center py-24">
      <Container>
        <h1 className="font-open-sans text-3xl sm:text-4xl text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-muted mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="text-foreground hover:text-accent transition-colors"
        >
          Return home
        </Link>
      </Container>
    </section>
  );
}
