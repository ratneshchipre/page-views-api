// Thanks @fumadocs & @ncdai

"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  Cancel01Icon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { CopyStateIcon } from "@/components/copy-button";

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
    <Button
      className="h-8 gap-2 border-none pr-2 pl-2.5 font-geist-sans text-[0.8125rem] [&_svg:not([class*='size-'])]:size-3.5"
      variant="secondary"
      aria-busy={isCopying}
      disabled={isCopying}
      onClick={handleCopy}
    >
      <CopyStateIcon
        state={state}
        idleIcon={<HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />}
        doneIcon={<HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />}
        errorIcon={<HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />}
      />
      Copy Page
    </Button>
  );
}

function getPrompt(url: string) {
  return `I'm looking at the Page Views API documentation: ${url}

This is an open-source, privacy-friendly page view tracking API. I want to integrate it into my project.

Key features of this API:
- Simple script-based integration using a path parameter.
- Focused and fast by tracking once per script instance (no automatic background scanning).
- Privacy-first: Uses SHA-256 hashing for visitor ID (no PII storage).
- 30-minute deduplication window.
- Rate limited (60 req/min).

Help me with:
1. Setting up the tracking script with the required data-path and data-site attributes.
2. Fetching and displaying view counts using the /api/v1/views endpoint.
3. Implementing a "View Counter" component in React/Next.js.

Please provide optimized code examples and warn me about common pitfalls like double counting or improper path normalization.`;
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
        title: "Open in GitHub",
        href: `https://github.com/ratneshchipre/page-views-api/blob/main/src/content/docs/${markdownUrl.split("/").slice(-1).join("/")}`,
        icon: Icons.github,
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
      {
        title: "Open in Grok",
        href: `https://grok.com/?${new URLSearchParams({
          q,
        })}`,
        icon: Icons.grok,
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
            size: "icon",
            className: "border-none font-geist-sans",
          })
        )}
        aria-label="View Options"
      >
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          strokeWidth={2}
          className="size-4"
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
              className="flex w-full cursor-default items-center gap-2"
            >
              <Icon className="size-4" />
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
    <ButtonGroup>
      <LLMCopyButton markdownUrl={markdownUrl} />
      <ButtonGroupSeparator className="border-y-4 border-secondary dark:bg-white/20 data-vertical:my-0" />
      <ViewOptions markdownUrl={markdownUrl} />
    </ButtonGroup>
  );
}
