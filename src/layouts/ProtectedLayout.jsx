"use client";
import { authClient } from "@/config/authClient";
import { useParams, useRouter } from "next/navigation";
import React, { memo, useEffect } from "react";

const Protectedlayout = ({ children }) => {
	const { data, isPending } = authClient.useSession();
	const params = useParams();
	const router = useRouter();
	const slug = params?.id;
	useEffect(() => {
		if (!isPending && !data) {
			router.push(`/${slug}/login`);
		}
	}, [isPending, slug, data, router]);
	return <>{children}</>;
};

export default memo(Protectedlayout);
