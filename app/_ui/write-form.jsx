"use client";

import Loading from "./loading";

import { publishPostAction } from "../_lib/actions";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { PostContext } from "../_provider/post-context-provider";

import dynamic from "next/dynamic";

import { useFormState } from "react-dom";
import { useContext, useEffect } from "react";
import { useEdgeStore } from "../_lib/edgestore";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { TagsInput } from "react-tag-input-component";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default function WriteForm() {
  const {
    userId,
    loadingPostUnpublishedPost,
    unpublishedPost,
    setUnpublishedPost,
    loadingPostHeaderImageURL,
    setLoadingPostHeaderImageURL,
  } = useContext(PostContext);

  const updatePublishPostActionWithId = publishPostAction.bind(null, userId);

  const { toast } = useToast();
  const { edgestore } = useEdgeStore();
  const [state, dispatch] = useFormState(updatePublishPostActionWithId, null);

  const debouncedOnChangeTextarea = useDebouncedCallback((title) => {
    setUnpublishedPost({ ...unpublishedPost, title });
  }, 1000);

  useEffect(() => {
    if (state?.errorValidation?.userId) {
      toast({
        title: "Something went wrong",
        description: state?.errorValidation?.userId[0],
      });
    }
    if (state?.errorNoUnpublishedPost) {
      toast({
        title: "Something went wrong",
        description: state?.errorNoUnpublishedPost,
      });
    }
    if (state?.errorSystem) {
      toast({
        title: "Something went wrong",
        description: state?.errorSystem,
      });
    }
  }, [state, toast]);

  return (
    <section className="relative">
      {loadingPostUnpublishedPost ? <Loading /> : null}
      <form className="max-w-[800px] mx-auto flex flex-col gap-y-2 p-4">
        <SingleImageDropzone
          width={450}
          height={250}
          className="mx-auto"
          disabled={loadingPostHeaderImageURL}
          value={unpublishedPost.headerImageURL}
          onChange={async (file) => {
            setLoadingPostHeaderImageURL(true);
            if (file) {
              if (unpublishedPost.headerImageURL) {
                const response = await edgestore.publicImages.upload({
                  file,
                  options: {
                    replaceTargetUrl: unpublishedPost.headerImageURL,
                  },
                });
                setUnpublishedPost({
                  ...unpublishedPost,
                  headerImageURL: response.url,
                });
                setLoadingPostHeaderImageURL(false);
              } else {
                const response = await edgestore.publicImages.upload({
                  file,
                });
                setUnpublishedPost({
                  ...unpublishedPost,
                  headerImageURL: response.url,
                });
                setLoadingPostHeaderImageURL(false);
              }
            } else {
              if (unpublishedPost.headerImageURL) {
                await edgestore.publicImages.delete({
                  url: unpublishedPost.headerImageURL,
                });
                setUnpublishedPost({
                  ...unpublishedPost,
                  headerImageURL: "",
                });
                setLoadingPostHeaderImageURL(false);
              } else {
                setLoadingPostHeaderImageURL(false);
                return;
              }
            }
          }}
        />

        <TagsInput
          name="tags"
          separators={["Tab"]}
          value={unpublishedPost.tags}
          onChange={(tags) => {
            setUnpublishedPost({ ...unpublishedPost, tags });
          }}
          placeHolder="Untagged post (press tab to add)"
        />

        <Textarea
          name="title"
          placeholder="Untitled post"
          defaultValue={unpublishedPost.title}
          onChange={(e) => {
            debouncedOnChangeTextarea(e.target.value);
          }}
          className="mt-4 border-none shadow-none text-4xl focus-visible:ring-0 font-bold resize-none overflow-hidden p-0"
        />

        <Editor
          editable={true}
          unpublishedPost={unpublishedPost}
          setUnpublishedPost={setUnpublishedPost}
        />

        <section>
          <Button formAction={dispatch} className="rounded-2xl mt-16">
            <ArrowTopRightIcon className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </section>
      </form>
    </section>
  );
}
