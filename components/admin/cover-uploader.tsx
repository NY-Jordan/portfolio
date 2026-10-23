"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function CoverUploader({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const path = `${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage
      .from("article-covers")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (!error) {
      const { data } = supabase.storage.from("article-covers").getPublicUrl(path);
      onChange(data.publicUrl);
    }
    setUploading(false);
    event.target.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      {value ? (
        <div className="relative size-20 overflow-hidden rounded-sm border border-border">
          <Image src={value} alt="" fill className="object-cover" />
        </div>
      ) : null}
      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <Upload className="size-4" />
        {uploading ? "Uploading…" : value ? "Replace cover" : "Upload cover"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
          disabled={uploading}
        />
      </label>
      {value ? (
        <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
          Remove
        </Button>
      ) : null}
    </div>
  );
}
