import React, { useContext, useEffect } from "react";
import { EnrollCourse, PublishCourse } from "../../../../../_services";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserMembershipContext } from "../../../../../_context/UserMembershipContext";
import { startFaceDetection } from "../../../../../../components/FaceDetector";

function EnrollmentSection({ courseDetail, userCourse }) {
  const { user } = useUser();
  const router = useRouter();
  const { userMembership, setUserMembership } = useContext(UserMembershipContext);

  const enrollCourse = async () => {
    if (user) {
      await EnrollCourse(courseDetail.id, user.primaryEmailAddress.emailAddress)
        .then(async (resp) => {
          if (resp) {
            await PublishCourse(resp?.createUserEnrollCourse?.id).then((result) => {
              if (result) {
                courseDetail.totalChapters
                  ? router.push("/view-course/" + courseDetail.id)
                  : window.location.reload();
              }
            });
          }
        });
    } else {
      router.push("/sign-in");
    }
  };

  const handleBuyMembership = () => {
    setUserMembership(true);
  };

  const handleGoToCourse = () => {
    const currentPath = window.location.pathname;
    startFaceDetection(currentPath);
    router.push("/view-course/" + courseDetail.id);
  };

  return (
    <div>
      {userCourse?.courseId ? (
        <div className="mt-5 border rounded-lg p-4 text-center">
          <h2 className="text-gray-500">Course Already Enrolled</h2>
          <button
            className="p-2 w-full bg-purple-500 text-white rounded-lg text-[14px] mt-2 hover:bg-purple-700"
            onClick={handleGoToCourse}
          >
            Go to Course
          </button>
        </div>
      ) : (
        <div className="mt-5 border rounded-lg p-4 text-center">
          <h2 className="text-gray-500">
            {courseDetail.free || userMembership
              ? "Learn and Build Project, Access Source Code, and Track Your Progress for free!"
              : "Buy Monthly membership to get access to all courses, Source code, and Track your progress"}
          </h2>
          <button
            className="p-2 w-full bg-purple-500 text-white rounded-lg text-[14px] mt-2 hover:bg-purple-700"
            onClick={() => (userMembership ? enrollCourse() : handleBuyMembership())}
          >
            {userMembership ? "Enroll Now" : "Buy Membership $2.99/Month"}
          </button>
        </div>
      )}
    </div>
  );
}

export default EnrollmentSection;