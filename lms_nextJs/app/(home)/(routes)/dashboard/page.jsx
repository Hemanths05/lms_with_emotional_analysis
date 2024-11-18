"use client"
import React, { useEffect, useState } from 'react'
import { GetUserCourseList } from '../../../_services'
import { useUser } from '@clerk/nextjs'
import CategoryItem from '../../_components/CategoryItem';
import Link from 'next/link';

function Dashboard() {
    const { user } = useUser();
    const [userCourseList, setUserCourseList] = useState([]);

    useEffect(() => {
        const fetchUserCourses = async () => {
            if (user) {
                console.log("Fetching courses for user:", user.primaryEmailAddress.emailAddress);
                const resp = await GetUserCourseList(user.primaryEmailAddress.emailAddress);
                console.log("Fetched courses:", resp?.userEnrollCourses);
                
                if (resp) {
                    setUserCourseList(resp?.userEnrollCourses);
                }
            }
        };
        
        fetchUserCourses();
    }, [user]);

    return (
        <div>
            {userCourseList.length > 0 ? (
                <>
                    <h2 className='text-[20px] font-medium'>My Enrolled Courses:</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5'>
                        {userCourseList && userCourseList.map((course, index) => (
                            course.courseList && course.courseList.id ? (
                                <Link href={'/course-preview/' + course.courseList.id} key={index}>
                                    <CategoryItem course={course?.courseList} />
                                </Link>
                            ) : (
                                <div key={index} className="text-red-500">Course data unavailable</div>
                            )
                        ))}
                    </div>
                </>
            ) : (
                <div className='flex justify-center items-center text-[20px] mt-20 text-gray-500'>
                    <h2>You don't have any course enrolled.</h2>
                </div>
            )}
        </div>
    )
}

export default Dashboard;
