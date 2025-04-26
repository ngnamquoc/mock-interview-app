import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import {
  getCurrentSigninUser,
  getInterviewsByUserId,
} from "@/lib/actions/auth.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  // get current user and fetch associating interviews
  const user = await getCurrentSigninUser();
  console.log(user?.id);

  const interviews = user?.id ? await getInterviewsByUserId(user.id) : null;

  console.log(interviews);

  const hasPreviousInterview = interviews && interviews.length > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>
            Get interview ready with AI-powered realtime practice & feedback
          </h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>
          <Button className="btn-primary max-sm:w-full">
            <Link href="/interview">Get Started</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot assistance"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="mt-8 flex flex-col gap-6">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPreviousInterview ? (
            interviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet.</p>
          )}
          {/* {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))} */}
        </div>
      </section>
      <section className="flex flex-col mt-8 gap-6">
        <h2>Take an interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}{" "}
        </div>
      </section>
    </>
  );
};

export default page;
