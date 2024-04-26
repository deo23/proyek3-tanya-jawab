import Link from "next/link";
import Image from "next/image";

import { SignedIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import Filter from "@/components/shared/Filter";
import ParseHTML from "@/components/shared/ParseHTML";
import Votes from "@/components/shared/Votes";
import Pagination from "@/components/shared/Pagination";
import EditDeleteAction from "@/components/shared/EditDeleteAction";
// import { approveAnswer, approveQuestion } from "@/lib/actions/question.action";

import { getAnswers } from "@/lib/actions/answer.action";
import { getTimestamp } from "@/lib/utils";

import { AnswerFilters } from "@/constants/filters";

import type {
  QuestionId,
  UserId,
  OptionalPage,
  OptionalFilter,
} from "@/lib/actions/shared.types";

interface Props extends QuestionId, UserId, OptionalPage, OptionalFilter {
  totalAnswers: number;
  questionAuthor: string;
}

const AllAnswers = async ({
  userId,
  questionId,
  totalAnswers,
  questionAuthor,
  filter,
  page,
}: Props) => {
  const result = await getAnswers({
    questionId,
    sortBy: filter,
    page,
  });

  return (
    <div className="mt-11" >
      <div className="flex items-center justify-between"  >
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div className="">
        {result.answers.map((answer: any) => {
                    
          const showActionButtons = JSON.stringify(userId) === JSON.stringify(answer.author._id);
          // const myQuestion = JSON.stringify(userId) === questionAuthor;
          const notMyAnswer = JSON.stringify(userId) !== JSON.stringify(answer.author._id);

          return (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.userId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      <span className="max-sm:hidden">• answered </span>
                      {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <h3>
                    {answer.approved && (
                      <img
                        src="/assets/images/approved.png"
                        alt="Approved"
                        width={20}
                        height={20}
                      />
                    )}              
                  </h3>
                  <Votes
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.includes(userId)}
                  />
                </div>
                
              </div>
              <ParseHTML data={answer.content} />

              {/* <SignedIn> */}
                {showActionButtons && (
                  <EditDeleteAction
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                  />
                )}
                {notMyAnswer &&(
                  <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                    Approve
                  </Button>
                )}

              {/* </SignedIn> */}
            </article>
          );
        })}
      </div>

      <div className="mt-10 w-full">
        <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
      </div>
    </div>
  );
};

export default AllAnswers;
