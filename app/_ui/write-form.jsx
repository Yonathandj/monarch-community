"use client";

import dynamic from "next/dynamic";

import { publishPostAction } from "../_lib/actions";

import { PostContext } from "../_provider/post-context-provider";

import Loading from "./loading";
import PublishButton from "./publish-button";

import { useFormState } from "react-dom";
import { useEdgeStore } from "../_lib/edgestore";
import { useDebouncedCallback } from "use-debounce";
import { useContext, useEffect, useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { TagsInput } from "react-tag-input-component";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

export default function WriteForm() {
  const {
    userId,
    unpublishedPost,
    setUnpublishedPost,
    loadingPostHeaderImageURL,
    loadingPostUnpublishedPost,
    setLoadingPostHeaderImageURL,
  } = useContext(PostContext);

  const updatePublishPostActionWithId = publishPostAction.bind(null, userId);

  const { toast } = useToast();
  const { edgestore } = useEdgeStore();
  const [showEditor, setShowEditor] = useState(false);
  const [state, dispatch] = useFormState(updatePublishPostActionWithId, null);

  const debouncedOnChangeTextarea = useDebouncedCallback((title) => {
    setUnpublishedPost({ ...unpublishedPost, title });
  }, 1000);

  useEffect(() => {
    if (state?.errorValidation?.userId) {
      toast({
        title: "Something went wrong",
        description: state.errorValidation.userId[0],
      });
    }
    if (state?.errorUnpublishedPost) {
      toast({
        title: "Something went wrong",
        description: state.errorUnpublishedPost,
      });
    }
    if (state?.errorTitle) {
      toast({
        title: "Something went wrong",
        description: state.errorTitle,
      });
    }
  }, [state, toast]);

  setTimeout(() => {
    setShowEditor(true);
  }, 1000);

  return (
    <section className="relative">
      {loadingPostUnpublishedPost ? <Loading /> : null}
      <form className="mx-auto flex max-w-[800px] flex-col gap-y-2 p-4">
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
          className="mt-4 resize-none overflow-hidden border-none p-0 text-4xl font-bold shadow-none focus-visible:ring-0"
        />

        {showEditor ? (
          <Editor
            editable={true}
            unpublishedPost={unpublishedPost}
            setUnpublishedPost={setUnpublishedPost}
          />
        ) : null}

        <section className="mt-16">
          <PublishButton dispatch={dispatch} />
        </section>
      </form>
    </section>
  );
}
