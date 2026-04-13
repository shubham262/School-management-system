/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
"use client";
import { createNewSchool, fetchUser } from "@/service/auth";
import { Button, message, Spin } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const SignOAuth = ({ token }) => {
	const router = useRouter();

	const [info, setInfo] = useState({
		currentMemberShip: [],
	});
	useEffect(() => {
		if (!token) {
			return router.push(`/`);
		} else {
			localStorage.setItem("token", token);
			fetchUserInformation();
		}
	}, [token, router]);

	const buttonNaviagtion = useCallback(
		(record) => {
			const slug = record?.schoolId?.slug;
			localStorage.setItem("membership", JSON.stringify(record));
			return router.push(`/${slug}/dashboard/profile`);
		},
		[router]
	);

	const handleCreateNew = useCallback(async () => {
		try {
			const response = await createNewSchool();
			const { memebership, slug } = response;

			localStorage.setItem("membership", JSON.stringify(memebership));
			return router.push(`/${slug}/school-information`);
		} catch (error) {
			console.log("error", error);
			message.error("Something went wrong");
			// return router.push(`/`);
		}
	}, []);

	const fetchUserInformation = useCallback(async () => {
		try {
			const { membership = [], user } = await fetchUser();
			if (membership?.length) {
				setInfo((prev) => ({ ...prev, membership }));
				localStorage.setItem("user", JSON.stringify(user));
			} else {
				handleCreateNew();
			}
		} catch (error) {
			message.error("Something went wrong");
			return router.push(`/`);
		}
	}, []);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
			<div className="p-8 bg-white rounded-xl shadow-lg flex flex-col items-center border border-gray-100">
				<Spin />
				<h2 className="mt-6 text-xl font-semibold text-gray-800">
					Authenticating...
				</h2>
				<p className="mt-2 text-sm text-gray-500">
					Verifying your school membership
				</p>
			</div>

			{info?.membership?.length && (
				<div className="p-8 mt-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
					<span>
						You already have accounts associated with following school
					</span>
					<span className="text-xs">
						Clicking on corresponding buttons will take you to that workspace
					</span>
					{info?.membership?.map((ele, index) => (
						<Button
							key={`ele-${index}`}
							onClick={() => buttonNaviagtion(ele)}
							className="mt-4"
							type="primary"
						>
							{ele?.schoolId?.name}
						</Button>
					))}
				</div>
			)}

			<Button
				key={`ele-new`}
				onClick={() => handleCreateNew()}
				className="mt-4"
				type="link"
			>
				Register new
			</Button>
		</div>
	);
};

export default SignOAuth;
