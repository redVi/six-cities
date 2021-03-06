import React from "react";
import { CommentType } from "@/types";
import ReviewForm from "@/containers/review-form/review-form";
import withFormData from "@/hocs/with-form-data/with-form-data";
import ReviewItem from "@/components/review-item/review-item";

const Form = withFormData(ReviewForm);

interface Props {
  id: number;
  comments: CommentType[];
  isLoggedIn: boolean;
  maxCount?: number;
}

const Reviews = (props: Props) => {
  const { isLoggedIn, id, maxCount } = props;
  const comments = props.comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, maxCount);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          {comments ? comments.length : null}
        </span>
      </h2>

      <ul className="reviews__list">
        {comments.map((comment) =>
          <ReviewItem comment={comment} key={`comment-${comment.id}`} />
        )}
      </ul>

      {isLoggedIn ? <Form id={id} /> : null}
    </section>
  );
};

export default Reviews;
