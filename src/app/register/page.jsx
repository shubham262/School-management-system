import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

const Register = () => {
	return (
		<div className="w-screen h-screen min-h-screen bg-slate-100 flex justify-center items-center p-4">
			<div className="w-full max-w-md rounded-2xl overflow-hidden bg-white">
				<div className="w-full h-40">
					<Image
						src={"/banner.png"}
						alt="banner"
						width={1000}
						height={400}
						className="w-ful h-full object-cover"
					/>
				</div>
				<div className="p-6">
					<Link
						href="/"
						className=" flex items-center text-sm text-slate-500 hover:text-slate-900 gap-2"
					>
						<MoveLeft />
						Back
					</Link>
					<h1>Register</h1>
					<button>Register with Google</button>

					<div>or</div>
					<div className="flex flex-col">
						<label>Email</label>
						<input type="email" placeholder="Enter Your email" />
					</div>
					<div className="flex flex-col">
						<label>Password</label>
						<input type="password" placeholder="Enter Your Password" />
					</div>
					<div className="flex flex-col">
						<label>Confirm Password</label>
						<input type="password" placeholder="Confirm Password" />
					</div>
					<button>Register</button>
				</div>
			</div>
		</div>
	);
};

export default memo(Register);
