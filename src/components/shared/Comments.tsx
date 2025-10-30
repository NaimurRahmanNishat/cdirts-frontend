/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/shared/Comments.tsx
import { useState } from "react";
import {
  useCreateReviewMutation,
  useAddReplyMutation,
  useGetReviewsByIssueQuery,
} from "@/redux/features/reviews/reviewApi";
import type { IReview } from "@/types";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const Comments = ({ issueId }: { issueId: string }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: reviews, isLoading } = useGetReviewsByIssueQuery(issueId);
  const [createReview] = useCreateReviewMutation();
  const [addReply] = useAddReplyMutation();

  const [comment, setComment] = useState("");
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  if (isLoading) return <Loading />;

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !user?._id) return;
    await createReview({
      issueId,
      data: { comment, author: user._id },
    }).unwrap();
    setComment("");
  };

  const handleReplySubmit = async (reviewId: string) => {
    if (!replyText[reviewId]?.trim() || !user?._id) return;
    await addReply({
      reviewId,
      data: {
        author: user._id,
        comment: replyText[reviewId],
      },
    }).unwrap();
    setReplyText((prev) => ({ ...prev, [reviewId]: "" }));
  };

  return (
    <div className="space-y-8">
      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3 mb-6">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="border p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          rows={3}
        />
        <button
          type="submit"
          className="self-end bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      {reviews && reviews.length > 0 ? (
        reviews.map((review: IReview) => (
          <div
            key={review._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <p className="font-semibold text-gray-800">
              {(review.author as any)?.name || "User"}
            </p>
            <p className="text-gray-600 mt-1">{review.comment}</p>

            {/* Replies */}
            <div className="mt-3 ml-6 border-l pl-3 space-y-2">
              {review.replies.map((reply, idx) => (
                <div key={idx} className="bg-gray-50 p-2 rounded-md">
                  <p className="text-sm text-gray-700 font-medium">
                    {(reply.author as any)?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-600">{reply.comment}</p>
                </div>
              ))}

              {/* Add Reply */}
              <div className="mt-2 flex flex-col gap-2">
                <textarea
                  value={replyText[review._id] || ""}
                  onChange={(e) =>
                    setReplyText((prev) => ({
                      ...prev,
                      [review._id]: e.target.value,
                    }))
                  }
                  placeholder="Write a reply..."
                  className="border p-2 rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={() => handleReplySubmit(review._id)}
                  className="self-end text-sm bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
};

export default Comments;
