/* eslint-disable react-hooks/immutability */
"use client";
import React, { useCallback, useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";
import { getUserInformation } from "@/service/auth";
const Oauth = ({ token }) => {
	const params = useParams();
	const slug = params?.id;
	const router = useRouter();

	useEffect(() => {
		console.log("token", token);
		localStorage.setItem("token", token);
		fetchUserInfo();
	}, [token]);

	const fetchUserInfo = useCallback(async () => {
		const { data } = await getUserInformation(slug);
		const { user, memebership } = data;

		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("membership", JSON.stringify(memebership));
		return router.push(`/${slug}/dashboard/profile`);
	}, [slug]);

	const antIcon = (
		<LoadingOutlined style={{ fontSize: 40, color: "#3b82f6" }} spin />
	);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
			<div className="p-8 bg-white rounded-xl shadow-lg flex flex-col items-center border border-gray-100">
				<Spin indicator={antIcon} />
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
