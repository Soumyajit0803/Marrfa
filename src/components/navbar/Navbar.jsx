import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Logo from "/assets/Marrfa.png";
import { Link, useLocation } from "react-router-dom";
import CustomButton from "../button/CustomButton";
import { Button, Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const tabroutes = {
	Home: "",
	Projects: "projects",
	Blogs: "blogs",
	"About us": "about",
};

const DrawerToggle = ({ selected, handleSelect }) => {
	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	return (
		<div className="drawer">
			{/* <CustomButton
				style={{
					borderRadius: "0px",
					boxShadow: "none",
					width: "min-content",
					padding: "0px",
				}}
				onClick={open ? onClose : showDrawer}
				startIcon={
					open ? (
						<CloseOutlined style={{ fontSize: 25 }} />
					) : (
						<MenuOutlined style={{ fontSize: 25 }} />
					)
				}
				// invert
			/> */}

			<Button
				onClick={open ? onClose : showDrawer}
				style={{
					color: "white",
				}}
				icon={
					open ? (
						<CloseOutlined style={{ fontSize: 25 }} />
					) : (
						<MenuOutlined style={{ fontSize: 25 }} />
					)
				}
				type="secondary"
			></Button>
			<Drawer
				width={"100vw"}
				placement="left"
				title={<BrandName mobile={true} />}
				onClose={onClose}
				open={open}
			>
				{/* <div className="list"> */}
				{Object.keys(tabroutes).map((key, idx) => (
					<Link
						key={idx}
						onClick={() => {
							handleSelect(idx);
							onClose();
						}}
						className={
							"item" +
							(selected == tabroutes[key] ? " active" : "")
						}
						to={`/${tabroutes[key]}`}
					>
						{key}
					</Link>
				))}
				<CustomButton
					style={{
						marginTop: "1rem",
					}}
					text={"Request a CallBack"}
				/>

				{/* </div> */}
			</Drawer>
		</div>
	);
};

const BrandName = ({ mobile = false }) => {
	return (
		<Link to="/">
			<div className="brand" style={{ gap: mobile ? "0px" : "5px" }}>
				<img src={Logo} />
				<div
					style={{ fontSize: mobile ? "1.5rem" : "1.2rem" }}
					className="brand-name"
				>
					arrfa
				</div>
			</div>
		</Link>
	);
};

const Navbar = () => {
	const location = useLocation();
	const [selected, setSelected] = useState(location.pathname.slice(1));

	useEffect(() => {
		// Update selected tab whenever the location changes
		setSelected(location.pathname.slice(1));
	}, [location]);

	const handleSelect = (item) => {
		setSelected(() => item);
	};

	const { innerWidth, innerHeight } = window;
	const DesktopView = innerWidth > 800;

	return (
		<div className="navbar-wrapper">
			<div className="navbar">
				<div className="brand">
					{/* {DesktopView ? <BrandName /> : <DrawerToggle selected={selected} handleSelect={handleSelect} />} */}
					<BrandName mobile={true} />
				</div>
				{DesktopView && (
					<div className="tabs">
						{Object.keys(tabroutes).map((key, idx) => (
							<Link
								key={idx}
								className={
									"item" +
									(selected === tabroutes[key]
										? " active"
										: "")
								}
								to={`/${tabroutes[key]}`}
							>
								{key}
							</Link>
						))}
					</div>
				)}

				{/* {!DesktopView && (
                    <div className="floating-brand">
                        <BrandName mobile={true} />
                    </div>
                )} */}
				{DesktopView && (
					<div className="action">
						<CustomButton
							style={{
								// background: "grey",
								// color: "#fff",
								padding: "10px",
								height: "2em",
							}}
							invert
							text={"Request a callback"}
						/>
						<CustomButton
							style={{
								// background: "grey",
								// color: "#fff",
								padding: "10px",
								height: "2em",
							}}
							// invert
							text={"Log in"}
						/>
					</div>
				)}
				{!DesktopView && (
					<div className="right-col">
						<CustomButton
							text={"Log in"}
							style={{
								boxShadow: "none",
							}}
						/>
						<DrawerToggle
							selected={selected}
							handleSelect={handleSelect}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
