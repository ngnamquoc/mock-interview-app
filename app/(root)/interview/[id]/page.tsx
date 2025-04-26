import { getInterviewDetailsById } from "@/lib/actions/general.actions";
import { getRandomInterviewCover } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import AuthLayout from "../../../(auth)/layout";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getCurrentSigninUser } from "@/lib/actions/auth.actions";
import Agent from "@/components/Agent";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;

  //   fetch interview's details

  const interviewDetails = await getInterviewDetailsById(id);

  const user = await getCurrentSigninUser();

  if (!interviewDetails) redirect("/");

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover photo"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interviewDetails.role} Interview</h3>
          </div>
          <DisplayTechIcons techStack={interviewDetails.techstack} />
        </div>
        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
          {interviewDetails.type}
        </p>
      </div>

      <Agent
        userName={user?.name}
        userId={user?.id}
        type="interview"
        interviewId={id}
        questions={interviewDetails.questions}
      />
    </>
  );
};

export default page;
