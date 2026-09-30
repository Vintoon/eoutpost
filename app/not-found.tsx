import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-outpost-gradient px-6 text-center text-white">
      <Compass size={48} className="opacity-80" />
      <h1 className="font-display text-4xl font-bold">Page Not Found</h1>
      <p className="max-w-md text-white/80">
        The page you&apos;re looking for has wandered off the path. Let&apos;s
        get you back home.
      </p>
      <Button href="/" variant="secondary">
        Return Home
      </Button>
      <Link href="/contact" className="text-sm text-white/70 underline">
        Or contact us for help
      </Link>
    </div>
  );
}
