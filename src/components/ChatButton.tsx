import { ChatIcon } from "@/components/icons";

type ChatButtonProps = {
  href: string | null;
  className?: string;
};

export function ChatButton({ href, className = "" }: ChatButtonProps) {
  if (!href) {
    return (
      <span
        className={`inline-flex min-h-11 items-center justify-center rounded-full border border-line px-2 text-xs font-medium text-muted ${className}`}
      >
        Kontak belum tersedia
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover ${className}`}
    >
      <ChatIcon className="h-4 w-4" />
      Tanya Ketersediaan
    </a>
  );
}
