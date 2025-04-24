import Agent from "@/components/Agent";
import { getCurrentSigninUser } from "@/lib/actions/auth.actions";
import React from "react";

const page = async () => {
  const user = await getCurrentSigninUser();
  // console.log('current sign in user is:');

  // console.log(user);

  return (
    <>
      <h3>Interview Session</h3>
      <Agent userName={user?.name} userId={user?.id} type="generate" />
    </>
  );
};

export default page;
