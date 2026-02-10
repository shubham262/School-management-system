import Image from "next/image";

export default function Home() {
	return (
		<div className="flex min-h-screen min-w-screen bg-white">
			<div className="flex-1 flex self-stretch">
				<Image
					src={"/landing.png"}
					alt="landing.png"
					width={1000}
					height={1000}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				/>
			</div>
			<div className="flex-1 flex self-stretch bg-[red]"></div>
		</div>
	);
}
