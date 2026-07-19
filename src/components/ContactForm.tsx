"use client";

import { useState } from "react";
import { site } from "@/data/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `portfolio contact — ${name || "anonymous"}`
    );
    const body = encodeURIComponent(
      `from: ${name}\nemail: ${from}\n\n${message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const inputClass =
    "w-full border-b border-border bg-transparent py-1.5 text-sm text-fg outline-none transition-colors placeholder:text-fg-dim/40 focus:border-terminal";
  const labelClass = "text-xs text-fg-dim";

  return (
    <form onSubmit={send} className="space-y-5">
      <div>
        <label htmlFor="cf-name" className={labelClass}>
          $ set NAME=
        </label>
        <input
          id="cf-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="john_doe"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="cf-from" className={labelClass}>
          $ set REPLY_TO=
        </label>
        <input
          id="cf-from"
          type="email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="you@domain.tld"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="cf-msg" className={labelClass}>
          $ cat message.txt
        </label>
        <textarea
          id="cf-msg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="> type your message here..."
          required
          rows={5}
          className={`${inputClass} resize-none border border-border p-3`}
        />
      </div>
      <button
        type="submit"
        className="rounded-sm border border-terminal px-6 py-2.5 text-sm text-terminal transition-all hover:bg-terminal hover:text-bg hover:box-glow"
      >
        [ send ]
      </button>
      <p className="text-[11px] text-fg-dim/70">
        {"// opens your mail client with the message pre-filled"}
      </p>
    </form>
  );
}
