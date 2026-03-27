// Thanks @fumadocs & @ncdai

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  Cancel01Icon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

const cache = new Map<string, string>();

type CopyState = "idle" | "done" | "error";

export function LLMCopyButton({ markdownUrl }: { markdownUrl: string }) {
  const [state, setState] = React.useState<CopyState>("idle");
  const [isCopying, setIsCopying] = React.useState(false);
  const operationRef = React.useRef(false);

  const handleCopy = async () => {
    if (operationRef.current) return;

    operationRef.current = true;

    const loadingTimer = setTimeout(() => {
      setIsCopying(true);
    }, 150);

    try {
      const cached = cache.get(markdownUrl);
      if (cached) {
        await navigator.clipboard.writeText(cached);
      } else {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": fetch(markdownUrl)
              .then((res) => res.text())
              .then((content) => {
                cache.set(markdownUrl, content);
                return content;
              }),
          }),
        ]);
      }
      setState("done");
    } catch {
      setState("error");
    } finally {
      clearTimeout(loadingTimer);
      setIsCopying(false);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      operationRef.current = false;
      setState("idle");
    }
  };

  return (
    <button
      className="flex h-8 cursor-pointer items-center gap-2 rounded-l-full pr-2 pl-2.5 font-geist-sans text-sm font-medium disabled:pointer-events-none disabled:opacity-50"
      aria-busy={isCopying}
      disabled={isCopying}
      onClick={handleCopy}
    >
      {state === "idle" ? (
        <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} className="mt-0.5" />
      ) : state === "done" ? (
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="mt-0.5" />
      ) : (
        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="mt-0.5" />
      )}
      Copy Page
    </button>
  );
}

function getPrompt(url: string) {
  return `I'm looking at this API documentation: ${url}

I want to integrate this page view tracking API into my project.

Help me understand step-by-step:
- How to correctly send requests to track page views
- How to fetch and display view counts
- How to structure requests (headers, body, params)
- How deduplication and unique visitor tracking works

Provide practical examples using JavaScript/TypeScript (preferably React if relevant).

Also:
- Point out common mistakes (like duplicate counting, wrong usage, etc.)
- Suggest best practices for accurate tracking
- Help debug issues if the implementation doesn't work as expected

Be ready to answer follow-up questions based on this API.`;
}

export function ViewOptions({ markdownUrl }: { markdownUrl: string }) {
  const items = React.useMemo(() => {
    const fullMarkdownUrl =
      typeof window !== "undefined"
        ? new URL(markdownUrl, window.location.origin).toString()
        : markdownUrl;

    const q = getPrompt(fullMarkdownUrl);

    const _items = [
      {
        title: "View as Markdown",
        href: fullMarkdownUrl,
        icon: Icons.markdown,
      },
      {
        title: "Open in ChatGPT",
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: "search",
          q,
        })}`,
        icon: Icons.openai,
      },
      {
        title: "Open in Claude",
        href: `https://claude.ai/new?${new URLSearchParams({
          q,
        })}`,
        icon: Icons.claude,
      },
      {
        title: "Open in Cursor",
        href: `https://cursor.com/link/prompt?${new URLSearchParams({
          text: q,
        })}`,
        icon: Icons.cursor,
      },
    ];

    return _items;
  }, [markdownUrl]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "secondary",
            className:
              "flex size-8 cursor-pointer items-center justify-center gap-2 rounded-r-full text-sm",
          })
        )}
      >
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          strokeWidth={2}
          className="mt-0.5 mr-1 size-4"
        />
        <span className="sr-only">View Options</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit font-geist-sans"
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
      >
        {items.map(({ title, href, icon: Icon }) => (
          <DropdownMenuItem key={href}>
            <a
              href={href}
              rel="noreferrer noopener"
              target="_blank"
              className="flex items-center gap-2"
            >
              <Icon />
              {title}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LLMCopyButtonWithViewOptions({
  markdownUrl,
}: {
  markdownUrl: string;
}) {
  return (
    <div
      className={cn(
        buttonVariants({
          variant: "secondary",
          className:
            "gap-0 divide-x overflow-hidden px-0 font-geist-sans dark:divide-white/10",
        })
      )}
    >
      <LLMCopyButton markdownUrl={markdownUrl} />
      <ViewOptions markdownUrl={markdownUrl} />
    </div>
  );
}
