/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
"use client";
import { getUserInformation } from "@/service/auth";
import { Spin } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const Oauth = ({ token }) => {
	const params = useParams();
	const slug = params?.id;

	const router = useRouter();
	useEffect(() => {
		if (!token) {
			return router.push(`/${slug}/login`);
		} else {
			localStorage.setItem("token", token);
			fetchUserInformation();
		}
	}, [token, router, slug]);

	const fetchUserInformation = useCallback(async () => {
		try {
			const { data } = await getUserInformation(slug);
			const { user, membership } = data;
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("membership", JSON.stringify(membership));
			router.push(`/${slug}/dashboard/profile`);
		} catch (error) {
			message.error("Something went wrong");
			return router.push(`/${slug}/login`);
		}
	}, [slug]);
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
		</div>
	);
};

export default Oauth;
