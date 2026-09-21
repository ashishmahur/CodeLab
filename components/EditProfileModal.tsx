 "use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type EditProfileModalProps = {
  userId: string;
  initialName: string;
  initialBio: string;
  variant?: "profile" | "about";
};

export default function EditProfileModal({
  userId,
  initialName,
  initialBio,
  variant = "profile",
}: EditProfileModalProps) {
  const router = useRouter();
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function openModal() {
    setName(initialName);
    setBio(initialBio);
    setError("");
    setOpen(true);
  }

  function closeModal() {
    if (!saving) {
      setOpen(false);
    }
  }

  async function handleSave() {
    const trimmedName = name.trim();
    const trimmedBio = bio.trim();

    if (!trimmedName) {
      setError("Name cannot be empty.");
      return;
    }

    setSaving(true);
    setError("");

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        full_name: trimmedName,
        bio: trimmedBio,
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      setError(profileError.message);
      setSaving(false);
      return;
    }

    const { error: authError } = await supabase.auth.updateUser({
      data: {
        full_name: trimmedName,
      },
    });

    if (authError) {
      setError(authError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={
          variant === "profile"
            ? "hidden h-11 items-center gap-2 rounded-xl border border-orange-500/50 bg-orange-500/[0.06] px-5 text-sm font-medium text-zinc-200 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400 sm:flex"
            : "flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-400 transition hover:border-orange-500/40 hover:text-orange-400"
        }
      >
        <Pencil className={variant === "profile" ? "h-4 w-4" : "h-3.5 w-3.5"} />
        {variant === "profile" ? "Edit Profile" : "Edit About"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
            className="w-full max-w-lg rounded-2xl border border-orange-500/30 bg-[#0d0f10] p-6 shadow-[0_0_60px_rgba(249,115,22,0.12)]"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                  Profile
                </p>
                <h2
                  id="edit-profile-title"
                  className="mt-1 text-2xl font-semibold text-zinc-100"
                >
                  Edit Profile
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-200 disabled:opacity-50"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Full Name
                </label>
                <input
                  id="profile-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={80}
                  className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-orange-500/60"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-bio"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  About
                </label>
                <textarea
                  id="profile-bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  maxLength={500}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-orange-500/60"
                  placeholder="Tell people a little about yourself..."
                />
              </div>

              {error && (
                <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-400">
                  {error}
                </p>
              )}
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl border border-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-200 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
