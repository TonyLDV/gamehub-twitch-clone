"use client";
import React, { ElementRef, useRef, useState, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Hint } from "../providers/hint";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";

type InformationModalProps = {
  initialName: string;
  initialThumbnailUrl: string | null;
};

const InformationModal = ({
  initialName,
  initialThumbnailUrl,
}: InformationModalProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name: title })
        .then(() => {
          toast.success("Stream updated!");
          closeRef?.current?.click();
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("Thumbnail removed");
          setThumbnailUrl("");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-md p-2 h-auto w-auto cursor-pointer">
          <Pencil />
        </div>
      </DialogTrigger>

      <div className="text-sm lg:text-lg font-semibold capitalize">
        <h2>Edit your stream info</h2>

        <p className="text-muted-foreground text-xs lg:text-sm">
          Maximize your visability
        </p>
      </div>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream information</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-10">
          <div className="space-y-2">
            <Label>Title</Label>

            <Input
              placeholder="Stream title"
              onChange={onChange}
              value={title}
              disabled={isPending}
            />
            <div className="space-y-2">
              <Label>Thumbnail</Label>

              {thumbnailUrl ? (
                <div className="relative aspect-video  rounded-xl overflow-hidden border border-white/10">
                  <div className="absolute top-2 right-2 z-[10]">
                    <Hint label="Remove thumbnail" asChild side="left">
                      <Button
                        type="button"
                        disabled={isPending}
                        onClick={onRemove}
                        className="h-auto w-auto p-1.5"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </Hint>
                  </div>

                  <Image
                    src={thumbnailUrl}
                    alt="thumbnail"
                    className="object-cover"
                    fill
                  />
                </div>
              ) : (
                <div className="rounded.xl border outline-dashed outline-muted">
                  <UploadDropzone
                    endpoint="thumbnailUploader"
                    appearance={{
                      label: { color: "#fff" },
                      allowedContent: { color: "#fff" },
                    }}
                    onClientUploadComplete={(res) => {
                      setThumbnailUrl(res?.[0]?.url);
                      router.refresh();
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex  justify-between">
              <DialogClose asChild ref={closeRef}>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>

              <Button variant="primary" type="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InformationModal;
